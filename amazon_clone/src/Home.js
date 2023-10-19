import React, { useEffect, useState } from "react";
import "./Home.css";
import { Product, Product2 } from "./Product";
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  doc,
  collectionGroup,
  connectFirestoreEmulator,
} from "firebase/firestore";
// import db from './firebase/index'
import HomeData from "./HomeData";

function Home({ homeProduct }) {
  console.log(homeProduct);
  let homeProducts = Promise.resolve(homeProduct);
  console.log(homeProducts);
  const [product, setProduct] = useState([]);
  // useEffect(() => {
  // 	setProduct(homeProducts)
  // }, []);

  function home_product(homeProducts) {
    console.log(homeProducts);
    return homeProducts;
  }

  homeProducts.then(home_product).then((result) => {
    console.log(result);
    setProduct(result);
  });

  console.log(product);
  try {
    console.log(product[1][0]);
  } catch (error) {
    console.log(error);
  }

  let topLeftItem_img = [];
  let topRightItem_img = [];
  const topLeftItem_title = ["Computer mice", "Headsets", "Keyboards", "Laptop"];
  const topRightItem_title = ["Mascara", "Lipstick", "Moisturizer", "Skin Serum"];

  let index = 0;
  for (var i = 0; i < product.length; i++) {
    console.log(i, product[i]);
    if (i <= 3) topLeftItem_img[i] = product[i].detail.img;
    else topRightItem_img[index++] = product[i].detail.img;
  }
  console.log(topRightItem_img);
  //HARDCODED ITEMS ON THE BOTTOM OF THE PAGE.
  const product2_images = [
    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Headset_1x._SY116_CB667159060_.jpg",
    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Keyboard_1x._SY116_CB667159063_.jpg",
    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Mouse_1x._SY116_CB667159063_.jpg",
    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Chair_1x._SY116_CB667159060_.jpg",
  ];
  const product2_title = [];
  const product2_price = [];

  return (
    <div className="home">
      <div className="home_container">
        <img
          src="https://m.media-amazon.com/images/I/61-8rBAD68L._SX3000_.jpg"
          alt=""
          className="home_background"
        />
        <div className="home_row">
          {/* pass the fetched data from Cloud Firestore to the Product component. */}
          <Product title={topLeftItem_title} img={topLeftItem_img} />
          <Product title={topRightItem_title} img={topRightItem_img} />
        </div>
        <div className="home_row">
          <Product2
            title="Dresses"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2022/February/DashboardCards/Fuji_dash_dress_1X._SY304_CB626369146_.jpg"
          />
          <Product2
            title="Electronics"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg"
          />
          <Product2
            title="Electronics"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg"
          />
        </div>
        <div className="home_row"></div>
      </div>
    </div>
  );
}

export default Home;
