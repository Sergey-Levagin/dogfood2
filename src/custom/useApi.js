/* eslint-disable no-constant-condition */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KEY_FOR_TOKEN_API, URL_ADDRESS, GROUP_URL } from '../utils/constant'

export const useApi = () => {
  const navigate = useNavigate()
  const [group, setGroup] = useState(JSON.parse(localStorage.getItem(GROUP_URL)))
  const [token, setToken] = useState(JSON.parse(localStorage.getItem(KEY_FOR_TOKEN_API)))

  useEffect(() => {
    setGroup(JSON.parse(localStorage.getItem(GROUP_URL)))
  }, [JSON.parse(localStorage.getItem(GROUP_URL))])

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem(KEY_FOR_TOKEN_API)))
  }, [JSON.parse(localStorage.getItem(KEY_FOR_TOKEN_API))])

  async function signUp(data) {
    const response = await fetch(`${URL_ADDRESS}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    try {
      if (response.status === 201) {
        alert('Вы успешно зарегистрировались')
        navigate('/signin')
      } else if (response.status === 409 || 400) {
        throw new SyntaxError(res.message)
      } else {
        throw SyntaxError('Ошибка сервера')
      }
    } catch (error) {
      alert(error)
    }
  }

  async function dataUser() {
    const response = await fetch(`${URL_ADDRESS}v2/${group}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })

    const res = await response.json()
    try {
      if (response.status === 200) {
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      alert(error)
      return res
    }
  }

  async function signIn(values) {
    const response = await fetch(`${URL_ADDRESS}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        localStorage.setItem(KEY_FOR_TOKEN_API, JSON.stringify(res.token))
        navigate('/products')
        alert('Вход успешно выполнен')
      } else if (response.status === 401 || 404) {
        throw new SyntaxError(res.message)
      } else {
        throw SyntaxError('Ошибка сервера')
      }
    } catch (error) {
      alert(error)
    }
  }

  async function getAllProducts() {
    const response = await fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      alert(error)
      return res
    }
  }

  return {
    signUp,
    signIn,
    dataUser,
    getAllProducts,
    token,
  }
}
