import React from "react";
import path from "path";
import fs from "fs/promises";

const ProductDetailPage = ({ loadedProduct }) => {
  if (!loadedProduct) {
    return <p>Loading.....</p>;
  }

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export const getStaticProps = async (context) => {
  const { params } = context;
  console.log(context);

  const productId = params.pid;

  const data = await getData();

  const result = data.products.find((product) => product.id === productId);

  if (!result) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: result,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const params = ids.map((id) => {
    return {
      params: {
        pid: id,
      },
    };
  });

  console.log(params);

  return {
    paths: params,
    fallback: true, //indicates the type of fallback, blocking true or false
  };
};

export default ProductDetailPage;
