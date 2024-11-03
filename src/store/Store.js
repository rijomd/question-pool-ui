import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from '../modules/auth/reducer/AuthReducer';
import homeReducer from '../modules/home/reducer/HomeReducer';
import userReducer from '../modules/user/reducer/UserReducer';
import jobReducer from '../modules/job/reducer/JobReducer';
import questionReducer from '../modules/question/reducer/QuestionReducer';

const combinedReducer = combineReducers({
    home: homeReducer,
    auth: authReducer,
    user: userReducer,
    job: jobReducer,
    question: questionReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer
});
