import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { redux } from 'ps-solution-library-ui-common';

import initialState from '../store/initialState';

// Redux reducers, all tile data shoulid be stored in the data property and ajaxLoading and form should be left untouched
const rootReducer = combineReducers({
	data: redux.reducers.configReducer(initialState.data),
	ajaxLoading: redux.reducers.ajaxLoadingReducer(initialState.ajaxLoading),
	form: formReducer
});

export default rootReducer;