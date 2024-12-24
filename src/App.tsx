import { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // debounce returns a new function each time it is called. Use useMemo instead of useCallback for this case.
  const handleWindowSizeChange = useMemo(
    () =>
      debounce(() => {
        setWindowWidth(window.innerWidth);
      }, 300),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      handleWindowSizeChange.cancel(); // clean up debounce
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  const isMobile = windowWidth <= 500;
  return isMobile ? <div>Mobile View</div> : <div>Desktop View</div>;
}

export default App;
