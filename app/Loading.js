
import { Quicksand, Work_Sans } from 'next/font/google';
const workSans = Work_Sans({ weight: "500", subsets: ["latin"] });
const qs = Quicksand({ weight: "700", subsets: ["latin"] });
export default function Loading() {
  return(
  // You can add any UI inside Loading, including a Skeleton.
  <div className=" justify-center text-center mx-auto p-4">
    <span className={`${qs.className} text-purple-600 font-extrabold text-2xl `}> Loading.... </span>
  </div>
  );
}
// export default function Loading () {
//   return (
//     <div className="loading-screen flex justify-center items-center w-[100%] h-auto text-[2rem] relative">
//       <div className="dot absolute w-[100%] h-[100%] bg-inherit before:animation-anime duration-[2s] ease-out infinite bg-[#4285f5]"></div>
//       <div className="dot absolute w-[100%] h-[100%] bg-inherit before:animation-anime duration-[2s] ease-out infinite bg-red"></div>
//       <div className="dot absolute w-[100%] h-[100%] bg-inherit before:animation-anime duration-[2s] ease-out infinite bg-yellow"></div>
//       <div className="dot absolute w-[100%] h-[100%] bg-inherit before:animation-anime duration-[2s] ease-out infinite bg-green-600"></div>
//       <div className="dot absolute w-[100%] h-[100%] bg-inherit before:animation-anime duration-[2s] ease-out infinite bg-purple-500"></div>
//     </div>

//   );
// }