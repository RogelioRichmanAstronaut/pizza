import Image from "next/image";
import styles from "../styles/Footer.module.css"



const Footer = () => {
  return (
  <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" layout="fill" objectFit="cover" alt="background image"/>
      </div>
      <div className={styles.item}>
        <div className={styles.intento}>
          <div className={styles.intento2}>

        <div className={styles.card}>
          <h2 className={styles.motto}>
            YES HERE, AND ONLY HERE DI TALI PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND YOUR CLOSE RESTAURANT</h1>
          <p className={styles.text}>
            World Headquarters
            <br /> Cleveland, OH 44114
            <br /> 216-881-0015
          </p>
          <p className={styles.text}>
            California
            <br /> 13137 Artic Circle
            <br /> 562-356-5414
          </p>
          <p className={styles.text}>
            Florida
            <br /> Doral, FL 33178
            <br /> 305-863-6650
          </p>
          <p className={styles.text}>
            Texas
            <br /> Suite 200
            <br /> 281-645-7168
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 - 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 - 24:00
          </p>
        </div>
          </div>
        </div>
      </div>
      
  </div>);
};

export default Footer;
