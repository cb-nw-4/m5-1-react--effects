import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from './Item';
import useInterval from '../hooks/use-interval.hook';
import useDocumentTitle from '../hooks/useDocumentTitle.hook';
import useKeydown from '../hooks/useKeydown.hook';


import cookieSrc from "../cookie.svg";

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(1000);
  useDocumentTitle(`${numCookies} cookies - Cookie Clicker`);

  const incrementCount = () => {
    setNumCookies(numCookies + 1 + purchasedItems.megaCursor);
  };

  const itemsIni = [
    { id: "cursor", name: "Cursor", cost: 10, value: 2, click: 0 },
    { id: "grandma", name: "Grandma", cost: 100, value: 10, click: 0 },
    { id: "farm", name: "Farm", cost: 1000, value: 80, click: 0 },
    { id: "megaCursor", name: "Mega Cursor", cost: 100, value: 0, click: 2},
  ];

  const [items] = useState(itemsIni);

  const initialValues = {
    cursor: 0,
    grandma: 0,
    farm: 0,
    megaCursor: 0,
  };

  const [purchasedItems, setPurchasedItems] = useState(initialValues);

  const handleClick = (item) => {
    let itemId = item.currentTarget.getAttribute("id");
    let itemClicked = items.find(x => x.id === itemId);
    let indexItem = items.indexOf(itemClicked);
    if(numCookies >= itemClicked.cost){
      setNumCookies(numCookies - itemClicked.cost);
      setPurchasedItems({...purchasedItems, [itemId]:purchasedItems[itemId] + 1});
      items[indexItem].cost = Math.round(itemClicked.cost * 1.2);
    } else {
      window.alert('Not enough cookies');
    }
  }

  const calculateCookiesPerTick = (purchasedItems) => {
    let totalValue = 0;
    totalValue = purchasedItems.cursor + purchasedItems.grandma*10 + purchasedItems.farm*100;
    return totalValue;
  }

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);
  
  useKeydown('Space', () => {
    setNumCookies(numCookies + 1);
  })

  return (
    <Wrapper>
      <GameArea>
        <Indicator numCookies={numCookies}>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second
        </Indicator>
        <Button>
          <Cookie src={cookieSrc} onClick={incrementCount}/>
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => {
          return <Item key={item.id} id={item.id} name={item.name} cost={item.cost} value={item.value} click={item.click} firstItem={item.id === "cursor" ? true : false} numOwned={purchasedItems[item.id]} handleClick={handleClick}/>
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
