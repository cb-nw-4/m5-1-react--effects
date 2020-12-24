import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from './Item';
import useInterval from '../hooks/use-interval.hook';
import useKeyDown from '../hooks/use-keydown.hook';
import useDocumentTitle from '../hooks/use-documentTitle.hook';

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1, perTick:true },
  { id: "grandma", name: "Grandma", cost: 100, value: 10, perTick:true },
  { id: "farm", name: "Farm", cost: 1000, value: 80, perTick:true },
  { id: "megaCursor", name: "megaCursor", cost: 100, value: 10, perTick:false }
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megaCursor: 0
  });    

  const calculateCookiesPerClick = (megaCursorNum)=>{
    const cookiesperClick = items.reduce((a, b)=>{
      return !b.perTick ? a + b.value * megaCursorNum : a;
    }, 1);    
    return cookiesperClick;
  };   

  const calculateCookiesPerTick = (purchasedItems)=>{
    const cookiesperTick = items.reduce((a, b)=>{
      return b.perTick ? a + b.value * purchasedItems[b.id] : a;
    }, 0);
    return cookiesperTick;
  };  

  const costGrowth = (itemId, numPurchagedItems) =>{

    items.forEach((item)=>{
      if (item.id === itemId) {
        console.log(item.cost.toString().length *  numPurchagedItems);
        item.cost = item.cost + item.cost.toString().length *  numPurchagedItems;
      }
    });
  };

  const handleClick = (ev, id, cost)=>{
    ev.preventDefault();
    if (numCookies < cost){
      window.alert("You need more cookies!");
      return;
    }
    costGrowth(id, purchasedItems[id] + 1);
    setNumCookies(prevNumCookies => prevNumCookies - cost);
    setPurchasedItems({...purchasedItems, [id]: purchasedItems[id] + 1});  
  };  

  const setNumCookiesCallback = useCallback(()=>{
    setNumCookies(prevNumCookies => prevNumCookies + calculateCookiesPerClick(purchasedItems.megaCursor));
  }, [purchasedItems.megaCursor]); 
 
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
          <p><strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second </p>
          <p><strong>{calculateCookiesPerClick(purchasedItems.megaCursor)}</strong> cookie(s) per click</p>
        </Indicator>
        <Button onClick={setNumCookiesCallback}>
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
                              perTick={item.perTick}
                              numOwned={purchasedItems[item.id]}
                              handleClick={handleClick}
                              focusOnMount={index === 0}
                              />))}
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
