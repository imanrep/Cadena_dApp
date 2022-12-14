import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../comps/Header";
import token, { abi } from "../comps/web3/abi/token.js";
import { useEffect, useState } from "react";
import Web3 from "web3";

export default function Home({ p }) {
  // declaration
  const { address } = p;
  const [tokenDetail, setTokendetail] = useState([]);

  // get table data
  const getData = async () => {
    const web3 = new Web3(
      "https://rinkeby.infura.io/v3/2f85c22a29994320b52da33bec96968d"
    );
    const callContract = new web3.eth.Contract(
      abi,
      "0x2caCA806339b3240f19949de79278BA687d59E6f"
    );
    if(address){
        const [name, symbol, balance, owner, totalSupply, decimal] =
      await Promise.all([
        callContract.methods.name().call(),
        callContract.methods.symbol().call(),
        callContract.methods.balanceOf(address).call(),
        callContract.methods.owner().call(),
        callContract.methods.totalSupply().call(),
        callContract.methods.decimals().call(),
      ]);
      setTokendetail({ name, symbol, balance, owner, totalSupply, decimal });
    }else{
        const [name, symbol, owner, totalSupply, decimal] =
        await Promise.all([
          callContract.methods.name().call(),
          callContract.methods.symbol().call(), 
          callContract.methods.owner().call(),
          callContract.methods.totalSupply().call(),
          callContract.methods.decimals().call(),
        ]);
       const balance = 0
       setTokendetail({ name, symbol, balance, owner, totalSupply, decimal });
    }
  };

  useEffect(() => {
    getData();
  }, [address, tokenDetail]);
  return (
    <>
      <Header p={p} />
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            <a href="https://cadena.dev">Cadena.dev</a> Custom Token
          </h1>

          <p className={styles.description}>
            Project 2: Creating Your Own Meme Coin
          </p>

          <div className="tableForm" style={{width:'60%'}}>
            <div className="name">
              <p>Token Name : {tokenDetail.name}</p>
              <p>Token Symbol : {tokenDetail.symbol}</p>
              <p>Token Owner : {tokenDetail.owner}</p>
              <p>Token Total Supply : {tokenDetail.totalSupply / 10**tokenDetail.decimal} {tokenDetail.symbol}</p>
              <p>Token Decimal : {tokenDetail.decimal}</p>
              <p>Your Balance : {address ? `${tokenDetail.balance / 10**tokenDetail.decimal} ${tokenDetail.symbol}`  : 'Please Connect your wallet'}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
