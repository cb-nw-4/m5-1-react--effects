import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import useInterval from "../hooks/use-interval.hook";
import { Link } from "react-router-dom";
import Item from "./Item";
import useKeyDown from "./useKeyDown";
import useDocumentTitle from "./useDocumentTitle";
import cookieSrc from "../cookie.svg";
import cursorSource from "../cursor.png";
import Cursor from "./Cursor";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
  // { id: "megaCursor", name: "Mega Cursor", cost: 500, value: 5}
];

const Game = () => {
  const urlCursor =  `url("https://findicons.com/files/icons/2776/android_icons/96/ic_cursor_off.png"),auto`
  const [cookieCount, setCookieCount] = useState(1000);
  const [megaClick, setMegaClick] = useState(false);
  const [toggle, setToggle] = useState(false);
  // const [updatedCursor, useUpdatedCursor] = useState();
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const handleClick = (item) => {
    console.log(item);
    if (cookieCount < item.cost) {
      window.alert("You are out of cookies!");
    } else {
      setPurchasedItems({
        ...purchasedItems,
        [item.id]: purchasedItems[item.id] + 1,
      });
      setCookieCount(cookieCount - item.cost);
    }
  };

  const calculateCookiesPerTick = () => {
    const cursor = purchasedItems.cursor * items[0].value;
    const grandma = purchasedItems.grandma * items[1].value;
    const farm = purchasedItems.farm * items[2].value;
    const totalValue = cursor + grandma + farm;
    return totalValue;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick();
    setCookieCount(cookieCount + numOfGeneratedCookies);
  }, 1000);

  const useMegaClick = () => {
    setMegaClick(true);
   
    if (cookieCount >= 500) {
      setCookieCount(cookieCount - 500);
    } else {
      window.alert("Not Enough Cookies To Purchase!");
    }
   
 
      document.getElementById("Wrapper").style.cursor = `${urlCursor}`; 
      document.getElementById("CookieButton").style.cursor = `${urlCursor}`;
    
    
  };

  const handleCookieClick = () => {
    if (megaClick == true) {
      setCookieCount(cookieCount + 5);
    } else {
      setCookieCount(cookieCount + 1);
    }
  };


  useDocumentTitle(cookieCount, `Cookie Clicker Workshop`);

  useKeyDown("Space", handleCookieClick);
  
  return (
    <Wrapper id="Wrapper" >
      <div>
        <Cursor
          megaClick={megaClick}
          useMegaClick={useMegaClick}
        />
        
      </div>
      <GameArea>
        <Indicator>
          <Total>{cookieCount} cookies</Total>
          <strong>{calculateCookiesPerTick()}</strong> cookies per second
        </Indicator>
        <Button id="CookieButton" onClick={handleCookieClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>

        <Item
          items={items}
          numOwned={purchasedItems}
          handleClick={handleClick}
        />
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
