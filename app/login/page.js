"use client"
import React from 'react'

import { Quicksand, Work_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const quickSand = Quicksand({ weight: "300", subsets: ["latin"] })
const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })



export default function page() {
    const [signUserName, setsignUpUser] = useState('');
    const [signUpPassword, setsignUpPswd] = useState('');
    const router = useRouter();
    function changeFieldUser(e) {
        setsignUpUser(e.target.value);

    }
    function changeFieldPswd(e) {
        const value = e.target.value;
        setsignUpPswd(value);
    }
    const validate = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: signUserName, password: signUpPassword }),
        });


        const result = await response.json();

        if (result.success) {
            sessionStorage.setItem('auth', true);
            sessionStorage.setItem('activeUser', signUserName);
            sessionStorage.setItem('userid', result.id);
            router.push('/home');

        }
        else {
            console.log("THENGA");
        }
    }
    return (
        <div className={`${workSans.className} login-container flex mx-auto bg-[#134074] justify-center items-center h-screen`}>
            <div className="login-div shadow-lg min-h-96 min-w-96 bg-[#eef4ed]">
                <h3 className='text-black p-4 text-2xl font-bold'> Sign Up</h3>
                <form action="#" className="login flex flex-col justify-center p-4" onSubmit={validate}>
                    <div className="flex items-center flex-col">

                        <label htmlFor="uname" className='text-black p-2'> Username </label>
                        <input type="text" className=' p-2 text-black w-80 outline-none focus: border-2 focus-within:border-red-600 text-sm' name='sign-up' value={signUserName} required onChange={changeFieldUser} id='uname' />



                        <label htmlFor="pwd" className='text-black p-2'> Password </label>
                        <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' value={signUpPassword} required onChange={changeFieldPswd} id='pwd' />

                    </div>


                    <button className='login-btn text-center mx-auto text-black p-2  mt-4 w-fit outline-none outline-black hover:bg-[#293241] hover:text-white' type='submit'> Sign-In </button>

                </form>
            </div>
        </div>
    );
}

// export default page
