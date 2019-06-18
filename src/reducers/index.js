import { combineReducers } from 'redux';
import home from './home';
import lottery from './lottery';

const rootReducer = combineReducers({
    home: home,
    lottery: lottery,
});
  
export default rootReducer;