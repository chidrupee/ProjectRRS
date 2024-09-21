"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BookList from "@/components/BookList";
import Card from "@/components/Card";
import Landing from "@/components/Landing";
import { useRouter } from "next/navigation";
// import { useState } from "react";
export default function Home() {
  const [recommended_books, setRecommendedbooks] = useState([]);
  const router = useRouter();

  const handleSearch = (searchValue) => {
    // try {
    //   const response = await fetch('http://localhost:5000/search', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ 'query': searchValue }),
    //   });

    //   const result = await response.json();
    //   if (result && result.recommended) {
    //     setRecommendedbooks(result.recommended);
    //   } else {
    //     console.error('Expected "recommended" in the response:', result);
    //   }

    //   // const searchResponse = await fetch('/search', {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   // body: JSON.stringify({ 'query': recommended_books }),
    //   // });

    //     // console.log(searchResponse);

    //   // Redirect after handling the response
    //   // if()
      
    //   // setRecommendedbooks(result['recommended']);
      
    //   // // const  searchResponse = await fetch('/api')
    //   // router.push('/search');
    // } catch (error) {
    //   console.error('ERROR OCCURED', error);
    // }
    router.push(`/search/${searchValue}`);
  };

  useEffect(() => {
    const authenticated = sessionStorage.getItem('auth');

    if(!authenticated  || authenticated === 'false'){
      router.push('/landing');
    }
    else{
      router.push('/');
    }
  },[])
  

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
    // <>
    // {/* <Navbar/> */}
    // {/* <Landing/> */}
    // </>
    // <div className="container">
    <>
    
      <Navbar onSearch={handleSearch} />
      <BookList heading="Recommended" books={recommended_books} />
      <BookList heading="Recommended" books={recommended_books} />
      <BookList heading="Recommended" books={recommended_books} />
      <BookList heading="Recommended" books={recommended_books} />
    </>
  );
}

