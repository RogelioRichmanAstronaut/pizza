import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Add from "../../components/Add";
import AddButton from "../../components/AddButton";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products, admin }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];
  const router = useRouter();
  const [close, setClose] = useState(true);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "https://pizzadani.netlify.app/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orders.filter((order) => order._id === id)[0];
    //filter returns an array so we just need first item
    const currentStatus = item.status;
    if (currentStatus !== 2) {
      try {
        const res = await axios.put(
          "https://pizzadani.netlify.app/api/orders/" + id,
          {
            status: currentStatus + 1,
          }
        );
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
        router.reload(window.location.pathname);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const desHandleStatus = async (id) => {
    const item = orders.filter((order) => order._id === id)[0];
    //filter returns an array so we just need first item
    const currentStatus = item.status;
    if (currentStatus !== 0) {
      try {
        const res = await axios.put(
          "https://pizzadani.netlify.app/api/orders/" + id,
          {
            status: currentStatus - 1,
          }
        );
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
        router.reload(window.location.pathname);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {admin && <AddButton setClose={setClose} />}
        <h2 className={styles.title}>
          when you add or delete a product, it will be reflected in principal
          page about 5min aprox...(while the static page is generated)
        </h2>
        {!close && <Add setClose={setClose} />}
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    onClick={() => desHandleStatus(order._id)}
                    className={styles.button}
                  >
                    Prev Stage
                  </button>
                  <button
                    onClick={() => handleStatus(order._id)}
                    className={styles.button}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productRes = await axios.get(
    "https://pizzadani.netlify.app/api/products"
  );
  const orderRes = await axios.get("https://pizzadani.netlify.app/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
      admin,
    },
  };
};

export default Index;
