import Web3 from 'web3';
import contract from 'truffle-contract';

export const WEB3_CONNECTED = 'WEB3_CONNECTED';
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED';
export const CONTRACT_INSTANTIATED = 'CONTRACT_INSTANTIATED';
export const FETCHED_CONTRACT = 'FETCHED_CONTRACT';
export const HOME_GOV_AND_TAX = 'HOME_GOV_AND_TAX';
export const HOME_ERROR = 'HOME_ERROR';

import {SimpleStorageContract, Backend_EndPoint} from '../constants';
import { ApiProvider } from '../ApiProvider';

export const defaultState = {
  web3: null,
  instance: null,
  govTax: 0,
  tadTax: 0,
  totalSupply: 0,
  governors: [],
  error: null,

};

export function web3connect() {
  return (dispatch) => {
    const web3 = window.web3;
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(web3.currentProvider)
      });
    } else {
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
      });
    }
  };
}

export function initContract() {
  return (dispatch, getState) => {
    const web3 = getState().home.web3;
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(web3.currentProvider);

    return simpleStorage.deployed().then((instance) => {
      dispatch({
        type: CONTRACT_INSTANTIATED,
        payload: instance
      });
    });
  };
}

export function fetchContracts() {
  return (dispatch, getState) => {
    const homeReducer = getState().home;
    const simpleStorageInstance = homeReducer.instance;

    simpleStorageInstance.totalSupply().then((totalSupply) => {
      simpleStorageInstance.govTax().then(govTax => {
        simpleStorageInstance.tadTax().then(tadTax => {
          dispatch({
            type: FETCHED_CONTRACT,
            payload: {
              totalSupply: parseFloat((totalSupply / Math.pow(10, 18)).toString(10)),
              govTax: parseFloat(govTax.toString(10)),
              tadTax: parseFloat(tadTax.toString(10))
            }
          });
        });
      });    
    });
  };
}

export function loadGovAndTax() {
  return async (dispatch, getState) => {
    try {
      var governors = await ApiProvider(Backend_EndPoint + "api/governor/all/", "GET", null);
      var govTax = await ApiProvider(Backend_EndPoint + "api/tax/getGovTax", "GET", null);
      var tadTax = await ApiProvider(Backend_EndPoint + "api/tax/getTadTax", "GET", null);

      dispatch({
        type: HOME_GOV_AND_TAX,
        payload: {
          governors: governors.payload,
          govTax: govTax.payload,
          tadTax: tadTax.payload
        }
      });
    } catch (error) {
      dispatch({
        type: HOME_ERROR,
        payload: error
      });
    };
  };
}

// export function instantiateTodoContract() {
//   return (dispatch, getState) => {
//     const web3 = getState().web3;
//     const todos = contract(TodosContract);
//     todos.setProvider(web3.currentProvider);
//     return todos.deployed().then((todosContract) => {
//       dispatch({
//         type: TODOS_CONTRACT_INSTANTIATED,
//         payload: todosContract
//       });
//     });
//   };
// }



// export function addTodo(payload) {
//   return (dispatch, getState) => {
//     const web3 = getState().web3;
//     const todosContract = getState().todosContract;
//     web3.eth.getAccounts((err, accounts) => {
//       todosContract.addTodo(web3.fromAscii(payload), {
//         from: accounts[0]
//       }).then((results) => {
//         dispatch({
//           type: TODO_ADDED,
//           payload
//         });
//       });
//     });
//   };
// }