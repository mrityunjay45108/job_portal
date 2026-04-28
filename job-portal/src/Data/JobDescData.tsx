import {
  IconBriefcase,
  IconMapPin,
  IconPremiumRights,
  IconRecharging,
} from "@tabler/icons-react";

const card = [
  { name: "Location", icon: IconMapPin, value: "New York" },
  { name: "Experience", icon: IconBriefcase, value: "Expert" },
  { name: "Salary", icon: IconPremiumRights, value: "48 LPA" },
  { name: "Job Type", icon: IconRecharging, value: "Full Time" },
];

const skills = [
  "React",
  "Spring Boot",
  "Java",
  "Python",
  "Node.js",
  "MongoDB",
  "Express",
  "Django",
  "PostgreSQL",
];

const desc = `
<h4>About the Job</h4>
<p>
At Vireo, we are a passionate, fun-loving, and growing team. 
We are looking for passionate programmers who want to solve technical challenges 
and learn and incorporate new technologies into their skill set to join our team and grow with us.
</p>

<p>
In this role, you will use various tech stacks including Laravel, Node.js (AdonisJS),
Vue.js, React.js, Nuxt.js, Redis, MySQL, MongoDB, and CSS.
You will be engaged across the software development life cycle to create and modify
platforms and capabilities in a collaborative and agile environment.
</p>

<h4>Responsibilities</h4>
<ul>
  <li>Design, build, test, and deploy software applications and features</li>
  <li>Carry software products through the software development life cycle (SDLC)</li>
  <li>Write clean, concise, and efficient code</li>
  <li>Manage code documentation and version control</li>
  <li>Troubleshoot and debug software</li>
  <li>Participate in on-call rotation to respond to production issues</li>
</ul>

<h4>Qualifications and Skill Sets</h4>
<ul>
  <li>Bachelor's degree in Computer Science, Information Technology, or a related field</li>
  <li>2+ years of experience in software development</li>
  <li>Proficiency in JavaScript, Python, Java, or PHP</li>
  <li>Experience with React, Angular, Vue.js, Django, or Laravel</li>
  <li>Familiarity with MySQL, PostgreSQL, or MongoDB</li>
  <li>Understanding of Git and version control</li>
  <li>Strong problem-solving skills and attention to detail</li>
  <li>Excellent communication and teamwork abilities</li>
</ul>

<h4>Preferred Skills</h4>
<ul>
  <li>Experience with AWS, Azure, or Google Cloud</li>
  <li>Knowledge of Docker and Kubernetes</li>
  <li>Familiarity with CI/CD pipelines and DevOps practices</li>
</ul>

<p>
If you are passionate about technology and eager to work in a dynamic environment,
we would love to hear from you. Join us at Vireo and be part of our exciting journey!
</p>
`;


export { card, skills, desc };