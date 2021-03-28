import Head from "next/head";
import path from "path";
import fs from "fs/promises";

const Home = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);

  if(!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }

  if(data.products.length === 0) {
    return {notFound: true}
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
};

export default Home;
