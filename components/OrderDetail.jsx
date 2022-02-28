import { useState } from "react"
import styles from "../styles/OrderDetail.module.css"

const OrderDetail = ({total, createOrder}) => {
    const [customer, setCustomer] = useState("")
    const [address, setAddress] = useState("")

    const handleClick = () => {
      createOrder({customer, address, total, subtotal:0, discount:0, method:0})
    }
  return (
    <div className={styles.container} >
        <div className={styles.wrapper} >
            <h1 className={styles.title}>You will pay $12 after delivery in your direction.</h1>
            <h2 className={styles.subtitle}>Please fill the fields</h2>
            <div className={styles.item}>
                <label className={styles.label} >Name and Surname of person claiming order</label>
                <input placeholder="Juan Semanas" type="text" className={styles.input} onChange={(e)=>setCustomer(e.target.value)}/>
            </div>
            <div className={styles.item}>
                <label className={styles.label} >Phone Number</label>
                <input placeholder="+1 234 567 89" type="text" className={styles.input} onChange={(e)=>setCustomer(e.target.value)}/>
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Address</label>
              <textarea
                rows={5}
                placeholder="Elton St. 505 NY"
                type="text"
                className={styles.textarea}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button className={styles.button} onClick={handleClick}>
              Order
            </button>
        </div>
    </div>
  )
}

export default OrderDetail
