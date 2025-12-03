import React from "react";
import useProduct from "../zustand/useProduct";
import ProductCard from "../Components/ProductCard";
import Nav from "../Components/Nav";
import LoadingScroll from "../Components/LoadingScroll.jsx";

const HomePage = () => {
  const { products, getProducts, searchingProduct } = useProduct();

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (searchingProduct) return <LoadingScroll />;

  return (
    <>
      <Nav />
      <main className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center p-3">
        {products?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </main>
    </>
  );
};

export default HomePage;
