import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";

import Item from './Item';
import useInterval from '../hooks/use-interval.hook';
import useKeydown from '../hooks/use-keydown.hook';
import useDocumentTitle from '../hooks/use-documentTitle.hook';

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
  { id: "megaCursor", name: "Mega Cursor", cost: 1500, value: 100}
];

const calculateCookiesPerTick = (itemsObj) => {
  const amount = (itemsObj.cursor * 1) + (itemsObj.grandma * 10) + (itemsObj.farm * 80);
  return amount;
}

const Game = () => {
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megaCursor: 0
  });
  const [indexPosition, setIndexPosition] = useState(0);
  const cookiesPerSecond = calculateCookiesPerTick(purchasedItems);

  const handleIncrement = () => {
    setNumCookies(numCookies + 1);
  }

  const handleMegaCursorIncrement = () => {
    setNumCookies(numCookies + (100 * purchasedItems.megaCursor));
  }

  const handleClick = (type) => {
    if (numCookies >= type.cost) {
      setNumCookies(numCookies - type.cost);
      setPurchasedItems({
        ...purchasedItems,
        [type.id]: purchasedItems[type.id] + 1
      })
    }
    else {
      window.alert("You don't have enough cookies to purchase this item!");
    }
  }

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000)

  const IndexPositionUp = () => {
    if (indexPosition !== 0) {
        setIndexPosition(indexPosition - 1);
    }
  }

  const IndexPositionDown = () => {
    if (indexPosition !== 3) {
        setIndexPosition(indexPosition + 1);
    }
  }

  const purchaseItemsWithKeydown = () => {
    if (numCookies >= items[indexPosition].cost) {
      setNumCookies(numCookies - items[indexPosition].cost);
        setPurchasedItems({
          ...purchasedItems,
          [items[indexPosition].id]: purchasedItems[items[indexPosition].id] + 1
        })
    }
    else {
      window.alert("You don't have enough cookies to purchase this item!");
    }
  }

  useKeydown('Space', (purchasedItems.megaCursor === 0 ? handleIncrement : handleMegaCursorIncrement));
  useKeydown('ArrowDown', IndexPositionDown);
  useKeydown('ArrowUp', IndexPositionUp);
  useKeydown('Enter', purchaseItemsWithKeydown);
  useDocumentTitle(`${numCookies} cookies - Cookie Clicker Workshop`, 'Cookie Clicker Workshop');

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{cookiesPerSecond}</strong> cookies per second
        </Indicator>
        <Button onClick={() => {
          if (purchasedItems.megaCursor === 0) {
            handleIncrement();
          }
          else {
            handleMegaCursorIncrement();
          }
        }}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        <>{items.map((item, index) => {
          return (
            <Item 
              type={item}
              numOwned={purchasedItems}
              handleClick={handleClick}
              key={item.id}
              index={index}
              indexPosition={indexPosition}
            />
          );
        })}
        </>
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  )
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
