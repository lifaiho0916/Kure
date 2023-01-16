import { combineReducers } from 'redux';
import menu from './menu';
import products from './products';

const reducers = combineReducers({ menu, products });

export default reducers;
