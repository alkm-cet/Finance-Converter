import React, { useContext, useState } from 'react';
import './RightSide.css';
//CONTEXT
import { FinanceContext } from '../../../context/FinanceContext';
//IMAGE
import banknote from '../../../images/banknote.png'

function RightSide() {

  const {
    financeArray,
    handleDelete,
    handleAdjustment,
    editPopup,
    newAmount,
    newExplanation,
    handleNewAmount,
    handleNewExplanation,
    editId,
    handlEditPopup,
    defaultValue,
    defaulExplanation,
  } = useContext(FinanceContext);


  return (
    <div className='RightSide'>
      {
        financeArray.sort((a, b) => b.createdAt - a.createdAt).map((item, index) =>
          <div key={item.id} className="datacontainer" style={item.type == 'Expense' ? { backgroundColor: 'pink' } : { backgroundColor: 'lightgreen' }}>
            <img src={banknote} style={{ width: '70px' }} alt="" />
            <p>{item.type}</p>
            <h1>{item.type == 'Expense' ? '- ' : '+ '}{item.amount} {item.currencyType}</h1>
            <p>Note:</p>
            <h4 className='explanationContainer'>{item.explanation}</h4>
            <p>{new Date(item.createdAt).toLocaleString().slice(0, 10)}</p>
            <button className='ItemBTNS' onClick={() => handleDelete(index)}>DELETE</button>
            <button className='ItemBTNS' onClick={() => handlEditPopup(item.id)}>ADJUST</button>
            {
              editPopup
                ? <div className="popupdiv">
                  <div className="overlay" onClick={handlEditPopup}></div>
                  <div className="popupcontent">
                    <label htmlFor="amount">Amount</label>
                    <input className='dataInputs' type="number" id='amount' onChange={handleNewAmount} defaultValue={defaultValue} />
                    <label htmlFor="amount">Explanation</label>
                    <input className='dataInputs' type="text" id='explanation' defaultValue={defaulExplanation} onChange={handleNewExplanation} autoComplete='off' />
                    <button className='submitBTN' onClick={() => handleAdjustment(editId, newAmount, newExplanation)}>Edit</button>
                  </div>
                </div>
                : null
            }
          </div>
        )
      }


    </div>
  )
}

export default RightSide