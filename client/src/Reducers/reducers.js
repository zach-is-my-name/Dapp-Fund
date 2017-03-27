import update from 'immutability-helper';
const initialState = {
DappDescription: [],
// // array of objects
isFetched: false,
dappSelected: null,
};

export const appReducer = (state = initialState, action) => {
  if (action.type === 'FETCH_MEMBERDAPPS_SUCCESS'){
    return update(state, {
     DappDescription:{$set: action.dappDescriptionArr},
     isFetched:{$set: true}
    })
  }
  if (action.type === 'USER_SELECTED_DAPP'){
    return update(state, {
     dappSelected:{$set: action.dapp},
    })
  }
  console.log(state);
  return state;
}
