import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCart,
  updateCartCountInc,
  updateCartCountDec,
  TotalPrice,
} from "../redux/productSlice";
import "./css/product.css";
import { useState } from "react";
import { useMemo } from "react";

const Cart = () => {
  const { cart, cart_value, totalprice } = useSelector(
    (state) => state.product
  );
  const [totalPrice, settotalPrice] = useState(0);
  const dis = useDispatch();

  useEffect(() => {
    dis(getCart(cart));
  }, []);

  useMemo(() => {
    dis(TotalPrice());
  }, [cart_value]);

  return (
    <div className="product">
      <div className="cart-header">
        <div className="cart_totalPrice">
          <p className="totalPrice">
            Total: {totalprice}
            <span> EGB</span>
          </p>
        </div>
        <div className="btn-checkout">
          <Link to="/" className="cart-checkout">
            CheckOut
          </Link>
        </div>
      </div>

      <div className="row">
        {cart_value &&
          cart_value.map((post) => (
            <div className="product-card">
              <Link to={"/product/" + post.data.id} className="product-link">
                <div className="product-image">
                  <img src={`http://localhost:8080/image/${post.data.image}`} />
                </div>
                <div className="product-content">
                  <p className="product-title">{post.data.name}</p>

                  <h2 className="product-price">
                    {post.data.price} <span>EGB</span>
                  </h2>
                </div>
              </Link>

              <div className="button-action">
                <button
                  className="btn-dec"
                  onClick={() => {
                    console.log(dis(updateCartCountDec(post.data.id)));
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <p className="cart-item_number">{post.count}</p>

                <button
                  className="btn-inc"
                  onClick={() => {
                    dis(updateCartCountInc(post.data.id));
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Cart;
