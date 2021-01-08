import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item.js";
import useInterval from "../hooks/use-interval.hook.js";
import useDocumentTitle from "./useDocumentTitle.js";

import cookieSrc from "../cookie.svg";
import useKeydown from "./useKeydown.js";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setNumCookies] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  useDocumentTitle(`${numCookies} cookies`, "Cookie Clicker Workshop");

  useKeydown('Space', () => {
    setNumCookies(numCookies + 1);
  })

  const calculateCookiesPerTick = (purchasedItems) => {
    let valueObject = {};
    items.map((item) => {
      valueObject[item.id] = item.value * purchasedItems[item.id];
    })
    let valueKeys = Object.values(valueObject);
    let totalValue = valueKeys[0] + valueKeys[1] + valueKeys[2];
    return totalValue;
  }

useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => (
            <Item
            value={item.id}
            key={item.id}
            name={item.name}
            cost={item.cost}
            itemValue={item.value}
            numOwned={purchasedItems[item.name.toLowerCase()]}
            firstItem={item.id === "cursor" ? true : false}
            onClick={() => {
              let clickedItem = item.id;
              let clickedItemCost = item.cost;
              if (numCookies >= clickedItemCost) {
                setNumCookies(numCookies - clickedItemCost);
                let newItemsArray = {...purchasedItems, [item.id]:purchasedItems[clickedItem] + 1}
                setPurchasedItems(newItemsArray);
              } else {
                window.alert("You can't afford that. Keep clicking!");
                return;
              }
            }}
            />
        ))
        }
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
