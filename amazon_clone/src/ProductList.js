import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
// import Button from 'react-bootstrap/Button'
import "./ProductList.css";
import { productList } from "./HomeData";
import parse from "html-react-parser";
import store from "./store";
import { NavLink } from "react-router-dom";
import { persistor } from "./store";
/**
 *
 * @param {string} props A subcateg that represents the type of the list of items.
 */
function ProductList(props) {
  const [productLists, setProducts] = useState([]);
  //the state signaling when to show the product list.
  const [showProductList, setShowProductList] = useState(false);
  const params = useParams();
  //pass the category of product to productList in order to get product info.
  const product = productList(params.id, params.subCategory);
  console.log(product);
  let products = Promise.resolve(product);

  function product_list(products) {
    console.log(products);
    return products;
  }

  useEffect(() => {
    products
      .then(product_list)
      .then((result) => {
        console.log(result);
        setProducts(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (productLists && productLists.length > 0) setShowProductList(true);
  }, [productLists]);

  const productListView = () => (
    <div className="container">
      <div className="leftBanner"></div>
      <div className="listContainer">
        <div className="row">
          {productLists.map((list, index) => (
            <div className={`product${list.detail.name.length < 5 ? " less-than-five" : ""}`}>
              <NavLink
                className={"navLink"}
                to={`./${index}`}
                state={{
                  id: index,
                  title: list.detail.name,
                }}
              >
                <Card className="card">
                  <Card.Img variant="top" src={list.detail.img} />
                  <Card.Body className="item_detail">
                    <Card.Title className="item_title">
                      {list.detail.name.length < 80
                        ? `${list.detail.name}`
                        : `${list.detail.name.substring(0, 76)}....`}
                    </Card.Title>
                    <Card.Text className="price">${list.detail.price}</Card.Text>
                    <div className="bottom"></div>
                    {/* <button className="addToCart_button" onClick={() => addToCart(list)}>
                        Add to Cart
                      </button> */}
                  </Card.Body>
                </Card>
              </NavLink>
            </div>
          ))}
          {/* (Invisible)Phantom items take up space to ensure that the product items
					 are left-aligned w/o leaving extra space on the rightmost.  */}
          {productLists &&
            Array(productLists.length)
              .fill(null)
              .map((_, index) => <div key={`phantom-${index}`} className="phantom"></div>)}
        </div>
      </div>
    </div>
  );
  // Call productListView only if the product list is resolved.
  return <div>{showProductList && productListView()}</div>;
}

export default ProductList;
