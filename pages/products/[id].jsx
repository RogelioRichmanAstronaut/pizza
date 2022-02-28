import styles from "../../styles/Product.module.css"
import Image from "next/image"
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice"

const URL_PAGE = process.env.URL_PAGE

const Product = ({pizza}) => {
    const [priceplus, setPriceplus] = useState(0);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);
    const dispatch = useDispatch()

    const handleChange= (e,option) => {
        const checked = e.target.checked;
        if(checked){
            setPriceplus(priceplus + option.price);
            setExtras(prev=>[...prev,option]);
        }else{
            setPriceplus(priceplus - option.price );
            setExtras(extras.filter(extra=>extra._id !== option._id));
        }
    }
    const reduxClick = () => {
      const price = priceplus+pizza.prices[size]
      dispatch(addProduct({...pizza, extras, price, quantity}))
    }

  return (
  <div className={styles.container}>
      <div className={styles.left}>
          <div className={styles.imgContainer}>
              <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
          </div>
      </div>
      <div className={styles.right}>
          <h1 className={styles.title}>{pizza.title}</h1>
          <span className={styles.price} >${pizza.prices[size]+priceplus}</span>
          <p className={styles.desc}>{pizza.desc}</p>
          <h2 className={styles.choose}>Choose the size</h2>

          <div className={styles.sizes}>
            <div className={styles.size} onClick={()=>setSize(0)}>
                <Image src="/img/size.png" layout="fill" alt=""/>
                <span className={styles.number}>Small</span>
              </div>
            <div className={styles.size} onClick={()=>setSize(1)}>
                <Image src="/img/size.png" layout="fill" alt=""/>
                <span className={styles.number}>Medium</span>
              </div>
            <div className={styles.size} onClick={()=>setSize(2)}>
                <Image src="/img/size.png" layout="fill" alt=""/>
                <span className={styles.number}>Large</span>
              </div>
          </div>
          <h3 className={styles.choose}>Choose additional ingredients</h3>
          <div className={styles.ingredients}>
              {pizza.extraOptions.map(option =>(
                  <div key={option._id}> 
                  <div className={styles.option}>
                        <input
                        type="checkbox"
                        id={option.text}
                        name={option.text}
                        className={styles.checkbox}
                        onChange={(e)=>handleChange(e,option)}
                        />
                        <label htmlFor="double">{option.text}</label>
                    </div>
            </div>
                ))}
          </div>
          <div className={styles.add}>
              <input onChange={(e)=>setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
              <button className={styles.button} onClick={reduxClick}>Add to Cart</button>
          </div>
      </div>
  </div>);
};

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(URL_PAGE+`/api/products/${params.id}`)
    return {
      props:{
        pizza:res.data,
      }
    }
  }

export default Product;
