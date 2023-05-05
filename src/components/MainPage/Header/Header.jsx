import React, { useContext } from 'react';
import './Header.css';
//CONTEXT
import { FinanceContext } from '../../../context/FinanceContext';
//IMAGE
import dollar from '../../../images/dollar.png';
//CURRENCY DATA
import currencyData from '../../../Currency.json';

function Header() {
    const { financeArray } = useContext(FinanceContext)

    const handleConvertTotal = (currencyType) => {
        const currencyDataInEuro = {};
        Object.keys(currencyData).forEach((currency) => {
            currencyDataInEuro[currency] = 1 / currencyData[currency];
        });

        let totalAmountOfArrayInEuro = 0;
        financeArray.forEach((item) => {
            const itemValueInEuro = item.amount / currencyData[item.currencyType];
            totalAmountOfArrayInEuro += item.type === 'Income' ? itemValueInEuro : -itemValueInEuro;
        });

        const totalValueInGivenCurrency = totalAmountOfArrayInEuro * currencyData[currencyType];
        return totalValueInGivenCurrency.toFixed(3);
    };

    return (
        <div className='Header'>
            <h1>Finance Tracker</h1>
            <div className="balanceContainer">
                <img src={dollar} style={{ width: '50px' }} alt="" />
                <h2> {handleConvertTotal(financeArray[financeArray.length - 1]?.currencyType)} {(financeArray[financeArray.length - 1]?.currencyType)} </h2>
            </div>

        </div>
    )
}

export default Header