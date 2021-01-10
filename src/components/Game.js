import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies]= useState(0);

  const initialPurchasedItems = {
    cursor: 0,
    grandma: 0,
    farm: 0,
  };
  const [purchasedItems, setPurchasedItems] = useState(initialPurchasedItems);

  const handleClick = (cost,id)=>{
    if(numCookies<cost){
      window.alert('Not enough cookies');
    }else{
      setNumCookies(numCookies-cost);
      setPurchasedItems({...purchasedItems, [id] : purchasedItems[id]+1} )
    }
  };

  const calculateCookiesPerTick = (purchasedItems)=>{
    let num= purchasedItems['cursor']*1 + purchasedItems['grandma']*10 + purchasedItems['farm']*80;
    return num;

  };

  useEffect(()=>{
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;
    return () => {
      document.title = `Cookie Clicker Workshop`
    }
  },[numCookies]);

  useEffect(()=>{

    function handleKeydown(ev) {
      if (ev.code === "Space") {
        // Trigger here 
        setNumCookies(numCookies+1)
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return (()=>{window.removeEventListener("keydown", handleKeydown)});

  });

  let itemNum = 0;

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */
            useInterval(() => {
              const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
              // Add this number of cookies to the total
              setNumCookies(numCookies+numOfGeneratedCookies);
            }, 1000)
          }
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second
        </Indicator>
        <Button>
          <Cookie src={cookieSrc} onClick={()=>setNumCookies(numCookies+1)}/>
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */
        items.map((item)=>{
          return <Item 
          key = {item.id}
          name={item.name} 
          cost={item.cost} 
          value={item.value}
          numOwned = {purchasedItems[item.id]}
          handleClick = {()=>handleClick(item.cost, item.id)}
          itemNum = {itemNum++}
          />
        })
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
