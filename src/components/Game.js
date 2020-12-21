import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import Item from './Item';

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const handleItemClick = (event) => {
    // const id = event.currentTarget.id;
    const item = items.find(item => item.id === event.currentTarget.id);

    switch (item.id) {
      case 'cursor':
        if (numCookies >= item.cost) {
          setNumCookies(numCookies - item.cost);
          setPurchasedItems({ ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 });
        } else {
          window.alert(`You can't afford a ${item.name}`);
        }

        break;
      case 'grandma':
        if (numCookies >= item.cost) {
          setNumCookies(numCookies - item.cost);
          setPurchasedItems({ ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 });
        } else {
          window.alert(`You can't afford a ${item.name}`);
        }
  
        break;
      case 'farm':
        if (numCookies >= item.cost) {
          setNumCookies(numCookies - item.cost);
          setPurchasedItems({ ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 });
        } else {
          window.alert(`You can't afford a ${item.name}`);
        }
  
        break;
    }
  }

  const handleCookieClick = () => {
    setNumCookies(numCookies + 1);
  }

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>0</strong> cookies per second
        </Indicator>
        <Button onClick={handleCookieClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map(item => <Item
          key={uuidv4()}
          id={item.id}
          name={item.name}
          cost={item.cost}
          value={item.value}
          numOwned={purchasedItems[item.id]}
          handleItemClick={handleItemClick} />)}
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
