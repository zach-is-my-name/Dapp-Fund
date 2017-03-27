import 'isomorphic-fetch'

export const APPLY_FORM_POST_SUCCESS = 'APPLY_FORM_POST_SUCCESS'

/* On Hold, We're not Updateing the Store for Member Dapps Based on the Server Response from Post. Only on a GET * AFTER PUT */
// export const applyFormPostSuccess = (data) => ({type: APPLY_FORM_POST_SUCCESS, data})

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
