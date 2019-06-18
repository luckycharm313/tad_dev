import { 
  WEB3_CONNECTED, 
  CONTRACT_INSTANTIATED, 
  FETCHED_CONTRACT, 
  HOME_GOV_AND_TAX, 
  HOME_ERROR, 
  HOME_UPDATE_GOV,
  HOME_UPDATE_TAX,
  defaultState 
} from '../actions/home';

const home = (state = defaultState, action) => {
  switch (action.type) {
  case WEB3_CONNECTED:
    return {
      ...state,
      web3: action.payload
    };
  case CONTRACT_INSTANTIATED:
    return {
      ...state,
      instance: action.payload
    };
  case FETCHED_CONTRACT:
    return {
      ...state,
      totalSupply: action.payload.totalSupply,
      govTax: action.payload.govTax,
      tadTax: action.payload.tadTax
    };
  case HOME_GOV_AND_TAX:
    return {
      ...state,
      governors: action.payload.governors,
      govTax: action.payload.govTax,
      tadTax: action.payload.tadTax
    };
  case HOME_UPDATE_GOV:
    return {
      ...state,
      governors: action.payload,
    };
  case HOME_UPDATE_TAX:
    if(action.payload.index == 1 ){
      return {
        ...state,
        tadTax: action.payload.tax,
      };
    }
    else{
      return {
        ...state,
        govTax: action.payload.tax,
      };
    }    
  case HOME_ERROR:
    return {
      ...state,
      error: action.payload
    };
  default:
    return state
  }
};

export default home;