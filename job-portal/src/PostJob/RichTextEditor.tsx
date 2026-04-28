// import { RichTextEditor, Link } from "@mantine/tiptap";
// import { useEditor } from "@tiptap/react";
// import Highlight from "@tiptap/extension-highlight";
// import StarterKit from "@tiptap/starter-kit";
// import TextAlign from "@tiptap/extension-text-align";
// import Underline from "@tiptap/extension-underline";

// const TextEditor = () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({ link: false }),
//       Link,
//       Underline,
//       Highlight,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//     ],
//     content: `
//       <h4>About The Job</h4>
//       <p>Write description here...</p>
//       <h4>Responsibilities</h4>
//       <ul><li>Add responsibilities here...</li></ul>
//       <h4>Qualifications and Skill Sets</h4>
//       <ul><li>Add required qualification and skill set here...</li></ul>
//     `,
//   });

//   return (
//     <RichTextEditor 
//       editor={editor} 
//       styles={{
//         root: {
//           // Aapke input boxes ka container color
//           backgroundColor: '#262626', 
//           border: '1px solid #373737', 
//           borderRadius: '12px', // Thoda zyada rounded inputs ki tarah
//           overflow: 'hidden',
//         },
//         toolbar: {
//           // Toolbar ko transparent rakha hai taaki wo content ke sath merge ho jaye
//           backgroundColor: '#212121', 
//           borderBottom: '1px solid #373737',
//           padding: '10px',
//         },
//         content: {
//           // Exact background color matching for input fields
//           backgroundColor: '#262626', 
//           color: '#E5E7EB',
//           minHeight: '300px',
//           padding: '20px',
//           fontSize: '14px',
//           // Tiptap internal styling to match your text layout
//           '& .tiptap h4': {
//             color: '#FFFFFF',
//             marginTop: '20px',
//             marginBottom: '10px',
//             fontSize: '1.1rem',
//           },
//           '& .tiptap p, & .tiptap li': {
//             color: '#9CA3AF', // mine-shaft-300 color for better readability
//             lineHeight: '1.6',
//           }
//         },
//         control: {
//           backgroundColor: 'transparent',
//           border: 'none',
//           color: '#9CA3AF',
//           transition: 'all 0.2s ease',
//           '&:hover': {
//             backgroundColor: '#373737',
//             color: '#FACC15'
//           },
//           '&[data-active]': {
//             backgroundColor: '#373737',
//             color: '#FACC15'
//           }
//         }
//       }}
//     >
//       <RichTextEditor.Toolbar>
//         <RichTextEditor.ControlsGroup>
//           <RichTextEditor.Bold />
//           <RichTextEditor.Italic />
//           <RichTextEditor.Underline />
//           <RichTextEditor.Strikethrough />
//         </RichTextEditor.ControlsGroup>

//         <RichTextEditor.ControlsGroup>
//           <RichTextEditor.H4 />
//           <RichTextEditor.BulletList />
//           <RichTextEditor.OrderedList />
//         </RichTextEditor.ControlsGroup>

//         <RichTextEditor.ControlsGroup>
//           <RichTextEditor.AlignLeft />
//           <RichTextEditor.AlignCenter />
//           <RichTextEditor.AlignRight />
//         </RichTextEditor.ControlsGroup>

//         <RichTextEditor.ControlsGroup>
//           <RichTextEditor.Undo />
//           <RichTextEditor.Redo />
//         </RichTextEditor.ControlsGroup>
//       </RichTextEditor.Toolbar>

//       <RichTextEditor.Content />
//     </RichTextEditor>
//   );
// }

// export default TextEditor;



const TextEditor = () => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
      
      </label>

      <textarea
        placeholder={`About The Job
Write description here...

Responsibilities
• Add responsibilities here...

Qualifications and Skill Sets
• Add required qualification and skill set here...`}
        className="
          w-full
          min-h-[300px]
          resize-none
          rounded-xl
          bg-mine-shaft-850
          border
          border-[#373737]
          px-4
          py-4
          text-sm
          text-gray-200
          placeholder:text-gray-500
          focus:outline-none
          focus:ring-1
          focus:ring-yellow-500
          focus:border-yellow-500
        "
      />
    </div>
  );
};

export default TextEditor;
