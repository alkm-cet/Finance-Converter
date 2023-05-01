import './App.css';
import Header from './components/MainPage/Header/Header';
import MainPage from './components/MainPage/MainPage';
import FinanceContextProvider from './context/FinanceContext';

function App() {

  //------------------------

  return (
    <FinanceContextProvider>

      <div className="App">
        <Header />
        <MainPage />
      </div>
    </FinanceContextProvider>
  );
}

export default App;
