import React, {useState, useEffect} from "react";

import styled from "styled-components";

const ClickedItem = ({key, value, cookieCount, setCookieCount, purchasedItems }) => {

    const { cursor, grandma, farm } = purchasedItems;
    const [numOwned, setNumOwned] = useState(0);
    const [categorySelected, setCategorySelected] = useState(false);
    const [isClicked, setIsClicked] = useState([""]);
  
  
  
      const [allCategory, setAllCategory] = useState(purchasedItems);
    const handleClick = (event) => {
        setIsClicked(!isClicked);
      
    
        if (cookieCount > 0) {
          setCookieCount(cookieCount - event.currentTarget.value);
          // } else {
          //   return alert("You are out of cookies!");
        }
       
          if (event.currentTarget.id === Object.keys(purchasedItems)) {
            setCategorySelected(true);
            setIsClicked(event.currentTarget.id);
      
          }
        
    
      };
  return (
      
    <Button onClick={handleClick} >
        {value}
    </Button>
   
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
`;
const Button = styled.button`
 

 
`;



export default ClickedItem;
