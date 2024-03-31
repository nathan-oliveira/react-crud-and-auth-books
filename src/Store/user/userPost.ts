import createAsyncSlice from 'Store/helper/createAsyncSlice'
import { POST_USER } from 'Services/api'
import { fetchLogin, resetTokenState, setDataUser } from './user'
import { validateToken, fetchErrorToken } from './validateToken'

const slice = createAsyncSlice({
  name: 'userPost',
  fetchConfig: (formData: any) => POST_USER(formData),
})

export const userPost = slice.asyncAction;

export const userLogin = (dataForm: any): any => async (dispatch: any) => {
  const { payload } = await dispatch(fetchLogin(dataForm))

  if (payload.token) {
    localStorage.setItem('access-token', payload.token)
    // localStorage.setItem('name', payload.name)
  }
}

export const userLogout = () => async (dispatch: any) => {
  dispatch(resetTokenState({
    token: null,
    name: '',
    username: '',
    email: '',
    rule: 0
  }))

  localStorage.clear();
}

export const verifyToken = (): any => async (dispatch: any, getState: any) => {
  const { user } = getState()

  if (user?.data?.token) {
    const { type, payload } = await dispatch(validateToken(user.data.token))
    
    if (type === fetchErrorToken.type) {
      await dispatch(userLogout());
    } else {
      await dispatch(setDataUser(payload))
    }
  }
}

export default slice.reducer;
