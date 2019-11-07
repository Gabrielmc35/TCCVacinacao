import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createVacina } from '../../store/actions/vacinaAuctions'
import { Redirect } from 'react-router-dom'

class CreateVacina extends Component {
    state = {
        codigo: '',
        sigla: '',
        nome: '',
        nomenclaturaAtual: '',
        dose: '',
        idade: '',
        estrategia: ''
    }
 
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.createVacina(this.state);
        this.props.history.push('/');
        // sera que aparece no git
    }

    render() {
        
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Criar Nova Vacina</h5>
                    <div className="input-field">
                        <input type="text" id='sigla' onChange={this.handleChange} />
                        <label htmlFor="sigla">Sigla</label>
                    </div>
                    <div className="input-field">
                        <textarea id="nome" className="materialize-textarea" onChange={this.handleChange}></textarea>
                        <label htmlFor="nome">Nome</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id='nomenclaturaAtual' onChange={this.handleChange} />
                        <label htmlFor="nomenclaturalAtual">NomenclaturaAtual</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id='dose' onChange={this.handleChange} />
                        <label htmlFor="dose">Dose</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id='idade' onChange={this.handleChange} />
                        <label htmlFor="idade">Idade</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id='estrategia' onChange={this.handleChange} />
                        <label htmlFor="estrategia">Estrategia</label>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Create</button>
                        
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {

    return {
           createVacina: (vacina) => dispatch(createVacina(vacina))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVacina)
