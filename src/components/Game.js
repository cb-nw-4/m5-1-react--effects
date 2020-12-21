import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from './Item';
import useInterval from '../../src/hooks/use-interval.hook';
// import useInterval from 'src/hooks/use-interval.hook';

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  //numCookies STATE
  const [cookiesPerSecState, setCookiesPerSecState] = useState(0);
  const [numCookies, setNumCookies] = useState(10000);
  const incrementCount = () => {
    setNumCookies(numCookies + 1);
  };
  //purchasedItems COUNT
  const initialValues = { 
    cursor: 0,
    grandma: 0,
    farm: 0,
  };
  const [purchasedItems, setPurchasedItems] = useState(initialValues);

  const handleClick = (item) => {
    let itemId = item.id
    // console.log(itemId);
    // console.log(purchasedItems[itemId],'ITEMS');
    // console.log(purchasedItems.itemId)
    if(numCookies >= item.cost){
      setNumCookies(numCookies - item.cost);
      setPurchasedItems({...purchasedItems, [itemId]:purchasedItems[itemId] + 1});
    } else {
      window.alert('Not enough cookies');
    }
  };

  //Passive Cookie Generation
  const calculateCookiesPerTick = (purchasedItems) => {
    // let entries = Object.entries(purchasedItems);
    // console.log(entries);
    let totalCookiesPerSec = 0;
    items.forEach((item) => {
      let itemId = item.id
      let cookiesPerSec = purchasedItems[itemId] * item.value;
      // console.log(cookiesPerSec, 'PER SEC')

      totalCookiesPerSec  += cookiesPerSec;
    })
    // console.log(totalCookiesPerSec, 'TOTAL')
    // setCookiesPerSecState(totalCookiesPerSec);
    return totalCookiesPerSec;
  }
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    // console.log(numOfGeneratedCookies);

    setCookiesPerSecState(numOfGeneratedCookies);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  //TEST
  // console.log(calculateCookiesPerTick(purchasedItems));
  //

  return (
    <Wrapper>
      <GameArea>
        <Indicator numCookies={numCookies}>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{cookiesPerSecState}</strong> cookies per second
        </Indicator>
        <Button>
          <Cookie src={cookieSrc} onClick={incrementCount}/>
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => {
          return <Item 
          name={item.name}
          cost={item.cost}
          value={item.value} 
          numOwned={purchasedItems[item.id]} 
          handleClick={() => {handleClick(item)}}
          />
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
