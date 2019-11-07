
import firebase from 'firebase'

export const createVacina = (vacina) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();

      firestore.collection('vacinas').add({
        ...vacina,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_VACINA_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_VACINA_ERROR' }, err);
      });
    }
  };

  export const enviaVacina = () => {
    return (dispatch, getState, {getFirestore}) => {
      console.log('foi')
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      const armazenamento= getState().firebase.firestore;
      firestore.collection('cartaoVacinas').add({
        usuario:authorId,
        url:'' ,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_UPDATE_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_UPDATE_ERROR' }, err);
      });
    }
  };
  
  export const criaVacinacao = (vacinacao,props) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      const firstName=profile.firstName;
      const lastName= profile.lastName;
      const cpf = profile.cpf;
      const user= firebase.auth().currentUser;

      
      firestore.collection('criaVacinacao').add({
        ...vacinacao,
      
        Aplicador:{profile,        IDAplicador: authorId,
        },
     
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_VACINACAO_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_VACINACAO_ERROR' }, err);
      });
    }
  };