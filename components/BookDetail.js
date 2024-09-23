import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Stars from './Stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHolding } from '@fortawesome/free-solid-svg-icons';

export default function BookDetail({ books }) {

  const { id } = useParams();
  // const book = books.BookIndex; // Get the book using ID from the URL

  const book = true;
  const [bookInfo, setbookInfo] = useState({});
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, content: 'Great book!', author: 'John Doe' },
  ]);


  useEffect(() => {
    try {
      console.log("Books", books);
      const value = JSON.parse(books);
      setbookInfo(value);
      console.log(value);
    }
    catch (error) {
      console.log(error);
    }
    // setbookInfo(JSON.parse(books));
  }, [books])

  const handleAddReview = () => {
    if (newReview.trim() !== '') {
      setReviews([...reviews, { id: reviews.length + 1, content: newReview, author: sessionStorage.getItem('activeUser') }]);
      setNewReview(''); // Clear the input field after adding the review
    }
  };

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-detail-container flex justify-center items-start p-[20px] bg-[#f8f9fa]">
      <div className="book-detail-card flex min-w-[50%] min-h-[70%] max-h-[85%] bg-white rounded-md shadow-lg overflow-hidden gap-[20px] max-w-[60%]">
        {/* Left: Book Image and Borrow Button */}
        <div className="book-photo-container w-[40%] flex flex-col items-center text-center p-0 mt-2  relative">
          {book.Thumbnail ? <img src={bookInfo.Thumbnail} alt={bookInfo.Title} className="book-detail-image w-[50%] h-auto object-cover rounded-s-md mt-3" /> : <img src='/cpp.jpeg' alt={bookInfo.Title} className="book-detail-image w-[50%] h-auto object-cover rounded-s-md mt-3" />

          }

          {/* Borrow Button */}
          <button className="group borrow-button inline-flex items-center justify-center p-1 cursor-pointer rounded-md hover:bg-slate-800 mt-[20px] border-b-2 hover:border-b-2 hover:border-[#f76040db]">
            <FontAwesomeIcon icon={faHandHolding} className='w-auto h-[25px] mr-[4px] p-1 group-hover:invert' />
            {/* <img
              src="/borrow.png" // Replace with actual icon path
              alt="Borrow Icon"
              className="borrow-icon"
            /> */}
            <span className='mt-3 text-lg p-1 group-hover:invert'> Borrow </span>
          </button>
        </div>

        {/* Right: Book Info */}
        <div className="book-info-container p-[20px] w-[60%] flex flex-col">
          <h1 className="book-detail-title text-lg text-black font-bold">{bookInfo.Title}</h1>
          <p className="book-detail-author text-[18px] mb-[10px]">by: {bookInfo.Author}</p>

          <div className="book-detail-rating">
            <Stars rating={bookInfo.Rating} />
            {/* <strong>Rating:</strong> {book.Rating} */}
          </div>
          {bookInfo.Description ?
            <p className="book-detail-description text-[16px] break-words mb-[20px] mt-2 "><strong> Description: </strong> {bookInfo.Description}</p>
            : <p className="book-detail-description text-[16px] break-words mb-[20px]">No description available</p>

          }

          <ul className="book-details-list list-none p-0">
            <li className='tetx-[16px] mb-[10px]'><strong >Publisher:</strong> {bookInfo.Publisher}</li>
            {bookInfo.publishedDate ?
              <li className='tetx-[16px] mb-[10px]'><strong >Published Date:</strong> {bookInfo.publishedDate}</li>
              : <li className='tetx-[16px] mb-[10px]'><strong >Published Date:</strong> Unknown </li>

            }
            {/* <li><strong>Pages:</strong> {book.pageCount}</li> */}
            {
              bookInfo.isKRC && bookInfo.count > 0 ?
                <li className='tetx-[16px] mb-[10px]'><strong >Available in KRC</strong></li> :
                <li className='tetx-[16px] mb-[10px]'><strong >Not available in KRC</strong></li>

            }
            <li><strong>Categories:</strong> {bookInfo.mycategories}</li>
          </ul>

          <h1 className='reviews mt-[30px] text-black text-[18px] font-bold'>Add Review</h1>
          <textarea
            className="review-textbox w-[100%] h-[100px] text-black mt-[10px] p-[10px] text-[14px] border-2 border-gray-500 rounded outline-none"
            placeholder="Write your review here..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button onClick={handleAddReview} className="submit-review-button text-white mt-[10px] bg-[#2368b2f3] p-2 border-none rounded cursor-pointer hover:bg-[#f76060fb]">Submit Review</button>

          <h1 className='reviews mt-[30px] text-black text-[18px] font-bold'>Reviews</h1>
          <ul className="review-list list-none p-0 mt-[20px] text-[#171717]">
            {reviews.map((review) => (
              <li key={review.id} className="review-item mb-[10px] pb-[10px] border-b-2  border-gray-200">
                <strong>{review.author}:</strong> {review.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
