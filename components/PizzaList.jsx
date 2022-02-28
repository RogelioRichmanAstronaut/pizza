import styles from "../styles/PizzaList.module.css"
import PizzaCard from "./PizzaCard";

const PizzaList = ({pizzaList}) => {
  return <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
          Yea, what the title say, this is your best opcion. In all the city if you are in searcho oc premium experience. In this company we use the best ingredients. Not just that, we create our pizzas with love, and patience who make a elit pizza.
      </p>
      <div className={styles.wrapper}>
          {pizzaList.map((pizza) =>(
              <PizzaCard key={pizza._id} pizza={pizza}/>
          ))}
      </div>
  </div>;
};

export default PizzaList;
