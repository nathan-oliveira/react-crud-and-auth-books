import { savedLanguage } from 'I18n'

export const URL_API = 'http://localhost:3000/api'

export function POST_SIGNUP(formData: any) {
  return {
    url: `${URL_API}/auth/signup`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Lang': savedLanguage
      },
      body: JSON.stringify(formData)
    }
  }
}

export function POST_LOGIN(formData: any) {
  return {
    url: `${URL_API}/auth/login`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Lang': savedLanguage
      },
      body: JSON.stringify(formData)
    }
  }
}

export function POST_LOGOUT(formData: any) {
  return {
    url: `${URL_API}/auth/logout`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Lang': savedLanguage
      },
      body: JSON.stringify(formData)
    }
  }
}

export function VALIDATE_TOKEN(token: any) {
  return {
    url: `${URL_API}/profile`,
    options: {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'X-Lang': savedLanguage
      },
    }
  }
}

// profile
export function GET_PROFILE(token: any) {
  return {
    url: `${URL_API}/profile`,
    options: {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'X-Lang': savedLanguage
      },
    }
  }
}

export function DELETE_PHOTO_PROFILE({ token }: any) {
  return {
    url: `${URL_API}/profile/photo`,
    options: {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
        'X-Lang': savedLanguage
      },
    }
  }
}


export function PUT_PROFILE(formData: any, token: any) {
  return {
    url: `${URL_API}/profile`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'X-Lang': savedLanguage
      },
      body: JSON.stringify(formData)
    }
  }
}

export function PATCH_PROFILE(formData: any, token: any) {
  return {
    url: `${URL_API}/profile`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'X-Lang': savedLanguage
      },
      body: JSON.stringify(formData)
    }
  }
}

export function PATCH_PROFILE_PHOTO({ file, token }: any) {
  const formData = new FormData();
  formData.append('file', file);

  return {
    url: `${URL_API}/profile`,
    options: {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'X-Lang': savedLanguage
      },
      body: formData,
    }
  }
}

export function GET_PROFILE_PHOTO(token: any) {
  return {
    url: `${URL_API}/profile/photo`,
    options: {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'X-Lang': savedLanguage
      },
    }
  }
}

export * from './books'
export * from './users'