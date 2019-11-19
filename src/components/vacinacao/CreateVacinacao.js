import React, { Component } from 'react'
import { connect } from 'react-redux'
import { criaVacinacao } from '../../store/actions/vacinaAuctions'
import { Redirect } from 'react-router-dom'
import VacinaSummary from '../vacina/VacinaSummary';
import { firestore } from '../../config/fbConfig'

class createVacinacao extends Component {
    state = {
        nomeUsuario: '',
        Vacina: '',
        teste: '',
        dados: undefined,
    }


    handleChange = (e) => {
        console.log(e.target.id)

        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
    }
    componentDidMount = async () => {
        await this.loadData();
    }
    loadData = async () => {
        // console.log(this.state);
        // this.props.createVacinacao(this.state);
        // this.props.history.push('/');

        const db = firestore;
        const querySnapshot = await db.collection("vacinas").get(); // .then((querySnapshot) => {
        const dados = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            dados.push({
                id: doc.id,
                ...doc.data(),
            })
        });
        this.setState({ dados });
    };


    render() {
        const { dados } = this.state;
        return (

            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>


                    <select class="browser-default">
                        <option value="" disabled selected>Choose your option</option>
                        {dados && dados.map(x => (
                            <option key={x.id} value={x.id}>
                                {x.dose} - {x.estrategia} - {x.idade} - {x.nome} - {x.nomenclaturaAtual} - {x.sigla}
                            </option>
                        ))}
                    </select>
                    <div className="input-field">
                        <input type="text" id='teste' onChange={this.handleChange} />
                        <label htmlFor="teste">teste</label>
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

