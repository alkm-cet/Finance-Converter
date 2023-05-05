import React, { useContext } from 'react';
import './Header.css';
//CONTEXT
import { FinanceContext } from '../../../context/FinanceContext';
//IMAGE
import dollar from '../../../images/dollar.png';
//CURRENCY DATA
import currencyData from '../../../Currency.json';

function Header() {
    const { financeArray, currencyType } = useContext(FinanceContext)

    const handleConvertTotal = (currencyType) => {

        let totalAmountOfArray = financeArray.reduce((acc, curr) => {
            return acc + (curr.amount * (curr.type === 'Income' ? 1 : -1))
        }, 0);

        let valueOfCurrency = currencyData[currencyType];

        const convertedAmount = totalAmountOfArray * valueOfCurrency;

        return (convertedAmount).toLocaleString();

    }

    // const handleConvertTotal = (currencyType) => {
    //     let totalAmountOfArray = 0;

    //     if (financeArray.length > 0) {
    //         const lastCurrencyType = financeArray[financeArray.length - 1].currencyType;
    //         const lastCurrencyValue = currencyData[lastCurrencyType] / currencyData[currencyType];
    //         totalAmountOfArray = financeArray.reduce((acc, curr) => {
    //             return acc + (curr.type === 'Income' ? curr.amount : -1 * curr.amount);
    //         }, 0) * lastCurrencyValue;
    //     }

    //     return totalAmountOfArray.toLocaleString();
    // };


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