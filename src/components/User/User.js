/* eslint-disable react/button-has-type */
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'
import { useApi } from '../../custom/useApi'
import { KEY_FOR_TOKEN_API, GROUP_URL } from '../../utils/constant'
import stylesUser from './styles.module.css'

export function User() {
  const { dataUser, token } = useApi()
  const navigate = useNavigate()
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [])

  function submit() {
    localStorage.removeItem(KEY_FOR_TOKEN_API)
    localStorage.removeItem(GROUP_URL)
    navigate('/signin')
  }
  const {
    isLoading, error, data: user,
  } = useQuery({
    queryKey: ['repoData'],
    queryFn: dataUser,
  })

  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`

  return (
    <>
      <div><h2>Личный кабинет</h2></div>
      <div className={stylesUser.block}>
        <div className={stylesUser.avatar}><img src={user.avatar} alt="" /></div>
        <div className={stylesUser.value}>
          <p>
            Фамилия Имя :
            {' '}
            <span>{ user.name}</span>
          </p>
          <p>
            Тип :
            {' '}
            <span>{user.about}</span>
          </p>
          <p>
            группа :
            {' '}
            <span>{user.group}</span>
          </p>
          <p>
            email :
            {' '}
            <span>{user.email}</span>
          </p>
          <button onClick={() => submit()}>Выйти</button>
        </div>

      </div>
    </>
  )
}
