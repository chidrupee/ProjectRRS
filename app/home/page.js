"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BookList from "@/components/BookList";
import Card from "@/components/Card";
import Landing from "@/components/Landing";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
// import { useState } from "react";
export default function Home() {
  const [recommended_books, setRecommendedbooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [preferences, setPreferences] = useState([]);
  // const [filterTags, setfilterTags] = useState([])
  const router = useRouter();

  const handleSearch = async(searchValue) => {
    try{
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
      console.log(`/search/${searchValue}`)
      router.push(`/search/${searchValue}`);
     
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }

  };

  useEffect(() => {
    const authenticated = sessionStorage.getItem('auth');

    if(!authenticated  || authenticated === 'false'){
      // setAuthLoading(true);
      router.push('/landing');
    }
    else{
        const user = sessionStorage.getItem('activeUser');
        console.log(user);

        router.replace('/home');
      }
    },[router])
    
    
    if(loading){
      // setLoading(false);
      return <Loading/>;
  }

  // const PageComponent = ({ recommended_books }) => {
  // useEffect(() => {
  //   const sendRecommendations = async () => {
  //     try {
  //       const response = await fetch("/api/search", {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ searchResults: recommended_books }),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.statusText}`);
  //       }

  //       const result = await response.json();
  //       console.log('Response from server:', result);

  //     } catch (error) {
  //       console.log('ERROR:', error);
  //     }
  //   };

  //   if (recommended_books && recommended_books.length > 0) {
  //     sendRecommendations();
  //   }
  // }, [recommended_books]);
  // useEffect(() => {


  //   console.log('Hey')
  //   // try{
  //   //   // const response = await fetch("/api/seach",{
  //   //   //   method : 'POST',
  //   //   //   body: JSON.stringify({'searchResults' : recommended_books}),
  //   //   // });

  //   //   // const result = await response.json();
  //   //   console.log('Response from server:');
  //   // }
  //   // catch(error){
  //   //   console.log('ERROR: ', error);
  //   // }
  // }, [recommended_books])


  return (

    <>
    
      <Navbar onSearch={handleSearch}/>
      <BookList heading="Recommended" books={recommended_books} />
      <BookList heading="Recommended" books={recommended_books} />
      <BookList heading="Recommended" books={recommended_books} />
      <BookList heading="Recommended" books={recommended_books} />
    </>
  );
}



