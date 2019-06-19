import { combineReducers } from 'redux';
import home from './home';
import lottery from './lottery';
import auction from './auction';

const rootReducer = combineReducers({
    home: home,
    lottery: lottery,
    auction: auction,
});
  
export default rootReducer;