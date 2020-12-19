import React from 'react';
import styled from 'styled-components';

const ContainerBtn = styled.button`
    display: flex;
    padding: 20px 0;
    border: none;
    border-bottom: 1px solid gray;
    background: none;
    color: inherit;
    font-family: inherit;
    outline: inherit;

    &:focus {
        box-shadow: 0 0 0 3pt rgb(40, 119, 247);
        border-radius: 3px;
    }
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 80px;
    text-align: left;
`;

const ItemName = styled.h4`
    font-size: 25px;
`;

const ItemInfo = styled.p`
    color: gray;
    font-size: 18px;
`;

const ItemCount = styled.span`
    font-size: 50px;
    position: absolute;
    right: 35px;
`;

const Item = ({ type, numOwned, handleClick }) => {
    return (
        <ContainerBtn onClick={() => handleClick(type)}>
            <SubContainer>
                <ItemName>{type.name}</ItemName>
                <ItemInfo>{`Cost: ${type.cost} cookie(s). Produce ${type.value} cookie(s)/second.`}</ItemInfo>
            </SubContainer>
            <ItemCount>{numOwned[type.id]}</ItemCount>
        </ContainerBtn>
    );
}

export default Item;