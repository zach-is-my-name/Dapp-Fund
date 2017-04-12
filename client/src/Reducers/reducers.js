import update from 'immutability-helper';
import * as actions from '../Actions/actions';
import store from '../store';
var Web3 = require('web3');
let web3 = window.web3;

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log('using metamask')
        console.log(window.web3);
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
})

const initialState = {
  dappList: [],
  isFetched: false,
  dappSelected: null,
  activeProposals: null,
  entryFee: 2,
  congressContractAddress: '0x489eb9B0270Fef9413852aAc63695Ca18CEd690f',
  // congressContract: web3.eth.contract([{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"},{"name":"_token","type":"address"},{"name":"_extraData","type":"bytes"}],"name":"receiveApproval","outputs":[],"payable":false,"type":"function"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"receivedEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_token","type":"address"},{"indexed":false,"name":"_extraData","type":"bytes"}],"name":"receivedTokens","type":"event"}]).at("0x489eb9B0270Fef9413852aAc63695Ca18CEd690f")
  congressContract: null
};
export const appReducer = (state = initialState, action) => {

  if (action.type === "ADD_CONTRACT_TO_REDUCER") {
    setTimeout(()=> { console.log(store.getState(), "contract added to reducer?")}, 3000);

    return update(state, {
     congressContract:{$set: action.contract}
    })
  }

  if (action.type === "FETCH_MEMBERDAPPS_SUCCESS"){

    setTimeout(()=> { console.log(store.getState(), "FETCH_MEMBERDAPPS_SUCCESS")}, 3000);

    return update(state, {
     dappList:{$set: action.dappArray},
     isFetched:{$set: true}
    })
  }

  if (action.type === "USER_SELECTED_DAPP"){


    setTimeout(()=> { console.log(store.getState(), "USER_SELECTED_DAPP")}, 3000);

    return update(state, {
     dappSelected:{$set: action.index},
    })
  }

  if (action.type === "FETCH_PROPOSALS_SUCCESS"){


    setTimeout(()=> { console.log(store.getState(), "FETCH_PROPOSALS_SUCCESS")}, 3000);

    return update(state, {
     activeProposals: {$set: action.proposals},
    })
  }


  // if (action.type === "UPDATE_FUND_BALANCE"){


  //   setTimeout(()=> { console.log(store.getState(), "UPDATE_FUND_BALANCE")}, 3000);

  //   return update(state, {
  //    fundBalance: {$set: action.balance},
  //   })
  // }

  return state;
}
