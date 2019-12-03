import React, { Component } from 'react'
import { connect } from 'react-redux'
import { criaVacinacao } from '../../store/actions/vacinaAuctions'
import { firestore } from '../../config/fbConfig'
import { NavLink } from 'react-router-dom'

class createVacinacao extends Component {
    state = {
        dados: undefined,
        dadosUsers: undefined,
        usuarioSelecionado: undefined,
        vacinaSelecionada: undefined,
        localvacina:'',
    }


    handleChange = (e) => {
        console.log(e.target.id)

        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        this.props.createVacinacao(this.state);
        this.props.history.push('/');
    }
    componentDidMount = async () => {
        await this.loadData();
    }

    getSelectValueVacina= () =>{
        const selectedValue = document.getElementById("vacinaSelecionada").value;
        const vacinaSelecionada= selectedValue;
            console.log(selectedValue);
            this.setState({vacinaSelecionada})
        }
        getSelectValueUsuario= () =>{
            const selectValueUsuario= document.getElementById("usuarioSelecionado").value;
            const usuarioSelecionado=selectValueUsuario;
                this.setState({usuarioSelecionado})
            }

            
            comparaValor= async() =>{
                const dados=[];
                const db= firestore;
                const{vacinaSelecionada}=this.state;
                const{usuarioSelecionado}=this.state;
                console.log(dados)
                const querySnapshot = await db.collection("vacinas").orderBy('nome').get(); // .then((querySnapshot) => {
                    
                const querySnapshotusers = await db.collection("users").get();
                const dadosUsers=[];
                    querySnapshot.forEach((doc) => {

                        if(doc.id==vacinaSelecionada)
                        {
                            dados.push({
                                id: doc.id,
                                ...doc.data(),
                            })

                        }             
            });
            this.setState({dados});
            console.log(dados)


            querySnapshotusers.forEach((doc) => {

                if(doc.id==usuarioSelecionado)
                {
                    dadosUsers.push({
                        id: doc.id,
                        ...doc.data(),
                    })

                }             
    });
    this.setState({dadosUsers});
    console.log(dadosUsers)

   
        }
    
    loadData = async () => {
        // console.log(this.state);
        // this.props.createVacinacao(this.state);
        // this.props.history.push('/');

        const db = firestore;
        const querySnapshotusers = await db.collection("users").orderBy('firstName').get();

        const querySnapshot = await db.collection("vacinas").orderBy('nomenclaturaAtual').get(); // .then((querySnapshot) => {
        const dados = [];
        const dadosUsers= [];
    
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            dados.push({
                id: doc.id,
                ...doc.data(),
            })
        });
        this.setState({ dados })
        querySnapshotusers.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            dadosUsers.push({
                id: doc.id,
                ...doc.data(),
            })
        });
        this.setState({ dadosUsers })
    
    };

   

   
    render() {
        
        const { dados } = this.state;
        const {dadosUsers} = this.state;

               return (

            <div className="container">
                <form className="white"  onSubmit={this.handleSubmit} >

                <label htmlFor="vacinaSelecionada">Seleciona a vacina a ser aplicada</label>

                    <select class="browser-default" id="vacinaSelecionada" onChange={this.getSelectValueVacina}>
                        <option value="" disabled selected>Vacinas</option>
                        {dados && dados.map(x => (
                            <option key={x.id} value={x.id}>
                                {x.nome} 
                                
                            </option>
                        ))}
                        

                    </select>
                    
                    <label htmlFor="usuarioSelecionado">Selecione o Usuário que irá Receber a vacina</label>

                    <select class="browser-default" id ="usuarioSelecionado" onChange ={this.getSelectValueUsuario}>
                        <option value="" disabled selected>Usuários</option>
                        {dadosUsers && dadosUsers.map(x => (
                            <option key={x.id} value={x.id}>
                                 {x.firstName} - {x.cpf}
                                 
                            </option>
                        ))}
                        
                  

}
                    </select>
                    <div className="input-field">
                        <input type="text" id='local'required    onChange={this.handleChange} onInput={this.comparaValor}/>
                        <label htmlFor="local">local da vacina</label>
                    </div>
                    <div className="input-field">
                        
                        <button className="btn green lighten-2" >Cadastrar Vacinação</button>

                    </div>
                    <p class="btn red lighten-1 "  > <NavLink to='/'> Voltar </NavLink></p>

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
        createVacinacao: (vacinacao) => dispatch(criaVacinacao(vacinacao))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createVacinacao)

