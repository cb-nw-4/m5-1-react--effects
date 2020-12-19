import React from "react";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";


const Item=({items, purchasedItems})=>{
    console.log(items);
    return (
        <>
            {items.map(el=>{
                return (
                    <Wrapper>
                        <Items>
                            <Name>{el.name}</Name>
                            <Description>Cost: {el.cost} cookie(s). Produces {el.value} cookies/second</Description>
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
`;

const Description=styled.p`
    font-size:0.8em;
    color:gray;
`;
const Items=styled.div`
    width:300px;
    padding:10px;
`;

const Purchased=styled.div`
    font-size:1.5em;
    padding:10px;
`;

export default Item;
