import React from 'react'
import { Work_Sans } from 'next/font/google'
import { useRef, useState } from 'react';

const workSans = Work_Sans({ weight: "400", subsets: ["latin"] });
export default function Filter({ isSet }) {

const tagRef = useRef(null);
const [preferences, setPreferences] = useState([]);
const tags = [
  "Python",
  "Java",
  "C++",
  "JavaScript",
  "HTML",
  "CSS",
  "R",
  "C",
  "C#",
  "Rust",
  "TypeScript",
  "Ruby",
  "Computernetworks",
  "Programming",
  "MachineLearning",
  "DataScience",
  "SoftwareEngineering",
  "WebDevelopment",
  "Database",
  "Cybersecurity",
  "CloudComputing",
  "OperatingSystems",
  "DataStructuresAlgorithms",
  "IoT",
  "ComputerArchitectures",
  "Microprocessors"];


  const handleTagSelection = (tag, index) => {
        const tagElement = document.getElementById(`tag-${index}`);
        setPreferences((prev) => {
            if (prev.includes(tag)) {
                tagElement.style.background = "#eef4ed";
                tagElement.style.color = "black";
                return prev.filter((eachTag) => eachTag !== tag);
            }
            else {
                tagElement.style.background = "green";
                tagElement.style.color = "white";
                return [...prev, tag];
            }
        })
      }
  return (
    <div className='text-black text-xl absolute flex flex-col justify-between gap-2 top-[100%] left-[35%] shadow-md mt-4 bg-[#00b3a7] opacity-75 h-fit p-4'
    >
      <div className="mb-3 space-y-3">
        <span className='text-sm font-semibold'>Filter by tags</span>
        <ul className='flex flex-wrap gap-4 max-w-2xl w-full'>
          {tags.map((tag, index) => (
            <li key={index} className='p-2 text-black border-2 rounded  border-red hover:cursor-pointer hover:bg-black hover:text-white text-sm'
            onClick={() => handleTagSelection(tag, index)}
            ref={tagRef} id={`tag-${index}`}>{tag}</li>
          ))}
        </ul>
        </div>
    </div>
  );

}
