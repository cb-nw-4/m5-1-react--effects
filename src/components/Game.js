import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
const [cookieCount, setCookieCount] = useState(1000);
const [time, setTime] = useState(0);
const [cursorCount, setCursorCount] = useState(0);
  const purchasedItems = {
    cursor: 0,
    grandma: 0,
    farm: 0,
  };

  const handleClick = () => {
    setCookieCount(cookieCount + 1)

  }
  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{cookieCount} cookies</Total>
       
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{time}</strong> cookies per second
        </Indicator>
        <Button onClick = { handleClick } >
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        <Item 
        purchasedItems = {purchasedItems}
        items = {items}
        setCookieCount= {setCookieCount}
        cookieCount = {cookieCount}
        handleClick = {handleClick}
        />
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
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
