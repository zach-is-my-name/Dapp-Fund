import 'isomorphic-fetch'

export const APPLY_FORM_POST_SUCCESS = 'APPLY_FORM_POST_SUCCESS'

export const USER_SELECTED_DAPP = 'USER_SELECTED_DAPP';
export const userSelectedDapp = (dapp) => ({
    type: USER_SELECTED_DAPP,
    dapp: dapp
})

export const FETCH_MEMBERDAPPS_SUCCESS = 'FETCH_MEMBERDAPPS_SUCCESS'
export const fetchMemberDappsSuccess = (dappDescriptionArr) => ({type: FETCH_MEMBERDAPPS_SUCCESS, dappDescriptionArr})

export const submitApply = (inputs) => async dispatch => {
console.log("FETCH INPUT", JSON.stringify(inputs))
    try {
        let response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let _response = await response.json();
        console.log("Response from Server", _response);
    } catch (err) {
        console.error(err)
    }
}

export const fetchMemberDapps = () => async dispatch => {
    try {
        let response = await fetch('http://localhost:3001/users', {
            method: 'GET'
        })
    let _response = await response.json();
    console.log("GET response from Server", _response);
    dispatch(fetchMemberDappsSuccess(_response))
    } catch (err) {
        console.error(err)
    }
}


