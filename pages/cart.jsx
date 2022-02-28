import styles from "../styles/Cart.module.css"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";

const URL_PAGE = process.env.URL_PAGE

const Cart = () => {
    const cart = useSelector((state)=>state.cart)
    const [open, setOpen] = useState(false)
    const [cash, setCash] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()

    const createOrder = async (data) =>{
        try{
            const res = await axios.post(URL_PAGE+"/api/orders",data)
            res.status === 201 && router.push("/orders/"+res.data._id)
            dispatch(reset());
        }catch(err){
            console.log(err)
        }
    }

    //-PAYPAL-
    // This values are the props in the UI
    const amount = cart.total;
    const currency = "USD";
    const style = {"layout":"vertical"};
    //-PAYPAL-



    //-------paypal---------
    // Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({ customer: shipping.name.full_name, address:shipping.address.address_line_1, total: (cart.total*1.12).toFixed(2), subtotal: cart.total,discount: 0, method: 1 })
                    });
                }}
            />
        </>
    );
}
    //-------paypal---------


  return (
    <div className={styles.container} >
      <div className={styles.left}>
          <table className={styles.table}>
              <tbody>
                <tr className={styles.trTitle}>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
              </tbody>

              {cart.products.map(product =>(
                  <tbody key={product._id}> 
                    <tr className={styles.tr}>
                        <td>
                            <div className={styles.imgContainer}>
                                <Image
                                    src={product.img}
                                    layout="fill"
                                    objectFit="cover"
                                    alt=""
                                    />
                            </div>
                        </td>
                        <td>
                            <span className={styles.name}>{product.title}</span>
                        </td>
                        <td>
                            <span className={styles.extras}>
                                {product.extraOptions.map((extra)=>(
                                    <span key={extra._id}>{extra.text} ,</span>
                                    ))}
                            </span>
                        </td>
                        <td>
                            <span className={styles.price}>{product.price}</span>
                        </td>
                        <td>
                            <span className={styles.quantity}>{product.quantity}</span>
                        </td>
                        <td>
                            <span className={styles.total}>${product.price*product.quantity}</span>
                        </td>
                    </tr>
                 </tbody>
                ))}

          </table>
      </div>
      <div className={styles.right}>
          <div className={styles.wrapper}>
              <h2 className={styles.title}>CART TOTAL</h2>
              <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
              </div>
              <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>IVA:</b>${cart.total*0.12}
              </div>
              <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Discount:</b>$0.00
              </div>
              <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Total:</b>${(cart.total*1.12).toFixed(2)}
              </div>
              {open ? (
                  <div className={styles.paymentMethods}>
                      <button className={styles.payCash} onClick={() => setCash(true)}>CASH ON DELIVERY</button>

                        {/* /* -------------PAYPAL------------ */ }
                            <PayPalScriptProvider
                                options={{
                                    "client-id": "Af8fbXahInn-o4dH9fnet7CpQlU60HloByA_sGbb6vgSsSGxdqcwj6_TgW_Z3lctDPuowNp_xdjgUjej",
                                    components: "buttons",
                                    currency: "COP",
                                    "disable-funding": "card",
                                }}
                            >
                                <ButtonWrapper
                                    currency={currency}
                                    showSpinner={false}
                                />
                            </PayPalScriptProvider>
                            {/* /* /* -------------PAYPAL------------ */}
                            
                    </div>
            ) : (
                  <button onClick={() => setOpen(true)} className={styles.button} >CHECKOUT NOW!</button>
                  )}
              

          </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  )
}

export default Cart
