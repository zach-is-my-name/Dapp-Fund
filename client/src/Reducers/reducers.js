import update from 'immutability-helper';
const initialState = {
DappDescription: [],
// // array of objects
isFetched: false
};

export const appReducer = (state = initialState, action) => {
  if (action.type === 'FETCH_MEMBERDAPPS_SUCCESS'){
    return update(state, {
     DappDescription:{$set: action.dappDescriptionArr},
     isFetched:{$set: true}
    })
  }
  console.log(state);
  return state;
}
