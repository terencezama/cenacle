const EMAIL = "Auth/Email"
const INITIAL_STATE = {
  payload: null,
  email:null
}
export const saveEmail = payload =>({
  type:EMAIL,
  payload
})
export const reducer = (state = INITIAL_STATE,action)=>{

  switch(action.type){
    case EMAIL:
    return{
      ...state,
      email:action.payload
    }
  }
  return state 
}
