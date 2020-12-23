import React , { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useKeydown from "../hooks/use-keydown.hook";
import useDocumentTitle from "../hooks/use-documentTitle.hook";

const items = [
  { id: "cursor", name: "Cursor", value: 1, operationPer: "second" },
  { id: "grandma", name: "Grandma", value: 10, operationPer: "second" },
  { id: "farm", name: "Farm", value: 80, operationPer: "second" },
  { id: "megacursor", name:"Megacursor", value: 10, operationPer: "click" },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [itemCosts, setItemCosts] = useState({
    cursor:10,
    grandma:100,
    farm:1000,
    megacursor:100,
  });
  const [numCookies,setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megacursor:0,
  });
  let cookiesPerSecond = purchasedItems.cursor*1+purchasedItems.grandma*10+purchasedItems.farm*80;

  useDocumentTitle(numCookies);

  const itemHandleClick =(id)=> {
    if(numCookies>=itemCosts[id]) {
      setNumCookies(numCookies-itemCosts[id]);
      setPurchasedItems({...purchasedItems, [id]: purchasedItems[id]+1});
      setItemCosts({...itemCosts, [id]:itemCosts[id]+Math.pow(2,purchasedItems[id])});
    } else{
      window.alert("Not enough cookies");
    };
  };

  const calculateCookiesPerTick = (purchasedItems)=>{
    // if you have 3 cursors and 1 farm, your total cookies per tick is 83 (1 × 3 + 80 × 1)
    const cursorCount = purchasedItems.cursor; 
    const grandmaCount = purchasedItems.grandma; 
    const farmCount = purchasedItems.farm; 
    return cursorCount*1 + grandmaCount*10 + farmCount*80;
  };

  const cookieHandleClick =()=>{
    if(purchasedItems.megacursor===0){
      setNumCookies(numCookies+1);
    } else {
      setNumCookies(numCookies+purchasedItems.megacursor*10);
    };
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    // Add this number of cookies to the total
    setNumCookies(numCookies+numOfGeneratedCookies);
  }, 1000);

  const handleKeydown = (ev)=> {
    if (ev.code === "Space") {
      console.log("Space","numCookies:",numCookies);
      cookieHandleClick();
    }
  }; 

  useKeydown(handleKeydown);

  let focusOnMount;

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{cookiesPerSecond}</strong> cookies per second
        </Indicator>
        <Button onClick={cookieHandleClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map((item,index)=>{
          if(index===0){
            focusOnMount = true;
          } else {
            focusOnMount = false;
          };
          return (
            <Item
              id={item.id}
              name={item.name}
              cost={itemCosts[item.id]}
              value={item.value}
              operationPer={item.operationPer}
              purchasedItems={purchasedItems}
              key={item.id}
              itemHandleClick={itemHandleClick}
              focusOnMount={focusOnMount}
            />
          );
        })}
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
  &:active {
    transform: scale(1.4);
    box-shadow:0px 0px 15px 10px rgba(40,131,255,0.16);
  };
  &:focus {
    outline: none;
    border: none;
};
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
