import { combineReducers } from 'redux';
import fileSystem from './fileSystem'
import dataOperations from './dataOperations'
import auth from './auth'



export default combineReducers({
	fileSystem,
	dataOperations,
	auth
});