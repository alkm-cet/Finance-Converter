import React, { useContext, useState } from 'react';
import './RightSide.css';
//CONTEXT
import { FinanceContext } from '../../../context/FinanceContext';
//IMAGE
import banknote from '../../../images/banknote.png'
//Currency.Json
import currencyData from '../../../Currency.json';

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
    rates,
  } = useContext(FinanceContext);

  const [filterType, setFilterType] = useState('None')
  const [filterCurr, setFilterCurr] = useState('None')

  const handleFilter = (e) => {
    setFilterType(e.target.value)
  }

  const handleCurr = (e) => {
    setFilterCurr(e.target.value)
  }

  const handleClearAllFilters = () => {
    setFilterType('None')
    setFilterCurr('None')
  }

  return (
    <div className='RightSide'>

      <div className='filtersContainer'>
        <select onChange={handleFilter}>
          <option value="None">None</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select onChange={handleCurr}>
          <option selected value="None">None</option>
          {Object.keys(currencyData).map((currency) => (
            <option value={currency}>{currency}</option>
          ))}
        </select>

        <button onClick={handleClearAllFilters}>Clear</button>
      </div>

      {
        financeArray
          ?.filter((item) => filterType === 'None' || item.type === filterType)
          ?.filter((item) => filterCurr === 'None' || item.currencyType === filterCurr)
          ?.sort((a, b) => b.createdAt - a.createdAt)
          ?.map((item, index) => (
            <div
              key={item.id}
              className="datacontainer"
              style={
                item.type === 'Expense'
                  ? { backgroundColor: 'pink' }
                  : { backgroundColor: 'lightgreen' }
              }
            >
              <img src={banknote} style={{ width: '70px' }} alt="" />
              <p>{item.type}</p>
              <h1>
                {item.type === 'Expense' ? '- ' : '+ '}
                {item.amount} {item.currencyType}
              </h1>
              <p>Note:</p>
              <h4 className="explanationContainer">{item.explanation}</h4>
              <p>{new Date(item.createdAt).toLocaleString().slice(0, 10)}</p>
              <button className="ItemBTNS" onClick={() => handleDelete(index)}>
                DELETE
              </button>
              <button className="ItemBTNS" onClick={() => handlEditPopup(item.id)}>
                ADJUST
              </button>
              {editPopup ? (
                <div className="popupdiv">
                  <div className="overlay" onClick={handlEditPopup}></div>
                  <div className="popupcontent">
                    <label htmlFor="amount">Amount</label>
                    <input
                      className="dataInputs"
                      type="number"
                      id="amount"
                      onChange={handleNewAmount}
                      defaultValue={defaultValue}
                    />
                    <label htmlFor="amount">Explanation</label>
                    <input
                      className="dataInputs"
                      type="text"
                      id="explanation"
                      defaultValue={defaulExplanation}
                      onChange={handleNewExplanation}
                      autoComplete="off"
                    />
                    <button
                      className="submitBTN"
                      onClick={() => handleAdjustment(editId, newAmount, newExplanation)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))
      }

      {/* ---------------- */}
      {/* {
        filterType === 'None'
          ? financeArray?.sort((a, b) => b.createdAt - a.createdAt).map((item, index) =>
            <div key={item.id} className="datacontainer" style={item.type == 'Expense' ? { backgroundColor: 'pink' } : { backgroundColor: 'lightgreen' }}>
              <img src={banknote} style={{ width: '70px' }} alt="" />
              <p>{item.type}</p>
              <h1>{item.type == 'Expense' ? '- ' : '+ '}{item.amount} {item.currencyType}</h1>
              <p>Note:</p>
              <h4 className='explanationContainer'>{(item.explanation)}</h4>
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
          ) : financeArray?.sort((a, b) => b.createdAt - a.createdAt).filter((item) => item.type === filterType).map((item, index) =>
            <div key={item.id} className="datacontainer" style={item.type == 'Expense' ? { backgroundColor: 'pink' } : { backgroundColor: 'lightgreen' }}>
              <img src={banknote} style={{ width: '70px' }} alt="" />
              <p>{item.type}</p>
              <h1>{item.type == 'Expense' ? '- ' : '+ '}{item.amount} {item.currencyType}</h1>
              <p>Note:</p>
              <h4 className='explanationContainer'>{(item.explanation)}</h4>
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
      } */}
      {/* CURRENCY TYPE FILTER */}
      {/* {
        filterCurr === 'None'
          ? financeArray?.sort((a, b) => b.createdAt - a.createdAt).map((item, index) =>
            <div key={item.id} className="datacontainer" style={item.type == 'Expense' ? { backgroundColor: 'pink' } : { backgroundColor: 'lightgreen' }}>
              <img src={banknote} style={{ width: '70px' }} alt="" />
              <p>{item.type}</p>
              <h1>{item.type == 'Expense' ? '- ' : '+ '}{item.amount} {item.currencyType}</h1>
              <p>Note:</p>
              <h4 className='explanationContainer'>{(item.explanation)}</h4>
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
          ) : financeArray?.sort((a, b) => b.createdAt - a.createdAt).filter((item) => item.currencyType === filterCurr).map((item, index) =>
            <div key={item.id} className="datacontainer" style={item.type == 'Expense' ? { backgroundColor: 'pink' } : { backgroundColor: 'lightgreen' }}>
              <img src={banknote} style={{ width: '70px' }} alt="" />
              <p>{item.type}</p>
              <h1>{item.type == 'Expense' ? '- ' : '+ '}{item.amount} {item.currencyType}</h1>
              <p>Note:</p>
              <h4 className='explanationContainer'>{(item.explanation)}</h4>
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
      } */}


      {/* {
        financeArray?.sort((a, b) => b.createdAt - a.createdAt).map((item, index) =>
          <div key={item.id} className="datacontainer" style={item.type == 'Expense' ? { backgroundColor: 'pink' } : { backgroundColor: 'lightgreen' }}>
            <img src={banknote} style={{ width: '70px' }} alt="" />
            <p>{item.type}</p>
            <h1>{item.type == 'Expense' ? '- ' : '+ '}{item.amount} {item.currencyType}</h1>
            <p>Note:</p>
            <h4 className='explanationContainer'>{(item.explanation)}</h4>
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
      } */}


    </div>
  )
}

export default RightSide