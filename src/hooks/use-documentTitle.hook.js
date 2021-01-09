import { useEffect } from 'react';

const useDocumentTitle = (title, fallBackTitle, numCookies) => {
  useEffect(() => {
    if(numCookies > 0) {
      window.document.title = title;
    }
    return() => {
      window.document.title = fallBackTitle;
    }
  });
}

export default useDocumentTitle;