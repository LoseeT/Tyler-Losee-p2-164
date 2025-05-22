import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import lunr from "lunr";

const SearchPage = ({ pageContext }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const index = lunr.Index.load(JSON.parse(pageContext.index));
  const store = pageContext.store;

  const handleSearch = (event) => {
  const input = event.target.value.trim();
  setQuery(input.toLowerCase());

  if (input.length > 0) {
    const searchResults = index.search(input, {
      fields: {
        title: { boost: 10 },
        content: { boost: 5 },
        tags: { boost: 8 }
      },
      bool: "AND", 
      expand: true, 
      editDistance: 2,
    }).map(result => store.find(post => post.id === result.ref));

    setResults(searchResults);
  } else {
    setResults([]);
  }
};

  return (
    <Layout>
      <h1>Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search word..."
      />
      {results.length === 0 && query.length > 0 && <p>No results found.</p>}
      <ul>
        {results.map((post) => (
          <li key={post.id}>
            <a href={`${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default SearchPage;
