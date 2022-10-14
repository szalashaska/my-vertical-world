import React, { useEffect, useState } from "react";

let controller, signal;
const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedContent, setSelectedContent] = useState("routes");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  const getData = async () => {
    let endpoint = `/api/search?content=${selectedContent.trim()}&query=${query}`;

    setLoading(true);

    // Abort previous fetch
    if (controller) controller.abort();

    // Create controller for current fetch
    controller = new AbortController();
    signal = controller.signal;

    try {
      const response = await fetch(endpoint, { signal });
      const data = await response.json();

      if (response.status === 200) {
        setLoading(false);
        setResults(data);
      }
    } catch (err) {
      // Aborted fetch case
      if (err.name == "AbortError") {
        return;
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  useEffect(() => {
    if (query) {
      getData();
    }
  }, [query]);

  return (
    <div>
      <div>{selectedContent}</div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        <label>
          <input
            type="radio"
            value="routes"
            name="routes"
            checked={selectedContent === "routes"}
            onChange={(e) => setSelectedContent(e.target.value)}
          />
          Routes
        </label>
        <label>
          <input
            type="radio"
            value="walls"
            name="walls"
            checked={selectedContent === "walls"}
            onChange={(e) => setSelectedContent(e.target.value)}
          />
          Walls
        </label>
        <label>
          <input
            type="radio"
            value="locations"
            name="locations"
            checked={selectedContent === "locations"}
            onChange={(e) => setSelectedContent(e.target.value)}
          />
          Locations
        </label>
      </div>

      <div>
        {results.length &&
          results.map((result) => <div key={result.id}>{result.name}</div>)}
      </div>
    </div>
  );
};

export default Search;
