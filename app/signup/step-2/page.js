"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import local from 'next/font/local';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';


const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })

function Step2() {
    const [userFname, setUserFName] = useState('');
    const [userLName, setUserLName] = useState('');
    const [userDomain, setUserDomain] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAge, setUserAge] = useState(16);
    const [userCredentials, setUserCred] = useState({});
    const inputRef = useRef(null);
    const inputRef2 = useRef();
    const inputRef3 = useRef();


    const router = useRouter();
    const validate = async (e) => {
        e.preventDefault()
        const userCred = {
        ...userCredentials, 
        'First Name': userFname,
        'Last Name': userLName,
        'Gender': userGender,
        'Age': userAge,
        'Domain': userDomain,
    };
        // console.log(userCred);
        // userCred['First Name'] = userFname;
        // userCred['Last Name'] = userLName;
        // userCred['Gender'] = userGender;
        // userCred['Age'] = userAge;
        // userCred['Domain'] = userDomain;

        setUserCred(JSON.stringify(userCred));



        if (userFname && userDomain) {
            sessionStorage.setItem('userCredentials', JSON.stringify(userCred));
            // console.log("Written userCreds", userCredentials);
            router.push('/signup/step-3');
        }

    }
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


    function changeGender(e) {
        setUserGender(e.target.value);
        // if(inputRef.current)
        // if (userFname == '') {
        //     inputRef.current.style.border = "2px solid red"
        // }
        // else {
        //     inputRef.current.style.border = "2px solid green"
        // }

    }

    function changeFName(e) {
        setUserFName(e.target.value);
        // if(inputRef.current)
        if (userFname == '') {
            inputRef.current.style.border = "2px solid red"
        }
        else {
            inputRef.current.style.border = "2px solid green"
        }

    }
    function changeDomain(e) {
        setUserDomain(e.target.value);
        // if(inputRef.current)
        if (userDomain == '') {
            inputRef2.current.style.border = "2px solid red"
        }
        else {
            inputRef2.current.style.border = "2px solid green"
        }
    }
    function changeAge(e){
        setUserAge(e.target.value);
    }

    return (
        <div className={`${workSans.className} login-container flex mx-auto bg-[#134074] justify-center items-center h-screen`}>
            <div className="login-div shadow-lg min-h-96 min-w-96 bg-[#eef4ed]">
                <h3 className='text-black p-4 text-2xl font-bold'> Personal Info</h3>
                <form action="#" className="login flex flex-col justify-center p-4" onSubmit={validate}>
                    <div className="flex items-center flex-col justify-between">

                        <label htmlFor="fname" className='text-black p-2'> First Name </label>
                        <input type="text" className=' p-2 text-black w-80 outline-none focus: border-2 focus-within:border-red-600 text-sm' name='sign-up' value={userFname} required onChange={changeFName} ref={inputRef} id=' fname' />

                        <label htmlFor="lname" className='text-black p-2'> Last Name </label>
                        <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' id='lname' />




                        <label htmlFor="gender" className='text-black p-2'> Gender </label>
                        <input type="text" className=' p-2 text-black w-80 outline-none focus: border-2 focus-within:border-red-600 text-sm' name='sign-up' value={userGender} id='gender'  onChange={changeGender}/>

                        <label htmlFor="Age" className='text-black p-2'> Age </label>
                        <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' id='Age' value={userAge} onChange={changeAge} />

                        <label htmlFor="domain" className='text-black p-2'> Domain </label>
                        <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' id='domain' required ref={inputRef2} onChange={changeDomain} />



                        <button className='login-btn text-center mx-auto text-black p-2  mt-4 w-fit outline-none outline-black hover:bg-[#293241] hover:text-white' type='submit' > Next  </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Step2
