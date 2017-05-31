import 'isomorphic-fetch'

export const APPLY_FORM_POST_SUCCESS = 'APPLY_FORM_POST_SUCCESS'

export const USER_SELECTED_DAPP = 'USER_SELECTED_DAPP';
export const userSelectedDapp = (index) => ({
    type: USER_SELECTED_DAPP,
    index: index
})

export const FETCH_MEMBERDAPPS_SUCCESS = 'FETCH_MEMBERDAPPS_SUCCESS'
export const fetchMemberDappsSuccess = (dappArray) => ({
    type: FETCH_MEMBERDAPPS_SUCCESS,
    dappArray: dappArray
})

export const FETCH_PROPOSALS_SUCCESS = 'FETCH_PROPOSALS_SUCCESS'
export const fetchProposalsSuccess = (proposals) => ({
    type: FETCH_PROPOSALS_SUCCESS,
    proposals: proposals
})

export const ADD_CONTRACT_TO_REDUCER = 'ADD_CONTRACT_TO_REDUCER'
export const addContractToReducer = (contract) => ({
    type: ADD_CONTRACT_TO_REDUCER,
    contract: contract
})

// export const UPDATE_FUND_BALANCE = 'UPDATE_FUND_BALANCE'
// export const updateFundBalance = (balance) => ({
//     type: UPDATE_FUND_BALANCE,
//     balance: balance
// })


export const submitApply = (inputs) => async dispatch => {
// console.log("FETCH INPUT", JSON.stringify(inputs))
    try {
        let response = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let _response = await response.json();
        // console.log("Response from Server", _response);
    } catch (err) {
        console.error(err)
    }
}

export const fetchMemberDapps = () => async dispatch => {
    try {
        let response = await fetch('/users', {
            method: 'GET'
        })
    let _response = await response.json();
    // console.log("GET response from Server", _response);
    dispatch(fetchMemberDappsSuccess(_response))
    } catch (err) {
        console.error(err)
    }
}


export const asyncPostProposal = (proposal) => async dispatch => {
    // console.log('PROPOSALS ASYNC ACTION')
    // console.log("proposal post INPUT", JSON.stringify(proposal))
    try {
        let response = await fetch('/proposals', {
            method: 'POST',
            body: JSON.stringify(proposal),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let _response = await response.json();
        // console.log("Response from Server", _response);
    } catch (err) {
        console.error(err)
    }
}

export const fetchProposals = () => async dispatch => {
    try {
        let response = await fetch('/proposals', {
            method: 'GET'
        })
    let _response = await response.json();
    // console.log("GET response from Server", _response);
    dispatch(fetchProposalsSuccess(_response))
    } catch (err) {
        console.error(err)
    }
}


export const asyncTallyVote = (proposal, vote) => async dispatch => {
    // console.log('PROPOSALS ASYNC ACTION')
    let id = proposal.id
    // console.log("proposal PUT INPUT", JSON.stringify(id))
    try {
        let response = await fetch(`proposals/${id}/${vote}`, {
            method: 'PUT',
            body: JSON.stringify(proposal),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let _response = await response.json();
        // console.log("Response from Server", _response);
    } catch (err) {
        console.error(err)
    }
}


export const asyncConfirmUser = (currentUserAddress) => async dispatch => {
    // console.log("USERS CONFIRM PUT INPUT", JSON.stringify(currentUserAddress))
    try {
        let response = await fetch(`users/${currentUserAddress}`, {
            method: 'PUT',
            body: JSON.stringify(currentUserAddress),
            headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
            }
        })
        let _response = await response.json();
        // console.log("Response from Server", _response);
    } catch (err) {
        console.error(err)
    }
}


export const asyncExecuteProposal = (proposalId) => async dispatch => {
    // console.log("USERS CONFIRM PUT INPUT", JSON.stringify(proposalId))
    try {
        let response = await fetch(`execute/${proposalId}`, {
            method: 'PUT',
            body: JSON.stringify(proposalId),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }
        })
        let _response = await response.json();
        // console.log("Response from Server", _response);
    } catch (err) {
        console.error(err)
    }
}
