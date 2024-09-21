"use client"
import React from 'react'
import { useState } from 'react';
import Sidebar from '@/components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faBookOpen, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';

const quickSand = Quicksand({ weight: "300", subsets: ["latin"] })
const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })
function Landing() {
    const router = useRouter();
    const [signUpValue, setsignUpValue] = useState("Enter your email here");

    function resetValue() {
        setsignUpValue('');
    }
    function changeValue(e) {
        setsignUpValue(e.target.value);
    }

    function getStarted(){

        sessionStorage.setItem('signupEmail', signUpValue);
        router.push('/signup/step-1');
    }
    function signIn(){
        router.push('/login');
    }
    return (
        <div className={`${workSans.className} landing-container flex flex-col bg-[#134074] h-screen overflow-y-auto`}>
            <nav className="main-navbar p-2 h-20 my-auto bg-[#eef4ed]">
                <ul className='flex justify-between'>
                    <li className='p-4 text-black text-3xl'>
                        ProjectRRS
                    </li>
                    <div className="btns flex justify-center gap-2">

                        <li>
                            <button className='sign-in-btn border-2 text-white p-4 bg-[#284b63] rounded-md' onClick={signIn}>
                                Sign In
                            </button>
                        </li>
                    </div>
                </ul>
            </nav>
            <div className="get-started text-center border-b-2 border-gray-300 text-white p-1 w-full min-h-80 h-full justify-center items-center flex flex-col gap-4">
                <FontAwesomeIcon icon={faBookOpen} className='max-w-40  h-auto' style={{ color: "#B197FC" }} />
                <div className="info text-xl break-words max-w-5xl">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis accusamus modi voluptate soluta! Voluptate eveniet voluptas impedit nihil, ipsam quasi minima molestiae suscipit, aut explicabo fugit neque reiciendis ex eum. Nisi cupiditate repellendus aperiam.
                </div>
                <div className="first flex justify-center gap-4 mt-4">

                    {/* <label htmlFor="sign-up" className='p-2 m-1 text-lg'>Get Started with ProjectRRS</label> */}
                    <span className='p-2 m-1 text-xl font-bold '> Get Started with ProjectRRS </span>
                    <input type="text" className='border-2 rounded-md p-2 text-gray-500 w-80 outline-none' name='sign-up' value={signUpValue} onClick={resetValue} onChange={changeValue} />
                    <button className="sign-up-btn bg-[#293241] outline-none outline-white rounded-md p-1" onClick={getStarted}>
                        Sign-Up <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>

            <div className="second text-center mx-auto break-words max-w-4xl p-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, inventore. Quia, explicabo. Molestias, expedita velit repellat autem recusandae earum distinctio necessitatibus officia? Labore non minus, nam eum explicabo quisquam tempore ab possimus inventore facere officiis velit veritatis voluptatibus cum culpa reiciendis porro molestias itaque repudiandae saepe magnam architecto, quas maxime!
            </div>
            {/* <Sidebar/> */}


        </div>
    )
}

export default Landing