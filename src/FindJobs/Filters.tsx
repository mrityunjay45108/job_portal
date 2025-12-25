// const Filters = ({ setLocation, setSort }) => {
//   return (
//     <div className="flex gap-4 bg-[#1f1f1f] p-4 rounded-xl text-white">
      
//       <input
//         placeholder="Job Title"
//         className="bg-transparent border border-gray-700 px-4 py-2 rounded"
//       />

//       <select
//         onChange={(e) => setLocation(e.target.value)}
//         className="bg-transparent border border-gray-700 px-4 py-2 rounded"
//       >
//         <option value="">Location</option>
//         <option value="Remote">Remote</option>
//         <option value="Bangalore">Bangalore</option>
//       </select>

//       <select className="bg-transparent border border-gray-700 px-4 py-2 rounded">
//         <option>Experience</option>
//         <option>Entry Level</option>
//         <option>Mid Level</option>
//       </select>

//       <select className="bg-transparent border border-gray-700 px-4 py-2 rounded">
//         <option>Job Type</option>
//         <option>Full Time</option>
//         <option>Part Time</option>
//       </select>

//       <select
//         onChange={(e) => setSort(e.target.value)}
//         className="bg-transparent border border-yellow-500 px-4 py-2 rounded text-yellow-400"
//       >
//         <option value="relevance">Relevance</option>
//         <option value="salary">Salary</option>
//         <option value="latest">Latest</option>
//       </select>
//     </div>
//   );
// };
// export default Filters;
interface FiltersProps {
  setLocation: (loc: string) => void;
  setSort: (sort: string) => void;
}


const Filters = ({ setLocation, setSort }: FiltersProps) => {
  return (
    <div className="flex gap-4">
      <select onChange={(e) => setLocation(e.target.value)}>
        <option value="">Location</option>
        <option value="Remote">Remote</option>
        <option value="New York">New York</option>
      </select>

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="salary">Salary</option>
      </select>
    </div>
  );
};

export default Filters;
