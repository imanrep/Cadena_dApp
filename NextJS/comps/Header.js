import { useState, useEffect } from "react";
import { connectAccount, checkLogin } from "./web3/connect";
import Link from 'next/link'

export default function Header({ p }) {
    const [walletModal, setWalletModal] = useState(false)
    const [connected, setConnected] = useState(false)
    const { setAddress, blurAddress, setblurAddress, setChain, setWeb3 } = p
    const [bAddress, setbAddress] = useState()

    function blur(x) {
        const f = x.substring(0, 6) + "..." + x.substring(x.length - 4)
        return f
    }
    useEffect(() => {
        checkLogin().then((r) => {
            if (r.status) {
                setConnected(true)
                connectAccount(r.provider).then((result) => {
                    setAddress(result.address)
                    setChain(result.chainId)
                    setblurAddress(blur(result.address))
                    setWeb3(result.web3)

                })
            }

        })
    })
    function connect(x) {

        connectAccount(x).then((result) => {
            setAddress(result.address)
            setChain(result.chainId)
            setblurAddress(blur(result.address))
            setWeb3(result.web3)
        })
    }
    return (
        <>
            <div className="header">
                <div className="content">
                <div className="head-left">

               <Link href="/">
               <p>Home</p>
               </Link>
               <Link href="/token">
               <p>Asep Token</p>
               </Link>
           </div>
                    <div className="connect pointer" onClick={() => !connected && setWalletModal(!walletModal)}><span>{connected ? blurAddress : "Connect"}</span></div>
                </div>
            </div>

            {walletModal && (
                <div className="modal-bg">
                    <div className="modal-container">
                        <div className="modal-wallet">
                            <button className="close pointer" onClick={() => setWalletModal(!walletModal)}>X</button>
                            <h4 className="title">
                                Connect your wallet
                            </h4>
                            <p className="text"> Choose Provider</p>
                            <div className="wallet pointer" onClick={() => connect('metamask')}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png?20201112074605" />
                                <span>Metamask</span>
                            </div>
                            <div className="wallet pointer" onClick={() => connect('walletconnect')}>
                                <img src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png" />

                                <span>Wallet Connect</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
} 