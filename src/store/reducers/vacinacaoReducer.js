const initState = {}

const vacinacaoReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_VACINACAO_SUCCESS':
      console.log('create vacinacao success');
      return state;
    case 'CREATE_VACINACAO_ERROR':
      console.log('create vacinacao error');
      return state;
    default:
      return state;
  }
};

export default vacinacaoReducer;