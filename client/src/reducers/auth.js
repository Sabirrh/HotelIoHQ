
// Redux setup using sessionStorage only
let userState = null;

if (typeof window !== 'undefined' && window.sessionStorage.getItem('auth')) {
  userState = JSON.parse(window.sessionStorage.getItem('auth'));
}

// Auth reducer
export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('auth', JSON.stringify(action.payload));
      }
      return action.payload;

    case 'LOGOUT':
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem('auth');
      }
      return null;

    default:
      return state;
  }
};

