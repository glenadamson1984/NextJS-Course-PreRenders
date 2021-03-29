import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = () => {
  const [sales, setSales] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);

  const { data, error } = useSWR(
    "https://nextjs-prerender-fundamentals-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    const transformedSales = [];

    for (let key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }

    setSales(transformedSales);
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-prerender-fundamentals-default-rtdb.firebaseio.com/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (let key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to Load....</p>;
  }

  if (!data || !sales) {
    return <p>Loading....</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSales;
