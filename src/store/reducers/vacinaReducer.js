const initState = {}

const vacinaReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_VACINA_SUCCESS':
      console.log('create vacina success');
      return state;
    case 'CREATE_VACINA_ERROR':
      console.log('create vacina error');
      return state;
    default:
      return state;
  }
};

export default vacinaReducer;