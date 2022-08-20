import '../styles/globals.css'
import Layout from '../comps/Layout'
import { useState } from 'react'
function MyApp(p) {
  const [address, setAddress] = useState()
  const [chain, setChain] = useState()
  const [blurAddress, setblurAddress] = useState()
  const [web3, setWeb3] = useState()

  const {Component} = p

   

  p = {
    address,
    setAddress,
    chain,
    setChain,
    blurAddress,
    setblurAddress,
    web3,
    setWeb3
  }
  return (
    <Layout {...p}>
      <Component/>
    </Layout>
  )
}

export default MyApp
