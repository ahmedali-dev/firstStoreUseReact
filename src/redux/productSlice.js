import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState, memo } from "react";
import Fetch, { addProducts, ProductAll } from "./fetch";
import axios from "axios";

export const getData = createAsyncThunk("porduct/getData", async () => {
  const form = new FormData();
  form.append("type", "all");
  const data = await fetch("http://localhost:8080/getItem.php", {
    method: "POST",
    body: form,
  });
  return await data.json();
});

export const getCart = createAsyncThunk("product/getCart", async (list) => {
  let f = new FormData();
  f.append("type", "list");
  f.append("list", JSON.stringify(list));
  const data = await fetch("http://localhost:8080/getItem.php", {
    method: "POST",
    body: f,
  });

  return await data.json();
});

export const PostsSlice = createSlice({
  name: "product",
  initialState: {
    posts: ["asdfas"],
    cart: [],
    cart_value: [],
    totalprice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      addProducts({
        name: action.payload.name,
        price: action.payload.price,
        count: action.payload.count,
        image: action.payload.image,
        imageSlide: action.payload.imageSlide,
      }).then((data) => {
        if (data.msg == "items add sucsessfuly") {
          //window.location.href = "/";
        } else {
          return false;
        }
      });
    },
    deleteProduct: (state, action) => {},
    updateProduct: (state, action) => {},

    //cart
    addCart: (state, action) => {
      if (!state.cart.includes(action.payload)) {
        state.cart.push(action.payload);
      }
    },

    //update cart count
    updateCartCountInc: (state, action) => {
      state.cart_value.map((c) => {
        if (c.data.id == action.payload) {
          if (c.count < 12) {
            c.count += 1;
            c.data.price = c.data.price * c.count;
          }
        }
      });
    },
    updateCartCountDec: (state, action) => {
      state.cart_value.map((c, i) => {
        if (c.data.id == action.payload) {
          if (c.count > 1) {
            c.data.price = c.data.price / c.count;
            c.count -= 1;
          }
        }
      });
    },

    TotalPrice: (state, action) => {
      let total = 0;
      state.cart_value.map((price) => {
        total += parseInt(price.data.price);
      });

      state.totalprice = total;
      console.log(state.totalprice);
    },
  },
  extraReducers: {
    [getData.pending]: (state) => {},
    [getData.fulfilled]: (state, action) => {
      state.posts = action.payload.data;
    },
    [getData.rejected]: (state) => {},

    //cart data
    [getCart.pending]: (state) => {},
    [getCart.fulfilled]: (state, action) => {
      state.cart_value = action.payload;
    },
    [getCart.rejected]: (state, action) => {},
  },
});

export const {
  addProduct,
  GetAllProducts,
  addCart,
  updateCartCountInc,
  updateCartCountDec,
  TotalPrice,
} = PostsSlice.actions;

export default PostsSlice.reducer;
