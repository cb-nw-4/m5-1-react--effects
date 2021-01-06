import React, { useState, useEffect, useRef }  from "react";



const useKeyDown = (code, callback) => {
    const onKeyDown = (code) => {
        code.preventDefault();
        if (code.code === "Space") {
         return callback
        }
      };
      useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
    
        return () => {
          window.removeEventListener("keydown", onKeyDown);
        };
      }, [onKeyDown]);
}

export default useKeyDown;