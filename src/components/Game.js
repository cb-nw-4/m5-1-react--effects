import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


import Item from "./Item";
import useKeydown from "./useKeydown"
import useDocumentTitle from "./useDocumentTitle";
import useInterval from "../hooks/use-interval.hook"

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1, clickType: "tick"},
  { id: "grandma", name: "Grandma", cost: 100, value: 10, clickType: "tick"},
  { id: "farm", name: "Farm", cost: 1000, value: 80 , clickType: "tick"},
  { id: "megaCursor", name: "MegaCursor", cost: 0, value: 1, clickType: "click" },
];

const Game = () => {

  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);
  const initialState = {
    cursor: 0,
    grandma: 0,
    farm: 0,
    megaCursor: 0
  };
  
  const [purchasedItems, setPurchasedItems] = useState(initialState);

  const handleCookiesClick = () =>{
    setNumCookies((numCookies) => numCookies + 1)
    //console.log(numCookies, 'space cookie')
  }


  useKeydown('Space', handleCookiesClick);


  const handleClick = (item) =>{

    if(numCookies-item.cost > 0 && item.clickType === "tick" ){
      console.log(item)
      setNumCookies(numCookies - item.cost);
      
      //Increase the price for the cookies 
      item.cost += Math.floor(Math.random() * purchasedItems[item.id]);

      setPurchasedItems({...purchasedItems, [item.id]: purchasedItems[item.id]+1})
    }    
    //console.log({...purchasedItems, [item.id]: +1})

    if(item.clickType === "click" ){
      console.log(item)
      setNumCookies((numCookies) => numCookies + 1)
      
    }  
  }
  
  const calculateCookiesPerTick =(ObjItems) =>{
    let total = 0;
    
    items.map(item => 
      total += ObjItems[item.id] * item.value)
      
      return total;   
  }


  useDocumentTitle(numCookies, `Cookie Clicker Workshop` );

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    // Add this number of cookies to the total
    setNumCookies(numCookies + numOfGeneratedCookies);

  }, 1000);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
            <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second
        </Indicator>
        <Button onClick={handleCookiesClick}>
          <Cookie src={cookieSrc} />
        </Button>

      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map(item => (
            <Item key={item.id} 
                  name={item.name} 
                  cost={item.cost} 
                  value={item.value}
                  numOwned ={purchasedItems[item.id]}
                  focusOnMount={(item.id ==='cursor') }
                  handleClick = {()=> handleClick(item)}
            />

        ))}
      
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
