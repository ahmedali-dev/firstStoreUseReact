import React from "react";
import axios, { Axios } from "axios";
import { useState } from "react";

export default function Fetch(type) {
  const req = async (url, body) => {
    const data = await fetch(url, body);
    return await data.json();
  };

  if (type.name == "productall") {
    const form = new FormData();
    form.append("type", "all");
    return req("http://localhost:8080/getItem.php", form);
  }

  // return resp;
}

export const request = (url, data = {}) => {
  return fetch(url, data).then((res) => res.json());
};

export const addProducts = (data) => {
  const { name, price, count, image, imageSlide } = data;
  const form = new FormData();
  form.append("name", name);
  form.append("price", price);
  form.append("count", count);
  form.append("image", image.files[0]);
  for (let i = 0; i < imageSlide.files.length; i++) {
    form.append("imageSlide[]", imageSlide.files[i]);
  }

  return request("http://localhost:8080/addItem.php", {
    method: "post",
    body: form,
  });
};

// export const ProductAll = () => {
//   console.log(
//     Request2({
//       method: "post",
//       url: "http://localhost:8080/getItem.php",
//       body: form,
//     })
//   );
// };
