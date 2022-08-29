import React from 'react';
import { Expense } from './Expense';

export const ExpensesList = ({
  expenses, 
  setEditExpense, 
  deleteExpense, 
  filter, 
  filteredExpenses
}) => {
  return (
    <div className='listado-gastos contenedor'>

      {filter ?
          <>
            <h2> {filteredExpenses.length ? 'Gastos' : 'No tienes gastos en esta categoría'} </h2>
            {
              filteredExpenses.map(expense => (
                <Expense 
                  key={expense.id}
                  expense={expense}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
                />
              ))
            }
          </> :
          <>
            <h2> {expenses.length ? 'Gastos' : 'Todavía no tienes gastos'} </h2>
            {
              expenses.map(expense => (
                <Expense 
                  key={expense.id}
                  expense={expense}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
                />
              ))
            }
          </>
      }
    </div>
  )
}
