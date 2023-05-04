import React, { useContext } from 'react';
import './Header.css';
//CONTEXT
import { FinanceContext } from '../../../context/FinanceContext';
//IMAGE
import dollar from '../../../images/dollar.png'

function Header() {
    const { financeArray } = useContext(FinanceContext)

    return (
        <div className='Header'>
            <h1>Finance Tracker</h1>
            <div className="balanceContainer">
                <img src={dollar} style={{ width: '50px' }} alt="" />
                <h2>
                    {
                        financeArray.reduce((acc, curr) => {
                            return acc + (curr.amount * (curr.type === 'Income' ? 1 : -1))
                        }, 0)
                    }
                </h2>
            </div>

        </div>
    )
}

export default Header