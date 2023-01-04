import React, { useEffect, useRef } from "react";
import { FlexContainer } from "../constans/GlobalStyles";
import RouteCard from "./RouteCard";

const RoutesContainer = ({ routes, loading, nextPage, getData }) => {
  const observer = useRef(null);
  const containerRef = useRef(null);

  const handleObserveAndLoadContent = (item) => {
    // Clear previous observation
    if (observer.current) observer.current.disconnect();

    // Create observer that watches last object of container
    observer.current = new IntersectionObserver((items) => {
      if (items[0].isIntersecting && nextPage) {
        // Get more data if last object is displayed and there is paginated data
        getData(nextPage);
      }
    });

    // Watch last item
    observer.current.observe(item);
  };

  useEffect(() => {
    if (containerRef && containerRef.current.children.length > 0) {
      // Get last item of container
      const lastItemIndex = containerRef.current.children.length - 1;
      const lastItem = containerRef.current.children[lastItemIndex];

      handleObserveAndLoadContent(lastItem);
    }
  }, [routes]);

  return (
    <FlexContainer column ref={containerRef}>
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
      {loading && <div>Loading...</div>}
    </FlexContainer>
  );
};

export default RoutesContainer;
