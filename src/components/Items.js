import React from "react";
import styled from "styled-components";


const Item=({items, purchasedItems, handleClick})=>{
    return (
        <>
            {items.map(el=>{
                return (
                    <Wrapper>
                        <Items 
                        onClick={handleClick}
                        id={el.id}
                        >
                            <Name id={el.id}>{el.name}</Name>
                            <Description id={el.id}>
                                Cost: {el.cost} cookie(s). Produces {el.value} cookies/second
                            </Description>
                        </Items>
                        <Purchased>
                            {purchasedItems[el.id]}
                        </Purchased>
                        
                    </Wrapper>
                )
            })}
        </>
    )
}
const Wrapper = styled.div`
    display: flex;
    flex-direction:row;
    border-bottom:2px solid gray;
`;
const Name=styled.p`
    font-size:1.5em;
    color: white;
`;

const Description=styled.p`
    font-size:0.8em;
    color:gray;
`;
const Items=styled.button`
    width:300px;
    padding:10px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align:left;
`;

const Purchased=styled.div`
    font-size:1.5em;
    padding:10px;
`;

export default Item;
