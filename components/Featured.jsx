import styles from "../styles/Featured.module.css"
import Image from "next/image"
import { useState } from "react";

const Featured = () => {
    const [index, setIndex] = useState(0)
    const images = [
        "/img/pizza.png",
        "/img/bg.png",
        "/img/bg.png",
    ];

    const handleArrow = (direction) =>{
        const tam = images.length
        if(direction==="l"){
            setIndex(index !== 0 ? index-1 : tam-1)
        }
        if(direction==="r"){
            setIndex(index !== tam-1 ? index+1 : 0)
        }
    }
  return <div className={styles.container}>
      <div className={styles.arrowContainer} onClick={()=>handleArrow("l")}>
        <Image src="/img/arrowl.png" alt="" layout='fill' objectFit="contain"/>
      </div>

      <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {images.map((img,i) => (
            <div className={styles.imgContainer} key={i}>
                <Image src={img} alt="" layout='fill' objectFit="contain"/>
            </div>
        ))}
      </div>
      <div className={styles.arrowContainer} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr.png" alt="" layout='fill' objectFit="contain"/>
      </div>
  </div>;
};

export default Featured;
