import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    cpf:'',
    idade:''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Cadastrar</h5>
          <div className="input-field">
            <label htmlFor="email">Email*</label>
            <input type="email" id='email' onChange={this.handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="password">Senha*</label>
            <input type="password" id='password' onChange={this.handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">Nome*</label>
            <input type="text" id='firstName' onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Sobrenome*</label>
            <input type="text" id='lastName' onChange={this.handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="cpf">CPF</label>
            <input type="text" id='cpf'  onChange={this.handleChange}required />
          </div>
          <div className="input-field">
            <label htmlFor="idade">Idade</label>
            <input type="number" id='idade' onChange={this.handleChange} required />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Cadastrar</button>
            <div className="center red-text">
              { authError ? <p>{authError}</p> : null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
