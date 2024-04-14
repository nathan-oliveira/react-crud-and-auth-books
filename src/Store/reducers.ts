import { combineReducers } from '@reduxjs/toolkit';

import menu from './menu/menuToggle'
import ui from './ui'
import auth from './user/auth'
import user from './user/user'
import validateToken from './user/validateToken'


const rootReducer = combineReducers({
  menu,
  ui,
  auth,
  user,
  validateToken,
});

export default rootReducer;
