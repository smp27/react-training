import { useState, useEffect, useRef } from "react";
import { RotatingLines } from 'react-loader-spinner'

import Card from "../components/Card";
import useCurrentTime from "../hooks/useCurrentTime";

import {SOURCES_LIST, TOPICS, API_KEY} from "../utils/constants"

export default function Home() {

  const [filters, setFilters] = useState({
    topic: TOPICS[0],
    source: SOURCES_LIST[0]
  })
  const [newsList, setNewsList] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const currentTime = useCurrentTime();
  const [isLoading, setIsLoading] = useState(false);
  const searchInputElRef = useRef();

  const filteredNewsList = newsList.filter(newsItem => {
    return newsItem.title?.toLowerCase().includes(searchInputValue?.toLowerCase()) ||
    newsItem.text?.toLowerCase().includes(searchInputValue?.toLowerCase())
  })
  const numberOfArticles = filteredNewsList.length;

  useEffect(() => {
    fetchNews(filters);
  }, [filters]);
  

  async function fetchNews(filters) {
    setIsLoading(true);
    const response = await fetch(
      `https://api.worldnewsapi.com/search-news?text=${filters.topic}&news-sources=${filters.source}&api-key=${API_KEY}`,
      {
        cache: "force-cache",
      }
    );
    if (response.ok) {
      const newsList = await response.json();
      setNewsList(newsList.news);
    } else alert("Service usage exceeded for today!");
    setIsLoading(false)
  };

  function handleTopicChange(event) {
    setFilters({...filters, topic: event.target.value});
  }
  function handleSourceChange(event) {
    setFilters({...filters, source: event.target.value});
  }
  function handleSearchInputChange(event) {
    setSearchInputValue(event.target.value);
  }
  function handleClear() {
    setSearchInputValue('');
    searchInputElRef.current.focus();
  }

  console.log("rendering Home component");
  return (
    <>
      <h3 className="title">{currentTime}</h3>
      <div className="mb-5 is-justify-content-space-between is-flex">
        <div className="field">
          <label className="label">Topic</label>
          <div className="control">
            <div className="select is-rounded">
              <select value={filters.topic} onChange={handleTopicChange}>
                  {TOPICS.map(topic => <option key={topic} value={topic}>{topic}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">News Source</label>
          <div className="control">
            <div className="select is-rounded">
              <select value={filters.source} onChange={handleSourceChange}>
                  {SOURCES_LIST.map(source => <option key={source} value={source}>{source}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="has-text-centered mb-5">
        <RotatingLines
          visible={isLoading}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
      </div>
      {newsList.length ? (
        <>
          <h1 className="title has-text-centered mb-5">
            Showing {numberOfArticles} articles
          </h1>
          <div className="has-text-centered mb-5">
            <input
              ref={searchInputElRef}
              className="input is-rounded"
              type="text"
              placeholder="Search articles"
              style={{maxWidth: '250px'}}
              value={searchInputValue}
              onChange={handleSearchInputChange}
            />
            <button className="button is-danger is-outlined is-rounded ml-4" onClick={handleClear}>
              <span>Clear</span>
              <span className="icon is-small">&#10005; </span>
            </button>
          </div>
          <div className="news-list columns is-flex-wrap-wrap is-justify-content-space-between">
            {filteredNewsList.map((newsItem) => (
              <Card key={newsItem.id} {...newsItem} />
            ))}
          </div>
        </>
        ) : !isLoading && (
        <h1 className="title has-text-centered">
          No news articles to show
        </h1>
      )}
    </>
  );
}
