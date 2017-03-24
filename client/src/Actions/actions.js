import 'isometric-fetch'
export const APPLY_FORM_POST_SUCCESS = 'APPLY_FORM_POST_SUCCESS'
export const applyFormPostSuccess = (data) => ({type: APPLY_FORM_POST_SUCCESS, data})
//Get to the bottom of syntax highlights
//Find out how to use fetch() to send multiple req.body's
//destructure inputs object to match api params
export const submitApply = inputs => async dispatch => {

    try {
        let response = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        let data = await response.json()
        console.log(data)
        data => dispatch(applyFormPostSuccess(data))
        catch (e) {
            console.error(e)
        }
    ) ();
};
