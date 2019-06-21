import {
    AUCTION_ERROR,
    AUCTION_UPDATE_ITEM,
    AUCTION_LOAD_DATA,
    AUCTION_LOAD_ITEM,
    defaultState 
  } from '../actions/auction';
  
  const auction = (state = defaultState, action) => {
    switch (action.type) {          
        case AUCTION_ERROR:
            alert(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case AUCTION_UPDATE_ITEM:
            return {
                ...state,
                items: action.payload
            };
        case AUCTION_LOAD_DATA:
            return {
                ...state,
                itemList: action.payload.itemList,
                trackList: action.payload.trackList,
                auctionList: action.payload.auctionList,
            };
        case AUCTION_LOAD_ITEM:
            return {
                ...state,
                itemList: action.payload.itemList
            };
        default:
            return state
        }
  };
  
  export default auction;