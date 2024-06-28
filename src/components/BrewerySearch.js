import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchBreweries } from '../api';
import '../styles/BrewerySearch.css';

function BrewerySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('by_city');
  const [breweries, setBreweries] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchBreweries(searchType, searchTerm);
      setBreweries(response.data);
    } catch (error) {
      console.error('Search error', error);
    }
  };

  return (
    <div className="brewery-search-container">
      <h2>Search Breweries</h2>
      <form className="brewery-search-form" onSubmit={handleSearch}>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="by_city">By City</option>
          <option value="by_name">By Name</option>
          <option value="by_type">By Type</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
        <button type="submit">Search</button>
      </form>
      <ul className="brewery-list">
        {breweries.map(brewery => (
          <li key={brewery.id}>
            <Link to={`/brewery/${brewery.id}`}>
              <h3>{brewery.name}</h3>
              <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
              <p>Phone: {brewery.phone}</p>
              <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
              {brewery.average_rating && <p>Current Rating: {brewery.average_rating.toFixed(1)} / 5</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrewerySearch;
