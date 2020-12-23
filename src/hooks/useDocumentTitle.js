import { useEffect} from 'react'

function useDocumentTitle(title, fallbackTitle) {
  
  useEffect(() => {
    document.title = title + ' cookies - Cookie Clicker'
    return () => {
      document.title  = fallbackTitle
    }
  },[title, fallbackTitle])


}

export default useDocumentTitle
