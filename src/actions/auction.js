
export const AUCTION_ERROR = 'AUCTION_ERROR';
export const AUCTION_UPDATE_ITEM = 'AUCTION_UPDATE_ITEM';
export const AUCTION_LOAD_DATA = 'AUCTION_LOAD_DATA';

import {Backend_EndPoint, ItemInfos} from '../constants';
import { ApiProvider } from '../ApiProvider';

let temp = [];
let tempCategory = [];
const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
const groupByCategory = groupBy('itemCategory');
temp = groupByCategory(ItemInfos);
tempCategory = Object.keys(temp);

export const defaultState = {
    itemList: [],
    auctionList: [],
    trackList: [],
    categories: tempCategory,
    items: [],
    error: null,
};

export function updateCategory(categroy) {
    var _t = temp[categroy];
    var _s = [];
    _t.forEach(element => {
        var _e = {
            'value' : element.id,
            'label' : element.itemName,
            'itemCategory' : element.itemCategory,
        };
        _s.push(_e);
    });
    return (dispatch, getState) => {
        dispatch({
            type: AUCTION_UPDATE_ITEM,
            payload: _s
        }); 
    };
}

export function setItem(params) {

    return async (dispatch, getState) => {
        try {
            await ApiProvider(Backend_EndPoint + "api/item/post", "POST", params);
            var item = await ApiProvider(Backend_EndPoint + "api/item/get", "GET", null);
            dispatch({
                type: AUCTION_LOAD_DATA,
                payload: {
                    itemList: item.payload,
                }
            });
        } catch (error) {
            dispatch({
                type: AUCTION_ERROR,
                payload: error
            });
        };
    };
}

export function loadData() {
    return async (dispatch, getState) => {
        try {
            var item = await ApiProvider(Backend_EndPoint + "api/item/get", "GET", null);
            var track = await ApiProvider(Backend_EndPoint + "api/item/track", "GET", null);
            var auction = await ApiProvider(Backend_EndPoint + "api/auction/result/", "GET",null);
            dispatch({
                type: AUCTION_LOAD_DATA,
                payload: {
                    itemList: item.payload,
                    trackList: track.payload,
                    auctionList: auction.payload,
                }
            });
        } catch (error) {
            dispatch({
                type: AUCTION_ERROR,
                payload: error
            });
        };
    };
}
