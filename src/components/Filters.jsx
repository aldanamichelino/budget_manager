import React, {useState, useEffect} from 'react';

export const Filters = ( {filter, setFilter} ) => {
  return (
    <div className='filtros sombra contenedor'>
      <form action="">
        <div className='campo'>
          <label>Filtrar gastos</label>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
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
      </form>
    </div>
  )
}
