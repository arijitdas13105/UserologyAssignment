
"use client";
import React,{ useEffect, useState }  from "react"; 
import { useDispatch } from "react-redux";
import { setArticles, setLoading, setError } from "../redux/slices/newsSlice";



const useNews = () => {
  console.log("hiting api useNews ")
  const dispatch = useDispatch();
    const newsApi=process.env.NEXT_PUBLIC_NEWS_API
    // const [news, setNews] = useState([]);
  
    const fetchNews = async () => {
      console.log("Fetching news...");
       try {
        dispatch(setLoading(true));
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${newsApi}&q=crypto`
        );
        console.log("Response from newss",response)
        const data = await response.json();
        // setNews(data.results?.slice(0, 5) || []);
        const articles = Array.isArray(data?.results)
        ? data.results.slice(0, 5)
        : [];
      dispatch(setArticles(articles));

        // dispatch(setArticles(data.results?.slice(0, 5) || []));
      } catch (error) {
        dispatch(setError(error.message));
        console.error("Error fetching news:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
  
    useEffect(() => {
      fetchNews();
    }, []);
  
    return {   fetchNews };
  };
  
  export default useNews;
 