import React from "react";
import path from "path";
import fs from "fs/promises";

const ProductDetailPage = ({ loadedProduct }) => {
  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
};

export const getStaticProps = async (context) => {
    const { params } = context;
    console.log(context);

    const productId = params.pid;

    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData)
  
    const result = data.products.find(product => product.id === productId);

    return {
        props: {
            loadedProduct:result
        }
    }
    
}

export const getStaticPaths = async () => {

    return {
        paths: [
            { params: { pid: 'p1'}},
            { params: { pid: 'p2'}},
            { params: { pid: 'p3'}}
        ], //indicates that no page needs be created at build time
        fallback: false //indicates the type of fallback
    }
}

export default ProductDetailPage;
