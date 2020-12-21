import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Items"
import cookieSrc from "../cookie.svg";
import useInterval from '../hooks/use-interval.hook'

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies]=useState(100);
  const [purchasedItems, setPurchasedItems]= useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });
  const [cookiesPerSec, setCookiesPerSec]=useState(0);

  const calculateCookiesPerTick=()=>{
    let totalCookies=0;
    items.forEach((item)=>{
      totalCookies=totalCookies+item.value*purchasedItems[item.id]
    })
    return totalCookies;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
  
    // Add this number of cookies to the total
    setNumCookies(numCookies+numOfGeneratedCookies);
    setCookiesPerSec(numOfGeneratedCookies);
  }, 1000);

  const handleClick=(ev)=>{
    let id=ev.target.id;
    const updateItems={
      ...purchasedItems,
      [id]:purchasedItems[id]+1
    }
    setPurchasedItems(updateItems);
    console.log(purchasedItems);
  }

  const handleKeydown=(ev)=>{
    if (ev.code === "Space") {
      setNumCookies(numCookies+1);
      console.log(numCookies);
    }
  }

  useEffect(()=>{
    document.title=`${numCookies} - Cookie Clicker Workshop`;
    return () => {
      document.title = `Cookie Clicker Workshop`
    }
  },[numCookies]);

  useEffect(()=>{
    window.addEventListener('keydown', handleKeydown);
    return ()=>{
      window.removeEventListener('keydown', handleKeydown);
    }
  },[handleKeydown]);
  

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{cookiesPerSec}</strong> cookies per second
          <p>Get those cookies, get those cookies</p>
        </Indicator>
        <Button
          onClick={()=>setNumCookies(numCookies+1)}
        >
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        <Item 
        items={items} 
        purchasedItems={purchasedItems} 
        handleClick={handleClick}/>
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
  &:click{
    transition: transform 0.25s ease;
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
