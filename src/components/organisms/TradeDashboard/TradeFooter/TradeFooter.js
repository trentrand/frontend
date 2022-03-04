import React from "react";
import styled from "@xstyled/styled-components";

const StyledTradeFooter = styled.footer`
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  grid-area: footer;
  background: #171c28;
  font-size: 12px;
`;

const StyledStatus = styled.a`
  font-size: 12px;
  color: #94a2c9;
  text-decoration: none;
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

export default function TradeFooter() {
  return (
    <StyledTradeFooter>
      <StyledStatus href="https://status.zigzag.exchange/ " target="_blank">
        Status
      </StyledStatus>
      <div>Powered By zkSync</div>
    </StyledTradeFooter>
  );
}