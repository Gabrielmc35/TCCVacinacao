import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const VacinaDetails = (props) => {
    
  const { vacina, auth } = props;
  if (!auth.uid) return <Redirect to='/signin' /> 
  
  if (vacina) {
      
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{vacina.nome + '(' +vacina.sigla +')'}</span>
            <p>{'NomenclaturaAtual:'+vacina.nomenclaturaAtual}</p>
            <p>{'Dose:'+vacina.dose}</p>
            <p>{'Estrategia:'+vacina.estrategia}</p>
            <p>{'Idade:'+vacina.idade}</p>
           

          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>{moment(vacina.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading vacina...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const vacinas = state.firestore.data.vacinas;
  const vacina = vacinas ? vacinas[id] : null
  return {
    vacina: vacina,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'vacinas'
  }])
)(VacinaDetails)
