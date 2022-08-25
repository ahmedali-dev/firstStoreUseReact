import React, { useRef, useState } from "react";
import Reload from "./reload";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productSlice";
import "./css/addItem.css";

const AddItem = () => {
  const [reload, setreload] = useState(false);
  const product = useSelector((state) => state.product);
  const dis = useDispatch();

  //get input data
  const Name = useRef();
  const Price = useRef();
  const Count = useRef();
  const Image = useRef();
  const ImageSlide = useRef();
  const addItem = () => {
    setreload(true);
    const data = {
      name: Name.current.value,
      price: Price.current.value,
      count: Count.current.value,
      image: Image.current,
      imageSlide: ImageSlide.current,
    };
    dis(addProduct(data));
    setTimeout(() => {
      setreload(false);
    }, 3000);
  };

  return (
    <div className="form">
      <div className="form_group">
        <h1>add item</h1>
      </div>

      <div className="form_group">
        <label htmlFor="name">name</label>
        <input ref={Name} className="form_input" type="text" name="name" />
      </div>
      <div className="form_group">
        <label htmlFor="name">price</label>
        <input ref={Price} className="form_input" type="text" name="price" />
      </div>
      <div className="form_group">
        <label htmlFor="name">count</label>
        <input ref={Count} className="form_input" type="text" name="count" />
      </div>
      <div className="form_group">
        <label htmlFor="image">image</label>
        <input
          ref={Image}
          className="form_input"
          id="image"
          type="file"
          name="image"
        />
      </div>
      <div className="form_group">
        <label htmlFor="imageSlider">image slider</label>
        <input
          className="form_input"
          type="file"
          id="imageSlider"
          multiple="multiple"
          name="slider"
          ref={ImageSlide}
        />
      </div>

      <div className="form_group">
        <button className="btn-addItem" onClick={() => addItem()}>
          {reload ? <Reload /> : "AddItem"}
        </button>
      </div>
    </div>
  );
};

export default AddItem;
