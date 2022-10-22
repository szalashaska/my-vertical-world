import React, { useEffect, useState } from "react";
import {
  LinkStyled,
  PStyled,
  UpperFirstLetter,
} from "../constans/GlobalStyles";
import { FormInputStyled } from "./styled/FormInput.styled";
import {
  CloseIcon,
  InputButton,
  InputWrapper,
  SearchContentContainer,
  SearchIcon,
  SearchRadioInput,
  SearchRadioLabel,
  SearchResult,
  SearchResultAdditional,
  SearchResultsContainer,
  SearchWrapper,
} from "./styled/Search.styled";

let controller, signal;
const ALLOWED_CONTENT = ["routes", "walls", "locations", "all"];
const SELECTED_CONTENT = ["routes", "walls", "locations"];

const Search = ({ content }) => {
  const [query, setQuery] = useState("");
  const [selectedContent, setSelectedContent] = useState(
    content === "all" ? "routes" : content
  );
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  // Check if props are correct
  if (!ALLOWED_CONTENT.includes(content)) return null;

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
    if (query.length > 1) getData();

    // If user clears search box
    if (query === "") {
      // Abort fetch
      if (controller) controller.abort();
      setResults([]);
    }
  }, [query]);

  return (
    <SearchWrapper>
      {content === "all" && (
        <SearchContentContainer>
          {SELECTED_CONTENT.map((choice) => (
            <SearchRadioLabel
              key={choice}
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
            >
              <SearchRadioInput
                type="radio"
                value={choice}
                name={choice}
                checked={selectedContent === choice}
                onChange={(e) => setSelectedContent(e.target.value)}
              />
              {choice}
            </SearchRadioLabel>
          ))}
        </SearchContentContainer>
      )}
      <SearchWrapper>
        <FormInputStyled
          placeholder="Type name..."
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <InputButton
          type="button"
          onClick={() => {
            if (query) {
              setQuery("");
            }
          }}
        >
          {query ? <CloseIcon /> : <SearchIcon />}
        </InputButton>
      </SearchWrapper>

      {results.length > 0 && (
        <SearchResultsContainer>
          {results.map((result) => {
            // ---Routes---
            if (selectedContent === SELECTED_CONTENT[0])
              return (
                <SearchResult key={result.id}>
                  <LinkStyled to={`/${selectedContent}/${result.id}`}>
                    <UpperFirstLetter>{result.name}</UpperFirstLetter>
                    <SearchResultAdditional>
                      {"   "} {result.grade} on the{" "}
                      <UpperFirstLetter>{result.wall.name}</UpperFirstLetter>
                    </SearchResultAdditional>
                  </LinkStyled>
                </SearchResult>
              );

            // ---Walls---
            if (selectedContent === SELECTED_CONTENT[1])
              return (
                <SearchResult key={result.id}>
                  <LinkStyled to={`/${selectedContent}/${result.id}`}>
                    <UpperFirstLetter>{result.name}</UpperFirstLetter>
                    <SearchResultAdditional>
                      {"   "}at{" "}
                      <UpperFirstLetter>
                        {result.location.name}
                      </UpperFirstLetter>
                    </SearchResultAdditional>
                  </LinkStyled>
                </SearchResult>
              );

            // ---Locations---
            if (selectedContent === SELECTED_CONTENT[2])
              return (
                <SearchResult key={result.id}>
                  <LinkStyled to={`/${selectedContent}/${result.id}`}>
                    <UpperFirstLetter>{result.name}</UpperFirstLetter>
                  </LinkStyled>
                </SearchResult>
              );
          })}
          {loading && <PStyled align="center">Loading...</PStyled>}
        </SearchResultsContainer>
      )}
    </SearchWrapper>
  );
};

export default Search;
