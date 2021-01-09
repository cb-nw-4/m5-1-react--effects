import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Item = ({
  name,
  cost,
  value,
  numOwned,
  onClick,
  index,
  clicksX,
  increase,
}) => {
  const inputRef = useRef(null);
  //console.log("inputRef", inputRef);

  useEffect(() => {
    if (index === 0) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Wrapper>
      <Wrapper1 ref={inputRef} onClick={onClick}>
        <Wrapper2>
          <Name>{name}</Name>
          <h6>
            Cost: {cost} cookie(s). Produces {value} cookies/second. {clicksX}
          </h6>
          <h6>Increase to {increase} times cookie clicks!</h6>
        </Wrapper2>
        <Wrapper3>
          <h1>{numOwned}</h1>
        </Wrapper3>
      </Wrapper1>
    </Wrapper>
  );
};
const Name = styled.h2`
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Wrapper = styled.div``;
const Wrapper1 = styled.button`
  font-size: 17px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  border-bottom: 1px solid #b5b5b0;
  padding-bottom: 15px;
  padding-top: 15px;
  width: 350px;
  justify-content: space-between;
  color: white;
`;
const Wrapper2 = styled.div`
  text-align: left;
`;
const Wrapper3 = styled.div``;
export default Item;
