"use client"
import BookList from '@/components/BookList';
import Stars from '@/components/Stars';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';



const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })
export default function search({ params }) {
  const [recommended_books, setRecommendedbooks] = useState([])

  const { slug } = params;
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: slug }),
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
  }, [slug]);

  const handleSearch = (searchValue) => {
    router.push(`/search/${searchValue}`);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="book-stack flex flex-col justify-items-center mx-auto max-w-[80%] items-center ">
        <h1 className="p-4 text-black text-xl">Showing search results for {slug}</h1>

        {recommended_books.map((book, index) => (
          <div key={index} className={`${workSans.className} book-card flex items-center justify-items-start border-2 border-white p-10 min-w-[80%] mb-[10px] shadow-lg relative transition duration-300 ease hover:translate-y-[-5px]`}>

            <img src="/cpp.jpeg" alt={Image} className="book-image w-[100px] h-[150px] object-cover mr-[24px] " />
            <div className="book-info flex flex-col justify-between w-[100%] ">
              <h1 className="book-title text-black text-[18px] font-bold text-ellipsis max-w-3xl">Title: {book.Title}</h1>
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
