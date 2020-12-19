import React from 'react'
import  styled  from 'styled-components'

const Item = ({items, numOwned, handleClick}) => {
  return (
    <ItemTypeWrapper>
      {items.map(item => {
        return (
      <ItemContainer>    
        <div>
          <h1>{item.id}</h1>
          <p>{`Cost: ${item.cost} cookie(s). Produces ${item.value} cookies/second`}</p>
        </div>
        <NumberWrapper>
          {numOwned[item.id]}
        </NumberWrapper>
      </ItemContainer> 
      )
      })}
    </ItemTypeWrapper>
    
  )
}

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemTypeWrapper = styled.div`
  margin-top: 1rem;

`;

const NumberWrapper = styled.div`
  margin: 1rem 2rem;
  font-size: 3rem;
  font-weight: bold;
`;

export default Item
