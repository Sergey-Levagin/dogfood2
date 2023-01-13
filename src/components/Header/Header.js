/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Search } from './search.svg'
import { ReactComponent as Xmark } from './xmark-solid.svg'
import { ReactComponent as Cart } from './cart-shopping.svg'
import { ReactComponent as Favourite } from './heart-solid.svg'
import { ReactComponent as UserIkon } from './user-solid.svg'
import stylesHeader from './styles.module.css'

export function Header() {
  const [text, setText] = useState('')
  const submit = () => {
    console.log(text)
  }
  const clear = () => {
    setText('')
  }

  return (
    <header className={stylesHeader.header}>
      <div className={stylesHeader.header__start}>
        <img className={stylesHeader.logo} src="logo-dog.png" alt="logo" />
        <Link to="products"><h2>DogFood</h2></Link>
      </div>
      <div className={stylesHeader.header__search}>
        <input placeholder="Поиск..." value={text} onChange={(e) => setText(e.target.value)} type="text" />
        <button>
          { text ? (
            <>
              <Xmark onClick={clear} />
              {' '}
              <Search onClick={submit} />
            </>
          ) : <Search onClick={submit} />}
        </button>
      </div>
      <div className={stylesHeader.header__end}>
        <ul>
          <li>
            <Link to="/"><Favourite /></Link>
          </li>
          <li>
            <Link to="/"><Cart /></Link>
          </li>
          <li>
            <Link to="/user"><UserIkon /></Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
