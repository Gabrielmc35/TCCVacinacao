import React from 'react'
import { Link } from 'react-router-dom'
import VacinaSummary from './VacinaSummary';

const VacinaList = ({vacinas}) => {
  return (
    <div className="vacina-list section">
      { vacinas && vacinas.map(vacina => {
        return (
          <Link to={'/vacina/' + vacina.id} key={vacina.id}>
            <VacinaSummary vacina={vacina} />
          </Link>
        )
      })}  
    </div>
  )
}

export default VacinaList
