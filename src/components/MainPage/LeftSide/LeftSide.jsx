import React, { useContext, useState } from 'react';
import './LeftSide.css';
//CONTEXT
import { FinanceContext } from '../../../context/FinanceContext';
//IMAGES
import plus from '../../../images/plus.png';
import minus from '../../../images/minus.png';
//Currency.Json
import currencyData from '../../../Currency.json';

function LeftSide() {

  const {
    handlePopup,
    popup,
    dataType,
    handleAmount,
    handleExplanation,
    handleCurrencyType,
    handleDatas,
    amount,
    explanation,
    financeArray,
    currencyType } = useContext(FinanceContext)

  const handleConvertIncome = (currencyType) => {
    const currencyDataInEuro = {};
    Object.keys(currencyData).forEach((currency) => {
      currencyDataInEuro[currency] = 1 / currencyData[currency];
    });

    let totalAmountOfArrayInEuro = 0;
    financeArray.filter((item) => item.type === 'Income').forEach((item) => {
      const itemValueInEuro = item.amount / currencyData[item.currencyType];
      totalAmountOfArrayInEuro += item.type === 'Income' ? itemValueInEuro : -itemValueInEuro;
    });

    const totalValueInGivenCurrency = totalAmountOfArrayInEuro * currencyData[currencyType];
    return totalValueInGivenCurrency.toFixed(3);

  }


  const handleConvertExpense = (currencyType) => {
    const currencyDataInEuro = {};
    Object.keys(currencyData).forEach((currency) => {
      currencyDataInEuro[currency] = 1 / currencyData[currency];
    });

    let totalAmountOfArrayInEuro = 0;
    financeArray.filter((item) => item.type === 'Expense').forEach((item) => {
      const itemValueInEuro = item.amount / currencyData[item.currencyType];
      totalAmountOfArrayInEuro += item.type === 'Income' ? itemValueInEuro : -itemValueInEuro;
    });

    const totalValueInGivenCurrency = totalAmountOfArrayInEuro * currencyData[currencyType];
    return totalValueInGivenCurrency.toFixed(3);

  }

  return (
    <div className='LeftSide'>

      <div className="BTNcontainer">
        <button className='DataBTNS' style={{ backgroundColor: 'lightgreen' }} value='Income' onClick={handlePopup}>
          <img src={plus} style={{ width: '15px' }} alt="" />
          Income</button>
        <button className='DataBTNS' style={{ backgroundColor: 'pink' }} value='Expense' onClick={handlePopup}>
          <img src={minus} style={{ width: '15px' }} alt="" />
          Expense</button>
      </div>


      <div className="totalBalanceContainer">
        <h3>Total Income: {handleConvertIncome(financeArray[financeArray.length - 1]?.currencyType)} {financeArray[financeArray.length - 1]?.currencyType} </h3>
        <h3>Total Expense: {handleConvertExpense(financeArray[financeArray.length - 1]?.currencyType)} {financeArray[financeArray.length - 1]?.currencyType}</h3>
      </div>

      {
        popup
          ? <div className="popupdiv">
            <div className="overlay" onClick={handlePopup}></div>
            <div className="popupcontent">
              <h1>{dataType}</h1>
              <label htmlFor="amount">Amount</label>
              <input type="number" id='amount' className='dataInputs' value={amount} placeholder='Amount..' onChange={handleAmount} />
              <label>Currency Type</label>
              <select className='dataInputs' value={currencyType} onChange={handleCurrencyType}>
                {Object.keys(currencyData).map((currency) => (
                  <option value={currency}>{currency}</option>
                ))}
              </select>
              <label htmlFor="amount">Explanation</label>
              <input type="text" id='explanation' className='dataInputs' value={explanation} placeholder='Your note..' onChange={handleExplanation} maxLength={50} />
              <button onClick={handleDatas} className='submitBTN'>Submit</button>
            </div>
          </div>
          : null
      }
    </div>
  )
}

export default LeftSide