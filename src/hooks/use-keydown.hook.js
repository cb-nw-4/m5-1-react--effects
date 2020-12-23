import { useEffect } from 'react';

const useKeydown = (handleKeydown)=> {
    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
            return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    });
}; 

export default useKeydown;
