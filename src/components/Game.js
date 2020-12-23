import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from './Item';
import useInterval from '../hooks/use-interval.hook';
import useKeyDown from '../hooks/use-keydown.hook';
import useDocumentTitle from '../hooks/use-documentTitle.hook';

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });  
  

  const calculateCookiesPerTick = (purchasedItems)=>{
    const cookiesperTick = items.reduce((a, b)=>{
      return a + b.value * purchasedItems[b.id];
    }, 0);
    return cookiesperTick;
  };  

  const handleClick = (ev, id, cost)=>{
    ev.preventDefault();
    if (numCookies < cost){
      window.alert("You need more cookies!");
      return;
    }
    setNumCookies(prevNumCookies => prevNumCookies - cost);
    setPurchasedItems({...purchasedItems, [id]: purchasedItems[id] + 1});  
  };  

  const setNumCookiesCallback = useCallback(()=>{
    setNumCookies(prevNumCookies => prevNumCookies + 1);
  }, []); 
 
  useDocumentTitle(`${numCookies} cookies - Cookie Clicker Workshop`, 'Cookie Clicker Workshop');
  
  useKeyDown(setNumCookiesCallback, "Space");  

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);  
    setNumCookies(prevNumCookies => prevNumCookies + numOfGeneratedCookies); 
  }, 1000);

  

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second
        </Indicator>
        <Button onClick={()=>(setNumCookies(prevNumCookies => prevNumCookies + 1))}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index)=>(<Item
                              key={item.id}
                              id={item.id}
                              name={item.name}
                              cost={item.cost}
                              value={item.value}
                              numOwned={purchasedItems[item.id]}
                              handleClick={handleClick}
                              focusOnMount={index === 0}
                              />))/* TODO: Add <Item> instances here, 1 for each item type. */}
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
