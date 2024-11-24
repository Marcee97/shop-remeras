import { useContext, useEffect } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import ElContexto from '../context/ProductContext'


initMercadoPago('APP_USR-8bbdb623-3827-433f-b9bf-3f2192db0154');
export const WalletComponent = () => {


  const {preferenceId} = useContext(ElContexto)



  useEffect(()=> {
    if(preferenceId){

    }
  })
  console.log(preferenceId, 'preference el wallet')

  return (
    <>
    <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />

    </>
  )
}
