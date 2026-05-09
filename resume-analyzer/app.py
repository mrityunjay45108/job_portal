import streamlit as st
from streamlit_extras.add_vertical_space import add_vertical_space
import os
import json
import re
import io
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import google.generativeai as genai

# ----------------------------
# SESSION INIT
# ----------------------------
def init_session_state():
    if "processing" not in st.session_state:
        st.session_state.processing = False

# ----------------------------
# PDF TEXT EXTRACTION (MULTI PAGE)
# ----------------------------
def extract_pdf_text(file):
    reader = PdfReader(file)
    text = ""

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    return text

# ----------------------------
# GEMINI RESPONSE
# ----------------------------
def get_gemini_response(prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text

# ----------------------------
# SAFE JSON PARSER
# ----------------------------
def safe_json_parse(text):
    try:
        return json.loads(text)
    except:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group())
        else:
            raise ValueError("Invalid JSON from model")

# ----------------------------
# ATS SCORE BAR
# ----------------------------
def extract_score(score_text):
    try:
        return int(score_text.replace("%", "").strip())
    except:
        return 0

# ----------------------------
# KEYWORD HIGHLIGHTING
# ----------------------------
def highlight_keywords(text, keywords):
    for kw in keywords:
        text = text.replace(kw, f"**:red[{kw}]**")
    return text

# ----------------------------
# PDF REPORT GENERATOR
# ----------------------------
def generate_pdf(report_text):
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    
    text_object = c.beginText(40, 750)
    text_object.setFont("Helvetica", 10)
    
    for line in report_text.split("\n"):
        text_object.textLine(line[:100])
    
    c.drawText(text_object)
    c.save()
    
    buffer.seek(0)
    return buffer

# ----------------------------
# MAIN APP
# ----------------------------
def main():
    st.set_page_config(
        page_title="Smart ATS Resume Analyzer",
        page_icon="🎯",
        layout="wide"
    )
    
    load_dotenv()
    init_session_state()
    
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        st.error("Missing GOOGLE_API_KEY in .env file")
        st.info("Please add your Google API Key to continue")
        return
    
    genai.configure(api_key=api_key)
    
    # SIDEBAR
    with st.sidebar:
        st.title("🎯 Smart ATS")
        st.write("AI Resume Analyzer with ATS scoring")
        add_vertical_space(2)
        st.markdown("""
        ### How it works:
        1. 📝 Paste Job Description
        2. 📄 Upload Resume (PDF)
        3. 🔍 Click Analyze
        4. 📊 Get ATS Score & Feedback
        """)
    
    # MAIN UI
    st.title("📄 Smart ATS Resume Analyzer")
    st.markdown("AI-powered tool to check your resume against job descriptions")
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        jd = st.text_area(
            "Job Description",
            height=200,
            placeholder="Paste the job description here..."
        )
    
    with col2:
        uploaded_file = st.file_uploader(
            "Upload Resume (PDF)",
            type="pdf",
            help="Upload your resume in PDF format"
        )
    
    analyze_col1, analyze_col2, analyze_col3 = st.columns([1, 2, 1])
    
    with analyze_col2:
        analyze_button = st.button(
            "🎯 Analyze Resume",
            type="primary",
            use_container_width=True
        )
    
    if analyze_button:
        if not jd:
            st.warning("⚠️ Please enter the job description")
            return
        
        if not uploaded_file:
            st.warning("⚠️ Please upload your resume")
            return
        
        try:
            with st.spinner("Analyzing your resume with AI..."):
                resume_text = extract_pdf_text(uploaded_file)
                
                prompt = f"""
You are an expert ATS (Applicant Tracking System) resume analyzer.

Return ONLY valid JSON format with no extra text:

{{
  "JD Match": "85%",
  "MissingKeywords": ["python", "docker", "aws"],
  "Profile Summary": "Your resume shows strong technical skills but lacks specific keywords from the job description."
}}

Resume Text:
{resume_text}

Job Description:
{jd}
"""
                
                response = get_gemini_response(prompt)
                data = safe_json_parse(response)
                
                st.success("✅ Analysis Complete!")
                
                # ATS Score Section
                score = extract_score(data.get("JD Match", "0%"))
                
                col1, col2, col3 = st.columns(3)
                
                with col1:
                    st.metric("🎯 ATS Score", f"{score}%")
                    st.progress(score / 100)
                
                with col2:
                    missing_count = len(data.get("MissingKeywords", []))
                    st.metric("📝 Missing Keywords", missing_count)
                
                with col3:
                    st.metric("📊 Match Status", "High" if score > 70 else "Medium" if score > 50 else "Low")
                
                # Missing Keywords
                missing = data.get("MissingKeywords", [])
                if missing:
                    st.subheader("🔑 Missing Keywords")
                    cols = st.columns(4)
                    for idx, kw in enumerate(missing):
                        cols[idx % 4].markdown(f"- **:red[{kw}]**")
                else:
                    st.info("✅ No missing keywords detected!")
                
                # Profile Summary
                st.subheader("📋 Profile Summary")
                st.write(data.get("Profile Summary", ""))
                
                # Resume Preview
                with st.expander("📄 Resume Preview (with highlighted keywords)"):
                    st.markdown(highlight_keywords(resume_text[:2000], missing))
                    if len(resume_text) > 2000:
                        st.info("Resume truncated for preview...")
                
                # Generate Report
                report = f"""
ATS RESUME ANALYSIS REPORT
{'='*50}

Date: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

SCORE: {data.get('JD Match')}

MISSING KEYWORDS:
{', '.join(missing) if missing else 'None'}

PROFILE SUMMARY:
{data.get('Profile Summary')}

RECOMMENDATIONS:
1. Add missing keywords to your resume
2. Tailor your experience to match job requirements
3. Use industry-standard formatting
"""
                
                pdf = generate_pdf(report)
                
                st.download_button(
                    "📥 Download Full Report (PDF)",
                    pdf,
                    file_name="ats_report.pdf",
                    mime="application/pdf",
                    use_container_width=True
                )
                
        except Exception as e:
            st.error(f"Error analyzing resume: {str(e)}")

if __name__ == "__main__":
    main()