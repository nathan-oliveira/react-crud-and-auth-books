export const URL_API = 'http://localhost:3000/api'

export function POST_USER(formData: any) {
  return {
    url: `${URL_API}/auth/signup`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
      },
    }
  }
}

// profile
export function GET_PROFILE(token: any) {
  console.log('GET_PROFILE')
  return {
    url: `${URL_API}/profile`,
    options: {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    }
  }
}

export function PUT_PROFILE(formData: any, token: any) {
  console.log('PUT_PROFILE')
  return {
    url: `${URL_API}/profile`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(formData)
    }
  }
}

export function PATCH_PROFILE(formData: any, token: any) {
  console.log('PATCH_PROFILE')
  return {
    url: `${URL_API}/profile`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(formData)
    }
  }
}

export function PATCH_PROFILE_PHOTO({ file, token }: any) {
  console.log('PATCH_PROFILE_PHOTO')
  const formData = new FormData();
  formData.append('file', file);

  return {
    url: `${URL_API}/profile`,
    options: {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: formData,
    }
  }
}

export function GET_PROFILE_PHOTO(token: any) {
  console.log('GET_PROFILE_PHOTO')
  return {
    url: `${URL_API}/profile/photo`,
    options: {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
    }
  }
}

export * from './books'
