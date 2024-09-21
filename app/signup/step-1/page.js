"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import local from 'next/font/local';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';


const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })

function Step1() {
  let passwordValidator = require('password-validator');
  const schema = new passwordValidator()
  const [signEmailValue, setsignUpEmail] = useState('');
  const [signUserName, setsignUpUser] = useState('');
  const [signUpPassword, setsignUpPswd] = useState('');

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

  const router = useRouter();
  const validate = (e) => {
    // const { username, email, passwor } = formState
    e.preventDefault()

    const userCredentials = {
      'username': signUserName,
      'email': signEmailValue,
      'password': signUpPassword,
    }


    if (signEmailValue && signUserName && schema.validate(signUpPassword)) {
      // console.log(userCredentials);
      sessionStorage.setItem('userCredentials', JSON.stringify(userCredentials))
      router.push('/signup/step-2');
    }
    else {
      alert('Please fill up valid values.');
    }
  }

  useEffect(() => {
    const email = sessionStorage.getItem('signupEmail');
    console.log(email);

    if (email) {
      setsignUpEmail(email);
    }
  }, [])



  function changeFieldUser(e) {
    setsignUpUser(e.target.value);
    // if(inputRef.current)
    if (signUserName.length < 4) {
      inputRef.current.style.border = "2px solid red";
    }
    else {

      inputRef.current.style.border = "2px solid green";
    }

  }
  function changeFieldEmail(e) {
    setsignUpEmail(e.target.value);
  }

  function changeFieldPswd(e) {
    const value = e.target.value;
    setsignUpPswd(value);
    console.log(e.target.value);
    if (schema.validate(signUpPassword)) {
      inputRef3.current.style.border = "2px solid green"
    }
    else {
      inputRef3.current.style.border = "2px solid red"
    }
  }

  return (
    <div className={`${workSans.className} login-container flex mx-auto bg-[#134074] justify-center items-center h-screen`}>
      <div className="login-div shadow-lg min-h-96 min-w-96 bg-[#eef4ed]">
        <h3 className='text-black p-4 text-2xl font-bold'> Sign Up</h3>
        <form action="#" className="login flex flex-col justify-center p-4" onSubmit={validate}>
          <div className="flex items-center flex-col">

            <label htmlFor="uname" className='text-black p-2'> Usernamae </label>
            <input type="text" className=' p-2 text-black w-80 outline-none focus: border-2 focus-within:border-red-600 text-sm' name='sign-up' value={signUserName} required onChange={changeFieldUser} ref={inputRef} id='uname' />

            <label htmlFor="email" className='text-black p-2'> Email </label>
            <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' value={signEmailValue} required onChange={changeFieldEmail} ref={inputRef2} id='email' />


            <label htmlFor="pwd" className='text-black p-2'> Password </label>
            <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' value={signUpPassword} required onChange={changeFieldPswd} ref={inputRef3} id='pwd'/>

          </div>


          <button className='login-btn text-center mx-auto text-black p-2  mt-4 w-fit outline-none outline-black hover:bg-[#293241] hover:text-white' type='submit'> Sign-In </button>

        </form>
      </div>
    </div>
  )
}

export default Step1
