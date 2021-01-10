import React, { useEffect } from 'react';

const useDocumentTitle = (title, fallbackTitle, render) => {
    
    useEffect(() => {
        document.title = title;

        return () => {
            document.title = fallbackTitle
        }
    }, [render])

}

export default useDocumentTitle;