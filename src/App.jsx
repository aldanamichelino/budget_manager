import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { ExpensesList } from './components/ExpensesList';
import { Modal } from './components/Modal';
import { generateId } from './utils';
import NewExpenseIcon from './img/nuevo-gasto.svg';

function App() {

  const [expenses, setExpenses] = useState(localStorage.getItem('budget') ? JSON.parse(localStorage.getItem('expenses')) : []);
  const [budget, setBudget] = useState(localStorage.getItem('budget') ?? 0);
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [editExpense, setEditExpense] = useState({});
  const [filter, setFilter] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    if(Object.keys(editExpense). length > 0){
      setModal(true);

      setTimeout(() => {
        setAnimateModal(true);
      }, 300);
    }
  }, [editExpense]);

  useEffect(() => {
    Number(localStorage.setItem('budget', budget ?? 0));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? 0);
  }, [expenses]);

  useEffect(() => {
    if(filter){
      const filteredExpenses = expenses.filter(expense => expense.category === filter);
      setFilteredExpenses(filteredExpenses);
    }
  }, [filter]);
  
  useEffect(() =>{
    const budgetInLS = Number(localStorage.getItem('budget')) ?? 0;

    if(budgetInLS > 0){
      setIsValidBudget(true);
    }
  }, []);

  const handleNewExpense = () => {
    setModal(true);
    setEditExpense({});

    setTimeout(() => {
      setAnimateModal(true);
    }, 300);
  };

  const saveExpense = expense => {
    if(expense.id){
      const updatedExpenses = expenses.map(expenseState => expenseState.id === expense.id ? expense : expenseState);
      setExpenses(updatedExpenses);
      setEditExpense({});
    } else {
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }

    setAnimateModal(false);
    
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const deleteExpense = id => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filters
              filter={filter}
              setFilter={setFilter}
            />
            <ExpensesList
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </main>
          <div className="nuevo-gasto">
              <img src={NewExpenseIcon} 
              alt="new-expense-icon"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}

      {modal && 
      <Modal 
        setModal={setModal}
        animateModal={animateModal}
        setAnimateModal={setAnimateModal}
        saveExpense={saveExpense}
        editExpense={editExpense}
        setEditExpense={setEditExpense}
      />}

    </div>
  )
}

export default App
