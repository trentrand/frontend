import React, { useCallback } from "react";
import styled from "@xstyled/styled-components";
import BridgeCurrencySelector from "../BridgeCurrencySelector/BridgeCurrencySelector";

const BridgeInputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  border: none;
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;

  input,
  input:focus {
    font-family: "Iceland", sans-serif;
    width: calc(100% - 148px);
    height: 70px;
    background: transparent;
    padding: 20px 20px 20px 7px;
    font-size: 28px;
    border: none;
    outline: none;
    text-align: right;
    -webkit-appearance: none;
    appearance: none;
  }

  .maxLink {
    position: absolute;
    color: #69f;
    top: -58px;
    right: 0;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    user-select: none;

    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  }

  .currencySelector {
    width: 148px;
    margin-left: 15px;
  }
`;

const BridgeSwapInput = ({ value = {}, onChange, bridgeFee, balances = {}, feeCurrency }) => {
  const setCurrency = useCallback(currency => onChange({ currency, amount: '' }), [onChange])
  const setAmount = useCallback(e => onChange({ amount: e.target.value.replace(/[^0-9.]/g,'') }), [onChange])

  const setMax = () => {
    let max;
    console.log(balances[value.currency]);
    try {
        const integerValue = balances[value.currency].valueReadable.split('.')[0];
        let integerDigits = 0;
        if (integerValue !== '0') {
            integerDigits = integerValue.length;
        }
        const decimalDigits = balances[value.currency].value.length - integerDigits;
        console.log(integerDigits, decimalDigits);
        max = balances[value.currency].value / (10 ** decimalDigits);
        max = Math.floor(max * 10**8) / 10**8; // 8 decimal places max
    } catch (e) {
        max = parseFloat((balances[value.currency] && balances[value.currency].valueReadable) || 0)
    }
    if (feeCurrency === value.currency) {
      max -= parseFloat(bridgeFee)
    }

    onChange({amount: max})
  }

  return (
    <BridgeInputBox>
      <div className="currencySelector">
        <BridgeCurrencySelector balances={balances} onChange={setCurrency} value={value.currency} />
      </div>
      <input onChange={setAmount} value={value.amount} placeholder="0.00" type="text" />
      <a className="maxLink" href="#max" onClick={setMax}>
        Max
      </a>
    </BridgeInputBox>
  );
};

export default BridgeSwapInput;
