import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Item from "./Item";
import useInterval from "../hooks/use-interval.hook"

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {

  
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);
  const initialState = {
    cursor: 0,
    grandma: 0,
    farm: 0,
  };
  
  const [purchasedItems, setPurchasedItems] = useState(initialState);
  let focusOnMount = false;

  
  const handleClick = (item) =>{

    if(numCookies-item.cost > 0){
      setNumCookies(numCookies - item.cost);
      setPurchasedItems({...purchasedItems, [item.id]: purchasedItems[item.id]+1})
    }    
    //console.log({...purchasedItems, [item.id]: +1})
  }
  
  const calculateCookiesPerTick =(ObjItems) =>{
    let total = 0;
    
    items.map(item => 
      total += ObjItems[item.id] * item.value)
      
      return total;   
  }

  const handleCookiesClick = () =>{
    setNumCookies((numCookies) => numCookies + 1)
    console.log(numCookies, 'space cookie')
  }

  function handleKeydown(ev) {
    if (ev.code === "Space") {
      console.log('space')
      handleCookiesClick()
    }
  }

  useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`
        
    return () => {
      document.title = `Cookie Clicker Workshop`
    }
  }, [numCookies])   

      
  useEffect(() => {
    
    window.addEventListener("keydown", handleKeydown)
    return () => {
      window.removeEventListener("keydown", handleKeydown)
    };
  });

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
        <Button onClick={(ev) => handleKeydown(ev)}>
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
                focusOnMount={focusOnMount = (item.id ==='cursor') }
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
