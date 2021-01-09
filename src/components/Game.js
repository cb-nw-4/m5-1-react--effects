import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useKeyDown from "../hooks/use-keyDown.hook";
import useDocumentTitle from "../hooks/use-documentTitle.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
  { id: "megaCursor", name: "Mega Cursor", cost: 5000, value: 50 }
];

const Game = () => {
  // Changed to state:
  const [numCookies, setNumCookies] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megaCursor: 0
  });
  
  // Handle cookie clicked
  const handleCookieClick = () => {
    if(purchasedItems.megaCursor > 0) {
      setNumCookies(numCookies + (purchasedItems.megaCursor * 50));
    } else {
      setNumCookies(numCookies + 1);
    }
  };

  // Handle store item clicked
  const handleClick = (item) => {
    if(numCookies >= item.cost) {
      setNumCookies(numCookies - item.cost)
      setPurchasedItems({
        ...purchasedItems,
        [item.id]: purchasedItems[item.id] + 1
      })
      // Increase cost randomly after purchase
      item.cost = item.cost + (Math.floor(Math.random() * 15) + 1);
    } else {
      window.alert("You don't have enough cookies to purchase this item :(")
    }
  };

  // Get cookies/second
  const calculateCookiesPerTick = () => {
    let cursorNum = purchasedItems.cursor;
    //console.log(cursorNum);
    let grandmaNum = (purchasedItems.grandma) * 10;
    //console.log(grandmaNum)
    let farmNum = (purchasedItems.farm) * 80;
    //console.log(farmNum);
    return cursorNum + grandmaNum + farmNum;
  }
  const CookiesPerSec = calculateCookiesPerTick();

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick();
    //console.log(numOfGeneratedCookies)
    setNumCookies(numCookies + numOfGeneratedCookies)
  }, 1000);

  // handleCookieClick should only run if the spacebar event is for cookie button
  const cookieRef = useRef();

  // Custom hook for keydown
  let keyCode = "Space";
  useKeyDown(keyCode, handleCookieClick, cookieRef);

  // Custom hook for title
  let title = `${numCookies} cookies - Cookie Clicker Workshop`;
  let fallBackTitle = `Cookie Clicker Workshop`;
  useDocumentTitle(title, fallBackTitle, numCookies);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{CookiesPerSec}</strong> cookies per second
        </Indicator>
        <Button ref={cookieRef} onClick={() => handleCookieClick()}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>
      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => <Item items={items} key={item.id} item={item} purchasedItems={purchasedItems} handleClick={handleClick} />)}
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
  
  &:focus {
        outline: 2px solid;
        outline-color: #5E9ED6; 
    }
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
