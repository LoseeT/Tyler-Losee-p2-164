import React, { useState } from "react";
import lunr from "lunr";

const Search = ({ index, store }) => {
  console.log("Search index:", index);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = event => {
    const term = event.target.value;
    setQuery(term);

    if (!term) {
      setResults([]);
      return;
    }

    const idx = lunr.Index.load(JSON.parse(index));
    const searchResults = idx.search(term).map(({ ref }) => store.find(doc => doc.id === ref));
    setResults(searchResults);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch} placeholder="Search posts..." />
      <ul>
        {results.map(post => (
          <li key={post.id}>
            <a href={`/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
