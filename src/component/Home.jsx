import React, { useLayoutEffect } from "react";
import Reload from "./reload";
import { Link } from "react-router-dom";
import "./css/product.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, getData } from "../redux/productSlice";
import { useEffect } from "react";

const Home = () => {
  const [reload, setreload] = useState(false);

  //get state
  const { posts } = useSelector((state) => state.product);
  const dis = useDispatch();
  console.log(posts);

  useLayoutEffect(() => {
    dis(getData());
  }, []);

  return (
    <div className="product container">
      <div className="row">
        {posts.map((post) => (
          <div className="product-card">
            <Link to={"/product/" + post.id} className="product-link">
              <div className="product-image">
                <img src={`http://localhost:8080/image/${post.image}`} />
              </div>
              <div className="product-content">
                <p className="product-title">{post.name}</p>

                <h2 className="product-price">
                  {post.price} <span>EGB</span>
                </h2>
              </div>
            </Link>

            <div className="addCart">
              <button
                className="btn-addCart"
                onClick={(e) => {
                  dis(addCart(post.id));
                }}
              >
                addCart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;

//ntbdtliwsfgrs@arxxwalls.com
// ntbdtliwsfgrsA1#
