// dependencies
import React from 'react';

const NewsItem = ({ newsState }) => {
   const { news, setNews } = newsState;

   const removeItem = (id) => {
      const newNews = news.filter((item) => item.objectID !== id);
      setNews(newNews);
   };

   return (
      <>
         {news.map((singleNews) => {
            const { title, points, author, num_comments, objectID, url } =
               singleNews;

            return (
               <div className="single-item" key={objectID}>
                  <h3> {title} </h3>
                  <p>
                     {points} points by {author} | {num_comments} comments
                  </p>
                  <a href={url}> Read More </a>{' '}
                  <button onClick={() => removeItem(objectID)}> Remove </button>
               </div>
            );
         })}
      </>
   );
};

export default NewsItem;
