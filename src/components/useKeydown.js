import { useEffect } from "react";

const useKeydown = (code, callback) => {

    function handleKeydown(event) {
        if (event.code === code) {
            callback();
        }
    }

    useEffect(() => {
    
        window.addEventListener("keydown", handleKeydown);
    
        return () => (
            window.removeEventListener("keydown", handleKeydown)
        )
    });
}

export default useKeydown;