import { useState, useEffect } from 'react';
import CloseModalBtn from '../img/cerrar.svg';
import { Message } from './Message';

export const Modal = ({
  setModal, 
  animateModal,
  setAnimateModal, 
  saveExpense,
  editExpense,
  setEditExpense
}) => {

  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if(Object.keys(editExpense). length > 0){
      setName(editExpense.name);
      setAmount(editExpense.amount);
      setCategory(editExpense.category);
      setDate(editExpense.date);
      setId(editExpense.id);
    }
  }, []);

  const hideModal = () => {
    setAnimateModal(false);
    setEditExpense({});
    
    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if([name, amount, category].includes('')){
      setMessage('Todos los campos son obligatorios');

      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }

    saveExpense({
      name,
      amount,
      category,
      date,
      id
    });
  }
  
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CloseModalBtn}
          alt="close-modal"
          onClick={hideModal}
        />
      </div>

      <form 
        onSubmit={handleSubmit}
        className={`formulario ${animateModal ? 'animar' : 'cerrar'}`} action="">
          <legend>{editExpense.name ? 'Editar gasto' : 'Nuevo gasto'}</legend>
          {message && <Message type="error">{message}</Message>}

          <div className='campo'>
            <label htmlFor="name">Nombre gasto</label>
            <input
              id="name"
              type="text"
              placeholder='Añade el nombre del gasto'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='campo'>
            <label htmlFor="amount">Cantidad</label>
            <input
              id="amount"
              type="number"
              placeholder='Añade la cantidad del gasto. Ej.: 300'
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
            />
          </div>
          <div className='campo'>
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">-- Seleccionar --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>
          </div>

          <input type="submit" value={editExpense.name ? 'Guardar cambios' : 'Añadir gasto'} />
      </form>
    </div>
  )
}
