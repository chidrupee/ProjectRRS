"use client"
import React, { useState, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation';
import local from 'next/font/local';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useRef } from 'react';

const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })

function page() {
    const router = useRouter()
    const tagRef = useRef(null);
    const [preferences, setPreferences] = useState([]);
    const [userCredentials, setUserCred] = useState({});
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
        "Microprocessors"
    ];


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

    const submitResponse = async (e) => {
        e.preventDefault();
        // const storedCredentials = sessionStorage.getItem('userCredentials');
        // const userCredentials = storedCredentials ? JSON.parse(storedCredentials) : {};
        // const userCredentials = sessionStorage.getItem('userCredentials');
        if (preferences.length < 2) {
            alert("Select two or more preferences");
        }
        else {
            const userCred = {
                ...userCredentials,
                'Preferences': preferences,
            };
            setUserCred(userCred);


            // userCredentials['Preferences'] = preferences;
            sessionStorage.setItem('userCredentials', JSON.stringify(userCred));

            const registerResponse = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCred), 
            });

            const result = await registerResponse.json();
            if (result.success) {
                sessionStorage.setItem('auth', true);
                sessionStorage.setItem('activeUser', userCred.username); // Accessing username directly
                router.push('/home');
            } else {
                console.log('THENGA');
            }

            // router.push('/register');


        }
    }
    useEffect(() => {
        console.log('Selected Preferences:', preferences);
    }, [preferences]);

    useEffect(() => {
        const userCredentials = sessionStorage.getItem('userCredentials');
        console.log(userCredentials);
        if (userCredentials) {
            try {
                const usercred = JSON.parse(userCredentials);
                setUserCred(usercred);
            } catch (error) {
                console.error('Failed to parse user credentials:', error);
            }
        } else {
            console.log('No user credentials found in session storage.');
        }
    }, []);

    return (
        <div className={`${workSans.className} login-container flex mx-auto bg-[#134074] justify-center items-center h-screen`}>
            <div className="login-div shadow-lg min-h-96 min-w-96 bg-[#eef4ed]">
                <h3 className='text-black p-4 text-2xl font-bold'> Preferences </h3>
                <h4 className='text-black p-4 text-xl font-bold'> Select 2 or more preferences </h4>
                <form action="#" className="login flex flex-col justify-center p-4" onSubmit={submitResponse}>
                    <div className="flex items-center flex-col justify-between">
                        <ul className='flex flex-wrap max-w-screen-sm w-full gap-4 justify-center '>
                            {tags.map((tag, index) => (
                                <li key={index} className='p-2 text-black border-2 rounded  border-red hover:cursor-pointer hover:bg-black hover:text-white' onClick={() => handleTagSelection(tag, index)} ref={tagRef} id={`tag-${index}`}>{tag}</li>
                            ))}
                        </ul>

                    </div>

                    <button className='login-btn text-center mx-auto text-black p-2  mt-8 w-fit outline-none outline-black rounded-xl hover:bg-[#293241] hover:text-white' type='submit' > Submit  </button>
                </form>
            </div>
        </div>
    )
}

export default page
