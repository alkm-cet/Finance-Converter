import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FinanceContext = createContext();

function FinanceContextProvider({ children }) {

    const [balance, setBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0)
    const [popup, setPopup] = useState(false);
    const [dataType, setDataType] = useState('');
    const [amount, setAmount] = useState(0);
    const [explanation, setExplanation] = useState('');
    const [financeArray, setFinanceArray] = useState([]);
    //-------------
    const [editPopup, setEditPopup] = useState(false);
    const [editId, setEditId] = useState();
    const [newAmount, setNewAmount] = useState();
    const [newExplanation, setNewExplanation] = useState();
    const [defaultValue, setDefaultValue] = useState(0);
    const [defaulExplanation, setDefaultExplanation] = useState("")
    //-------------
    const [storedArray, setStoredArray] = useState([]);
    const [currencyType, setCurrencyType] = useState('');

    //--------------------------
    function handleCurrencyType(e) {
        setCurrencyType(e.target.value);

    }

    //HANDLE POPUP--------------------------
    const handlePopup = (e) => {
        setPopup(!popup)
        setDataType(e.target.value)
        // setCurrencyType('')
    }

    //HANDLE AMOUNT-------------------------
    const handleAmount = (e) => {
        setAmount(e.target.value)
    }

    //HANDLE NEWAMOUNT---------------
    const handleNewAmount = (e) => {
        setNewAmount(e.target.value)
    }

    //HANDLE EXPLANATİON------------------
    const handleExplanation = (e) => {
        setExplanation(e.target.value)
    }

    //HANDLE NEWEXPLANATİON---------------
    const handleNewExplanation = (e) => {
        setNewExplanation(e.target.value)
    }

    //HANDLE DATAS-------------------------

    const handleDatas = () => {
        if (amount !== 0 && amount !== '' && explanation !== '') {
            let date = new Date();
            let createdAt = date.getTime();
            let id = Math.floor(Math.random() * 1000000)

            const newFinanceArray = [...financeArray,
            {
                id,
                type: dataType,
                amount: amount,
                explanation: explanation,
                currencyType: currencyType,
                createdAt,
            }]
            setFinanceArray(newFinanceArray);
            setPopup(false);
            setAmount(0);
            setExplanation('');
            localStorage.setItem('financeArray', JSON.stringify(newFinanceArray));
        } else {
            alert('Fill all the blanks!')
        }
    };

    useEffect(() => {
        const savedArray = localStorage.getItem('financeArray');
        setFinanceArray(savedArray ? JSON.parse(savedArray) : [])
    }, []);

    // DELETE DATA--------------------------
    const handleDelete = (index) => {
        const selected = financeArray[index];

        if (selected.type === "Income") {
            setBalance((prev) => prev - Number(selected.amount));
            setTotalIncome((prev) => prev - Number(selected.amount));
        } else if (selected.type === "Expense") {
            setBalance((prev) => prev + Number(selected.amount));
            setTotalExpense((prev) => prev - Number(selected.amount));
        }

        const newList = [...financeArray];
        newList.splice(index, 1);
        setFinanceArray(newList);

        localStorage.setItem('financeArray', JSON.stringify(newList))
    };

    //ADJUST DATA -----------------------------
    const handleAdjustment = (id, newAmount, newExplanation) => {

        const selected = financeArray.find(item => item.id === id);

        if (newAmount !== 0 && newAmount !== "" && newExplanation !== '') {
            if (selected.type === "Income") {
                setBalance((prev) => prev + Number(newAmount) - Number(selected.amount));
                setTotalIncome((prev) => prev + Number(newAmount) - Number(selected.amount));
            } else if (selected.type === "Expense") {
                setBalance((prev) => prev - Number(newAmount) + Number(selected.amount));
                setTotalExpense((prev) => prev + Number(newAmount) - Number(selected.amount));
            }

            setFinanceArray(prevFinanceArray => {
                const index = prevFinanceArray.findIndex(item => item.id === id);
                if (index === -1) {
                    return prevFinanceArray;
                }
                const newFinanceArray = [...prevFinanceArray];
                const editedItem = { ...newFinanceArray[index], amount: newAmount, explanation: newExplanation };
                newFinanceArray[index] = editedItem;
                localStorage.setItem('financeArray', JSON.stringify(newFinanceArray))
                return newFinanceArray;
            });
            setEditPopup(false)
        } else {
            alert('Fill all the blanks!')
        }
    }

    //EDIT POPUP ---------------------
    const handlEditPopup = (id) => {

        const selected = financeArray.find(item => item.id === id);
        setEditPopup(!editPopup);
        setEditId(id);
        setDefaultValue(selected?.amount);
        setDefaultExplanation(selected?.explanation)
    }

    //------------------------------------------------

    return (
        <FinanceContext.Provider
            value={{
                balance,
                totalIncome,
                totalExpense,
                popup,
                setPopup,
                dataType,
                setDataType,
                handlePopup,
                handleAmount,
                handleExplanation,
                financeArray,
                handleDatas,
                handleDelete,
                handleAdjustment,
                editPopup,
                setEditPopup,
                newAmount,
                newExplanation,
                handleNewAmount,
                handleNewExplanation,
                editId,
                setEditId,
                handlEditPopup,
                storedArray,
                defaultValue,
                defaulExplanation,
                handleCurrencyType,
                currencyType,

            }}>
            {children}
        </FinanceContext.Provider>
    )
}

export default FinanceContextProvider