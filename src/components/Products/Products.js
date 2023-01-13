/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../custom/useApi'
import styles from './styles.module.css'

export function Products() {
  const { getAllProducts, token } = useApi()
  const navigate = useNavigate()

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!token) return navigate('/signin')
  }, [token])

  const {
    isLoading, error, data: products,
  } = useQuery({
    queryKey: ['getAllProducts'],
    queryFn: getAllProducts,
  })

  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`
  return (
    <>
      <h1>Каталог товаров</h1>
      <div className={styles.container}>
        { products.products?.map((product) => (
          (
            <div key={product._id} className={styles.block}>
              <img
                src={product.pictures}
                alt="описание"
              />
              <div>
                <h5>{product.price}</h5>
                <p>{product.name}</p>
              </div>
              <button>В корзину</button>
            </div>
          )

        )) }
      </div>
    </>
  )
}
