import { savedLanguage } from 'I18n'
import { URL_API } from './api'

export function GET_USERS(token: any) {
  return {
    url: `${URL_API}/users`,
    options: {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'X-Lang': savedLanguage
      },
    }
  }
}
