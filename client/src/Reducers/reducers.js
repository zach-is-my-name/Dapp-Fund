import update from 'immutability-helper';
const initialState = {
DappDetails: [],
// array of objects
};

export const appReducer = (state = initialState, action) => {
  if (action.type === APPLY_FORM_POST_SUCCESS){
    return update(state, {
      DappDetails:{$set: action.data}
    })
  }
  return state;
}
