import { useCallback, useEffect, useRef } from "react";

// function useKeyDown(eventCode, cb, element = global) {
//   const elementRef = useRef(element);
//   const eventCodeRef = useRef(eventCode);
//   const callBack = useCallback(cb, [cb]);

//   useEffect(() => {
//     const currentElementRef = elementRef.current;
//     const currentEventCodeRef = eventCodeRef.current;
//     currentElementRef.addEventListener(currentEventCodeRef, callBack);

//     return () => {
//       currentElementRef.removeEventListener(currentEventCodeRef, callBack);
//     };
//   }, [callBack]);
// }

function useKeyDown(cb, element = global) {
    const elementRef = useRef(element);
    const callBack = useCallback(cb, [cb]);
  
    useEffect(() => {
      const currentElementRef = elementRef.current;
      currentElementRef.addEventListener("keydown", callBack);
  
      return () => {
        currentElementRef.removeEventListener("keydown", callBack);
      };
    }, [callBack]);
  }
  
export default useKeyDown;