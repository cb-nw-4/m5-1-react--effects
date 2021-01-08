import React, { useState, useEffect, useRef }  from "react";

const useDocumentTitle = (title, fallbackTitle) => {
    useEffect(() => {
        document.title = `${title} cookies - Cookie Clicker Workshop`;
        return () => {
          document.title = fallbackTitle;
        };
      }, [title]);
}
export default useDocumentTitle;