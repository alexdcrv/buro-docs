import { combineReducers } from 'redux';
import fileSystem from './fileSystem'
import dataOperations from './dataOperations'



export default combineReducers({
	fileSystem,
	dataOperations
});