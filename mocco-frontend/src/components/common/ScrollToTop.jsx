import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Extracts pathname property from the current URL location
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scrolls browser window to the top-left coordinate
    window.scrollTo(0, 0);
  }, [pathname]); // Fires every single time the route path changes

  return null; // This component doesn't need to render any HTML elements
};

export default ScrollToTop;
