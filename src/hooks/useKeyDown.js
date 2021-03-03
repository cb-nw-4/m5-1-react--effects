import { useEffect } from "react";

const useKeyDown = (code, callback) => {
  function handleKeydown(ev) {
    if (ev.keyCode === code) {
      // Trigger here
      callback(); //setNumCookies(numCookies+1)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
};

export default useKeyDown;
