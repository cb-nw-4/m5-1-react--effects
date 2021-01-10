import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { items } from "./Game";

const Item = ({ item, purchasedItem, handleClick }) => {

    const focusedItem = useRef(null);

    useEffect(() => {
        if(item.id === "cursor") {
            focusedItem.current.focus();
        }
    }, []);

    return (
        <div>
            <Button ref={focusedItem} onClick={()=>{
                const itemClicked = item.id
                const count = purchasedItem;
                handleClick(itemClicked, count + 1);
            }}>
                    <ItemWrapper>
                    <Name>{item.name}</Name>
                    <Desc>Cost: {item.cost} cookie(s). Produces {item.value} cookies/second.</Desc>
                    </ItemWrapper>
            <CountWrapper>
                <Count>{purchasedItem}</Count>
            </CountWrapper>
            </Button>
        </div>
            )
}

const Button = styled.button`
display: flex;
flex-direction: row;
width: 100%;
background: none;
color: white;
border: none;
border-bottom: solid 1px grey;
`;

const ItemWrapper = styled.div`
flex-direction: column;
padding: 10px 0px;
`;

const Name = styled.h3`
text-align: left;   
font-size: 1rem;
`;

const Desc = styled.p`
font-size: 0.75rem;
`;

const CountWrapper = styled.div`
flex-direction: column;
`;

const Count = styled.p`
font-weight: bold;
font-size: 1.75rem;
padding: 10px 15px;
`;

export default Item;
