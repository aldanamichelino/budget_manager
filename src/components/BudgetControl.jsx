import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatAmount } from '../utils';

export const BudgetControl = ({
  expenses,
  setExpenses,
  budget,
  setBudget,
  setIsValidBudget
}) => {

  const [available, setAvailable] = useState(0);
  const [spentBudget, setSpentBudget] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const totalSpent = expenses.reduce((total, expense) => expense.amount + total, 0);
    const availableBudget = budget - totalSpent;
    const graphPercentage = (( (budget - availableBudget) / budget ) * 100).toFixed(2);
    
    setSpentBudget(totalSpent);
    setAvailable(availableBudget);
    setTimeout(() => {
      setPercentage(graphPercentage);
    }, 1000);
  }, [expenses]);

  const handleAppReset = () => {
    const confirmAppReset = confirm('¿Desear resetar tu presupuesto y gastos?');

    if(confirmAppReset){
      setExpenses([]);
      setBudget(0);
      setIsValidBudget(false);
    }
  }
  

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: percentage > 100 ? '#DC2626' : '#3B8'
          })}
          value={percentage}
          text={`${percentage} % gastado`}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button
          className='reset-app'
          type='button'
          onClick={handleAppReset}
        >
          Resetear app
        </button>
        <p>
          <span>Presupuesto: </span> {formatAmount(budget)}
        </p>
        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatAmount(available)}
        </p>
        <p>
          <span>Gastado: </span> {formatAmount(spentBudget)}
        </p>
      </div>
    </div>
  )
}
