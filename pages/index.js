import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import AddButton from '../components/AddButton'
import Add from '../components/Add'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'

const URL_PAGE = process.env.URL_PAGE

export default function Home({pizzaList, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Dubai</title>
        <meta name="description" content="Best pizza shop in city" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />

      {admin && <AddButton setClose={setClose}/>}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}
//fetch our data with next js, javascript fech or axios, axios bro
//axios is an awesome library that you can use ip request's
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN){
    admin = true;
  }

  const res = await axios.get(URL_PAGE+"/api/products");
  return {
    props:{
      pizzaList:res.data,
      admin
    }
  }
}