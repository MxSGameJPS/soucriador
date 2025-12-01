import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div>
          <span style={{ "--d": "100ms" }}>S</span>
          <span style={{ "--d": "250ms" }}>o</span>
          <span style={{ "--d": "400ms" }}>u</span>
        </div>
        <span style={{ "--d": "550ms" }}>c</span>
        <span style={{ "--d": "700ms" }}>r</span>
        <span style={{ "--d": "850ms" }}>i</span>
        <span style={{ "--d": "1000ms" }}>a</span>
        <span style={{ "--d": "1150ms" }}>d</span>
        <span style={{ "--d": "1300ms" }}>o</span>
        <span style={{ "--d": "1450ms" }}>r</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    font-size: 30px;
    display: flex;
    gap: 10px;
  }
  .loader span {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    justify-content: center;
    font-family: sans-serif;
    font-weight: bold;
    color: #aa41fe;
    background-color: #dbd5f3;
    border-radius: 8px;
    min-width: 40px;
    animation: peek 1s both infinite;
    animation-delay: var(--d);
  }

  @keyframes peek {
    25% {
      transform: rotateX(30deg) rotate(-13deg);
    }
    50% {
      transform: translateY(-22px) rotate(3deg) scale(1.1);
      color: #6a45ed;
    }
  }
`;

export default Loader;
