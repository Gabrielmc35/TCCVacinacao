import React from 'react'
import moment from 'moment'

const VacinaSummary = ({vacina}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{vacina.nome}</span>
        
      </div>
    </div>
  )
}

export default VacinaSummary
