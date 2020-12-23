import { useEffect } from 'react';

const useDocumentTitle = (numCookies)=> {
    useEffect(() => {
        document.title = `${numCookies} cookies - Cookie Clicker Workshop`;
        return () => {
            document.title = `Cookie Clicker Workshop`;
        }
    },[numCookies]); 
}; 

export default useDocumentTitle;