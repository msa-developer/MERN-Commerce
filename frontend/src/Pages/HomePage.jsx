import React from "react";
import useProduct from "../zustand/useProduct";
import ProductCard from "../Components/ProductCard";
import Nav from "../Components/Nav";
import LoadingScroll from "../Components/LoadingScroll.jsx";

const HomePage = () => {
  const { products, getProducts, searchingProduct } = useProduct();

  React.useEffect(() => {
    getProducts();
  }, []);

  if (searchingProduct) return <LoadingScroll />;

  return (
    <>
      <Nav />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center p-3">
        <div>
          {products.length > 0 &&
            products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
