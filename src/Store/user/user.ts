import createAsyncSlice from 'Store/helper/createAsyncSlice'
import { POST_LOGIN } from 'Services/api'

const slice = createAsyncSlice({
  name: 'token',
  initialState: {
    data: {
      token: localStorage.getItem('access-token') || null,
      name: '',
      username: '',
      email: '',
      rule: 0,
      file: null
    }
  },
  reducers: {
    setDataUser(state: any, action: any) {
      state.data.name = action.payload.name;
      state.data.username = action.payload.username;
      state.data.email = action.payload.email;
      state.data.rule = action.payload.rule
    },
    updatePhoto(state: any, action: any) {
      state.data.file = action.payload.file
    }
  },
  fetchConfig: (dataForm: any) => POST_LOGIN(dataForm)
})

export const fetchLogin = slice.asyncAction;
export const { resetState: resetTokenState, setDataUser, updatePhoto } = slice.actions;

export default slice.reducer;