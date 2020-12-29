import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from './Item';
import useInterval from '../../src/hooks/use-interval.hook';
// import useInterval from 'src/hooks/use-interval.hook';
// import { Helmet } from 'react-helmet';

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];
const initialValues = { 
  cursor: 0,
  grandma: 0,
  farm: 0,
};

const Game = () => {
  //numCookies STATE
  const [cookiesPerSecState, setCookiesPerSecState] = useState(0);
  const [numCookies, setNumCookies] = useState(10000);
  const [purchasedItems, setPurchasedItems] = useState(initialValues);
  const [isFirstItem, setIsFirstItem] = useState(null);

  const handlePosition = (item) => {
    if(items.indexOf(item) === 0){
      setIsFirstItem(true);
    } else {
      setIsFirstItem(false);
    }
  };

  const incrementCount = () => {
    setNumCookies(numCookies + 1);
  };
  //purchasedItems COUNT

  const handleClick = (item) => {
    let itemId = item.id

    if(numCookies >= item.cost){
      setNumCookies(numCookies - item.cost);
      setPurchasedItems({...purchasedItems, [itemId]:purchasedItems[itemId] + 1});
    } else {
      window.alert('Not enough cookies');
    }

    // if(items.indexOf(item) === 0) {
    //   // setIsFirstItem(true);
    //   isFirstItem = true;
    // } else {
    //   // setIsFirstItem(false);
    //   isFirstItem = false;
    // }
    // console.log(isFirstItem);
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

  //Exercise 4: Updateting the Tab Title
  useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker`;
  }, [numCookies]);

  //Exercise 5: Using the "space" Key
  const keyPressHandler = (ev) => {
    if (ev.code === "Space") {
      incrementCount();
      console.log('Key Pressed');
    }
  }
  useEffect(() => {
    console.log('Key press effect')
    // const keyPressHandler = (ev) => {
    //   if (ev.code === "Space") {
    //     incrementCount();
    //     console.log('Key Pressed');
    //   }
    // }
    window.addEventListener('keydown', keyPressHandler);

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    }
  }, [keyPressHandler]);

  // const handleGetCookie = 
  //   useCallback(() => {
  //     setNumCookies(numCookies + 1);
  //   },[numCookies]);

  // const onKeyDown =
  //   useCallback((ev) => {
  //     if (ev.code === "Space") {
  //       handleClick()
  //     }
  //     window.addEventListener('keypress', onKeyDown);
  //   }, [handleGetCookie]);

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
          // let isFirst = false;
          // if(items.indexOf(item) === 0){
          //   isFirst = true;
          // }

          return <Item 
          name={item.name}
          cost={item.cost}
          value={item.value} 
          numOwned={purchasedItems[item.id]} 
          handleClick={() => {handleClick(item)}}
          // isFirst={isFirst}
          itemIndex={items.indexOf(item)}
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
