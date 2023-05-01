import React, { useContext } from 'react';
import './Header.css';
//CONTEXT
import { FinanceContext } from '../../../context/FinanceContext';
//IMAGE
import dollar from '../../../images/dollar.png'

function Header() {
    const { balance } = useContext(FinanceContext)

    return (
        <div className='Header'>
            <h1>Finance Tracker</h1>
            <div className="balanceContainer">
                <img src={dollar} style={{ width: '50px' }} alt="" />
                <h1>{balance}</h1>
            </div>

        </div>
    )
}

export default Header