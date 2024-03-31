import { combineReducers } from '@reduxjs/toolkit';

import menu from './menu/menuToggle'
import userPost from './user/userPost'
import user from './user/user'
import validateToken from './user/validateToken'

const rootReducer = combineReducers({
  menu,
  userPost,
  user,
  validateToken,
});

export default rootReducer;
