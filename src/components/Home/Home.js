// dependencies
import React, { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';
import axios from 'axios';
import NewsItem from './../NewsItem/NewsItem';
import './Home.css';

const Home = () => {
   const [loading, setLoading] = useState(true);
   const [news, setNews] = useState([]);
   const [page, setPage] = useState(1);
   const [searchValue, setSearchValue] = useState('');

   useEffect(() => {
      try {
         setLoading(true);

         axios
            .get(
               `http://hn.algolia.com/api/v1/search?query=${page} || ${searchValue}`
            )
            .then((res) => {
               setLoading(false);
               setNews(res.data.hits);
            });
      } catch (err) {
         console.log(`There was a problem!`);
      }
   }, [page, searchValue]);

   const searchData = (e) => {
      setPage(0);
      let inputValue = e.target.value;
      setSearchValue(inputValue);
   };

   const incrementPage = () => {
      setLoading(true);
      let pageIncrement = page + 1;
      if (pageIncrement > 50) {
         pageIncrement = 1;
      }
      setPage(pageIncrement);
   };

   const decrementPage = () => {
      setLoading(true);
      let pageDecrement = page - 1;
      if (pageDecrement < 1) {
         pageDecrement = 50;
      }
      setPage(pageDecrement);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   // loader css
   const loaderStyle = {
      display: 'block',
      margin: '0 auto',
   };

   return (
      <div className="home">
         <div className="search-area">
            <h1> Search Tech News </h1>
            <form onSubmit={handleSubmit}>
               <input
                  onChange={searchData}
                  value={searchValue}
                  placeholder="Search here..."
                  type="text"
               />
               <br />
               {/* <input type="submit" value="Search" /> */}
            </form>
            <div className="pagination">
               <button onClick={decrementPage}> Prev </button>{' '}
               <b>{page} of 50</b>{' '}
               <button onClick={incrementPage}> Next </button>
            </div>
            <div className="line">
               <hr />
            </div>
         </div>
         {loading ? (
            <GridLoader css={loaderStyle} color="#A4A47E" loading={loading} />
         ) : (
            <div className="news-items">
               <NewsItem newsState={{ news, setNews }} />
            </div>
         )}
      </div>
   );
};

export default Home;
