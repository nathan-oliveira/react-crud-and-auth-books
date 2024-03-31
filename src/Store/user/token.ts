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
      foto: '',
      rule: 0
    }
  },
  reducers: {
    setDataUser(state: any, action: any) {
      state.data.name = action.payload.name;
      state.data.username = action.payload.username;
      state.data.email = action.payload.email;
      state.data.foto = action.payload.foto;
      state.data.rule = action.payload.rule
    },
    // updateFoto(state: any, action: any) {
    //   state.data.foto = action.payload.foto
    // }
  },
  fetchConfig: (dataForm: any) => POST_LOGIN(dataForm)
})

export const fetchLogin = slice.asyncAction;
export const { resetState: resetTokenState, setDataUser, updateFoto } = slice.actions;

export default slice.reducer;