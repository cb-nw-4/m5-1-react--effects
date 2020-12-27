import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useInterval from "../hooks/use-interval.hook";
import { Link } from "react-router-dom";
import Item from "./Item";

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [cookieCount, setCookieCount] = useState(100000);
  const [time, setTime] = useState(0);
  const [cookieCost, setCookieCost] = useState(0);
  const [cursorCount, setCursorCount] = useState(0);

  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const calculateCookiesPerTick = (cookiesPerTick) => {
    setTime(time + cookiesPerTick);
    console.log(cookiesPerTick);
  };
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
  
    // Add this number of cookies to the total
  }, 100000);

  const useCookieCount = () => {
    if (cookieCount > 0) {
      setCookieCount(cookieCount + 1);
    } else {
      return alert("You are out of cookies!");
    }
  };

  const handleClick = (key, value) => {
    setCursorCount(key);
    console.log(value);
  };
  console.log(cookieCost);
  console.log(time);
  console.log(purchasedItems);
  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{cookieCount} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{time}</strong> cookies per second
        </Indicator>
        <Button onClick={useCookieCount}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        <Item
          id="cursor"
          setPurchasedItems={setPurchasedItems}
          purchasedItems={purchasedItems}
          items={items}
          setCookieCount={setCookieCount}
          cookieCount={cookieCount}
          calculateCookiesPerTick={calculateCookiesPerTick}
          handleClick={handleClick}
          cookieCost={cookieCost}
          setCookieCost={setCookieCost}
        />
        <Item
          id="grandma"
          purchasedItems={purchasedItems}
          items={items}
          setCookieCount={setCookieCount}
          cookieCount={cookieCount}
          calculateCookiesPerTick={calculateCookiesPerTick}
          handleClick={handleClick}
          cookieCost={cookieCost}
          setCookieCost={setCookieCost}
        />
        <Item
          id="farm"
          purchasedItems={purchasedItems}
          items={items}
          setCookieCount={setCookieCount}
          cookieCount={cookieCount}
          calculateCookiesPerTick={calculateCookiesPerTick}
          handleClick={handleClick}
          cookieCost={cookieCost}
          setCookieCost={setCookieCost}
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
