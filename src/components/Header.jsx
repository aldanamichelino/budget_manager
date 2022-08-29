import React from 'react';
import { NewBudget } from './NewBudget';
import { BudgetControl } from './BudgetControl';

export const Header = ({
  expenses,
  setExpenses,
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget
}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>
      {isValidBudget ?
        <BudgetControl 
          expenses={expenses}
          setExpenses={setExpenses}
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        /> :
        <NewBudget 
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      }
    </header>
  )
}
