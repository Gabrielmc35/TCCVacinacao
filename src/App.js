import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import CreateVacina from './components/vacina/CreateVacina';
import VacinaDetails from './components/vacina/VacinaDetails';
import VacinaList from './components/vacina/VacinaList';
import ProjectList from './components/projects/ProjectList'
import UploadVacina from './components/vacina/UploadVacina'
import CreateVacinacao from './components/vacinacao/CreateVacinacao';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
            <Route path='/criarVacina' component={CreateVacina}/>
            <Route path='/vacinas' component={VacinaList}></Route>/>
            <Route path='/vacina/:id' component={VacinaDetails} />
            <Route path='/ProjectList' component={ProjectList}/>
            <Route path='/UploadVacina' component={UploadVacina}/>
            <Route path='/CriaVacinacao' component={CreateVacinacao}/>

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
