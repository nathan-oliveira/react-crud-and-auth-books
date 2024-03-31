import createAsyncSlice from 'Store/helper/createAsyncSlice'
import { VALIDATE_TOKEN } from 'Services/api'

const slice = createAsyncSlice({
  name: 'validateToken',
  fetchConfig: (token: any) => VALIDATE_TOKEN(token)
})

export const validateToken = slice.asyncAction;
export const { fetchError: fetchErrorToken } = slice.actions;

export default slice.reducer;
