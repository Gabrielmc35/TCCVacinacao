import React, { Component } from 'react'
import { connect } from 'react-redux'
import { criaVacinacao } from '../../store/actions/vacinaAuctions'
import { Redirect } from 'react-router-dom'
import VacinaSummary from '../vacina/VacinaSummary';
import {firestore} from '../../config/fbConfig'
class createVacinacao extends Component {
    state = {
        nomeUsuario: '',
        Vacina: ''
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.createVacinacao(this.state);
        this.props.history.push('/');

        var db;
       db= firestore;
       db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
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
        createVacinacao: (vacinacao) => dispatch(criaVacinacao(createVacinacao))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createVacinacao)

