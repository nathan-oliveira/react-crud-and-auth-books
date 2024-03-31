import { URL_API } from './api'

export function GET_BOOKS(token: any) {
  return {
    url: `${URL_API}/books`,
    options: {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    }
  }
}

export function POST_BOOK({ formData, token }: any) {
  return {
    url: `${URL_API}/books`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(formData)
    }
  }
}

export function PUT_BOOK({ id, formData, token }: any) {
  return {
    url: `${URL_API}/books/${id}`,
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

export function GET_BOOK_ID({ id, token }: any) {
  return {
    url: `${URL_API}/books/${id}`,
    options: {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    }
  }
}

export function DELETE_BOOK({ id, token }: any) {
  return {
    url: `${URL_API}/books/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      },
    }
  }
}
