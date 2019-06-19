import {
    AUCTION_ERROR,
    defaultState 
  } from '../actions/auction';
  
  const auction = (state = defaultState, action) => {
    switch (action.type) {
          
        case AUCTION_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state
        }
  };
  
  export default auction;