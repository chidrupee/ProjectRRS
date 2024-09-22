import React from 'react'
import { faStar, faStarHalfAlt, faStar as faRegularstar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Stars({rating}) {
    const starCount = [];
    for(let i = 0; i < Math.floor(rating); i++){
        starCount.push(<FontAwesomeIcon key={i} icon={faStar} className='text-yellow-300 h-4 w-auto'/>);

    }

    if(rating % 1 !== 0){
        starCount.push(<FontAwesomeIcon key="halfStarIcon" icon={faStarHalfAlt} className='text-yellow-300 h-4 w-auto'/>)
    }
    const emptyStarCount = 5 - Math.ceil(rating);
    for(let j = 0; j < emptyStarCount; j++){
        starCount.push(<FontAwesomeIcon key={j} icon={faRegularstar} className='text-gray-200 h-4 w-auto'/>);
    }

  return (
    <div className='flex'>
        {starCount}
    </div>
  )
}
