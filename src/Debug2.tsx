import React, { useState, useEffect } from "react";
import _ from "lodash";

function WindowResizeListener() {
  // State to track window dimensions
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Event handler for resize
  const handleResize = _.debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 200); // Debounced for better performance

  useEffect(() => {
    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      handleResize.cancel(); // Cancel the debounced function
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <h1>Window Size</h1>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
    </div>
  );
}

export default WindowResizeListener;
