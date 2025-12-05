//Redux setUp 
// using localStorage
let userState = null;

if (window !== 'undefined' && window.localStorage.getItem('auth')) {
  userState = JSON.parse(window.localStorage.getItem('auth'));
}
// } else {
//   userState = null;
// }
//2. create user reducer function
export const authReducer = (state = userState , action) => {
  // Each action should have like { type: 'LoggedInTime' , payload:'{ name:'Ryan', role:'seller' }'}
  switch (action.type) {
    case "LOGGED_IN_USER":
      // return { ...state, ...action.payload }
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state;
  }
}



