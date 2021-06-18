import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Items"
import cookieSrc from "../cookie.svg";
import useInterval from '../hooks/use-interval.hook'
import useHandleKeyDown from "../hooks/useHandleKeyDown.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "chef", name: "Chef", cost: 30, value: 5 },
  { id: "dorothy", name: "Dorothy", cost: 70, value: 8 },
  { id: "blanche", name: "Blanche", cost: 100, value: 10 },
  { id: "rose", name: "Rose", cost: 345, value: 30 },
  { id: "sophia", name: "Sophia", cost: 680, value: 55 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
  { id: "megaCursor", name: "megaCursor", cost:0, value: 200}
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies]=useState(100);
  const [purchasedItems, setPurchasedItems]= useState({
    cursor: 0,
    chef:0,
    dorothy:0,
    blanche: 0,
    rose:0,
    sophia:0,
    farm: 0,
    megaCursor: 0,
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
  }, 3000);

  const addCookie=()=>{
    return setNumCookies(numCookies+1); 
  }

  useEffect(()=>{
    document.title=`${numCookies} - Cookie Clicker Workshop`;
    return () => {
      document.title = `Cookie Clicker Workshop`
    }
  },[numCookies]);

  useHandleKeyDown("Space", addCookie);
  

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{cookiesPerSec}</strong> cookie(s) per 3 seconds
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
        {items.map((el,index)=>{
          return(
            <>
              <Item 
              id={el.id}
              index={index}
              name={el.name}
              cost={el.cost}
              value={el.value}
              purchasedItems={purchasedItems[el.id]} 
              handleClick={(ev)=>{
                let itemID=ev.target.id;
                console.log(itemID)
                if(numCookies<el.cost){
                  window.alert("You ain't got enough cookies! You gots to wait, Felicia!")
                }
                else if(itemID==="megaCursor"){
                  setNumCookies(numCookies+el.value);
                }
                else{
                  setNumCookies(numCookies-el.cost);
                  const updateItems={
                    ...purchasedItems,
                    [el.id]:purchasedItems[el.id]+1
                  }
                  setPurchasedItems(updateItems);
                }
                
              }}/>
            </>
          )})}
        
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
  &:active{
    transform:scale(0.95);
  }
  outline:none;
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
