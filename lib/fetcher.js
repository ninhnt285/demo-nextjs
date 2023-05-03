import { apiUrl } from '@/config'
import { getAuthHeader } from './auth'
import Router from 'next/router'

export async function sendRequest(url, method = 'GET', body = {}) {
  try {
    let options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      }
    }
    if (method != 'GET') {
      options.body = JSON.stringify(body)
    }
    const response = await fetch(apiUrl + url, options);
    if (response.status == 401) {
      if (Router.pathname != "/auth/login") {
        Router.push("/auth/login");
        return {};
      }
    }

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    throw err;
  }
}

export async function get(url) {
  const data = await sendRequest(url, 'GET', {})
  return data;
}