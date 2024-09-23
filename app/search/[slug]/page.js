"use client"
import BookList from '@/components/BookList';
import Stars from '@/components/Stars';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Loading from '@/app/Loading';
import { resolve } from 'styled-jsx/css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



const workSans = Work_Sans({ weight: "500", subsets: ["latin"] })
export default function search({ params }) {
  const [recommended_books, setRecommendedbooks] = useState([])
  const [loading, setLoading] = useState(true);

  const { slug } = params;
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    try {
      if (slug === 'search') {
        // slug = '';
        router.push('/home');
      }
      else {
        fetch('http://localhost:5000/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: decodeURIComponent(slug) }),
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
          else {
            console.log("ERROR");
          }
        }).then(data => {
          setRecommendedbooks(data.recommended);
          console.log(data);
        }).catch(error => {
          console.error(error);
        });
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }

  }, [slug]);

  const handleSearch = async (searchValue) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 4000));
      // setLoading(true);
      // console.log("Slug :", slug);

      router.push(`/search/${searchValue}`);
    }
    catch (error) {
      console.log(error);
      setLoading(false);

    }
    finally {
      setLoading(false);
    }
  };


    // const logDetails = {

    //   action: "click",
    //   categories: ["C++", "JAVA"],
    //   timestamp: "today",
    //   // ,
    //   // routingKey : "1234",
    // };



    // try {
    //   const response = await fetch('http://localhost:15672/api/exchanges/%2f/exchange1/publish', {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Basic ' + btoa("guest:guest"),
    //     },
    //     body: JSON.stringify({ properties: {}, payload: JSON.stringify(logDetails), routingKey: '1234', payload_encoding: "string" }),
    //   });

    //   console.log("Producer Connected");
    //   console.log(logDetails);

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   const data = await response.text();
    //   console.log(data);
    // } catch (error) {
    //   console.error('Error sending log to RabbitMQ:', error);
    // }

 

  const handleTitle = async (title, index) =>{
    console.log(title, index);
    router.push(`/bookinfo/${title}`)
  }





  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="book-stack flex flex-col justify-items-center mx-auto max-w-[80%] items-center ">
        ({recommended_books.length > 0 ? <h1 className={`${workSans.className} p-4 text-black text-xl font-extrabold`}>Showing search results for {decodeURIComponent(slug)}</h1> : <h1 className={`${workSans.className} p-4 text-black text-xl font-extrabold`}>No search results found for  {decodeURIComponent(slug)}</h1>})

        {recommended_books.map((book) => (
          <div key={book.Index} className={`${workSans.className} book-card flex items-center justify-items-start border-2 border-white p-10 min-w-[80%] mb-[10px] shadow-lg relative transition duration-300 ease hover:translate-y-[-5px]`}>

            <img src="/cpp.jpeg" alt={Image} className="book-image w-[100px] h-[150px] object-cover mr-[24px] " />
            <div className="book-info flex flex-col justify-between w-[100%] ">
              <h1 className="book-title text-black text-[18px] font-bold text-ellipsis max-w-3xl hover:cursor-pointer" onClick={()=> handleTitle(book.Title, book.Index)}>Title: {book.Title}</h1>
              <p className="book-author text-[1em] text-gray-600">Author: {book.Author}</p>

              <span className='text-black text-sm group-hover:text-white mb-2'><Stars rating={book.Rating} /></span>
              {/* <p className="book-tag text-[1em] text-gray-600">Tags: {book.Categories}</p> */}
              <p className="book-tag text-[1em] text-black">
                Tags: {book.Categories.split(',').slice(0, 2).join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  // <BookList heading={slug} books={recommended_books}/>
  // recommended_books.map((book, index) => (
  //   <Card
  //     key={index}
  //     Title={book.Title}
  //     Author={book.Author}
  //     Count={book.Count}
  //     Categories={book.Categories}
  //     Rating={book.Rating}
  //   />
  // ))
}





// export default search
