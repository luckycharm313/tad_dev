
export const LOTTERY_ERROR = 'HOME_ERROR';
export const LOTTERY_W_J_T_S = 'LOTTERY_W_J_T_S';
export const LOTTERY_UPDATE_WINNER = 'LOTTERY_UPDATE_WINNER';

import {Backend_EndPoint} from '../constants';
import { ApiProvider } from '../ApiProvider';

export const defaultState = {
    lastWinningNumber: [0, 0, 0, 0, 0, 0],
    jackpot: null,
    ticketList: [],
    scratcherNumbers: [],
    scratcherList: [],
    error: null,
};

export function loadWinningJackpotTicketScratcher() {
  return async (dispatch, getState) => {
    try {
        var lastWinningNumber = await ApiProvider(Backend_EndPoint + "api/lottery/lastWinningNumber/", "GET", null);
        var jackpot = await ApiProvider(Backend_EndPoint + "getJackpot/", "GET", null);
        var ticketList = await ApiProvider(Backend_EndPoint + "api/lottery/getPickData/", "GET",null);
        var scratcherNumbers = await ApiProvider(Backend_EndPoint + "api/lottery/getScratcherNumber/", "GET", null);
        var scratcherList = await ApiProvider(Backend_EndPoint + "api/lottery/getScratcherWinnerData/", "GET", null);
        
        dispatch({
            type: LOTTERY_W_J_T_S,
            payload: {
                lastWinningNumber: lastWinningNumber.payload.winingNumbers,
                jackpot: jackpot.payload[0],
                ticketList: ticketList.payload,
                scratcherNumbers: scratcherNumbers.payload.winingNumbers,
                scratcherList: scratcherList.payload,
            }
        });
    } catch (error) {
      dispatch({
        type: LOTTERY_ERROR,
        payload: error
      });
    };
  };
}
export function setWinnerNumber(numbers) {

    return async (dispatch, getState) => {
        try {
            var winningNumbers = await ApiProvider(Backend_EndPoint + "api/lottery/setWinnerNumber", "POST", {winningNumbers: numbers});
            dispatch({
                type: LOTTERY_UPDATE_WINNER,
                payload: {
                    lastWinningNumber: winningNumbers.payload.winingNumbers,
                }
            });        
        } catch (error) {
            dispatch({
                type: LOTTERY_ERROR,
                payload: error
            });
        };
    };
}

export function saveJackPot(id, value) {

    return async (dispatch, getState) => {
        try {
            await ApiProvider(Backend_EndPoint + "setJackpot", "POST", {id, value});
        } catch (error) {
            dispatch({
                type: LOTTERY_ERROR,
                payload: error
            });
        };
    };
}

export function setScratcherNumber(winingNumbers) {

    return async (dispatch, getState) => {
        try {
            await ApiProvider(Backend_EndPoint + "api/lottery/setScratcherNumber", "POST", {winingNumbers});
        } catch (error) {
            dispatch({
                type: LOTTERY_ERROR,
                payload: error
            });
        };
    };
}

