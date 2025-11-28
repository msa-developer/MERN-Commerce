import { useGSAP } from "@gsap/react";
import Nav from "../Components/Nav";
import gsap from "gsap";
import React from "react";
import useProduct from "../zustand/useProduct";
import { useNavigate } from "react-router";

const CreatePage = () => {
  const [data, setData] = React.useState({
    img: "",
    price: "",
    name: "",
  });
  useGSAP(() => {
    gsap.timeline().from("inputTitle", {
      x: 1,
      duration: 1,
    });
  });

  const { CreateProduct } = useProduct();

  const nav = useNavigate();

  return (
    <div>
      <Nav />
      <section className="p-3 m-3 max-w-900 ">
        <div className="card bg-base-100 shadow-sm lg:flex-row flex-col">
          <figure>{data.img ? <img src={data.img} /> : null}</figure>
          <div className="card-body">
            <input
              type="text"
              placeholder="url of Img"
              className="input input-lg w-full"
              value={data.img}
              onChange={(e) => setData({ ...data, img: e.target.value })}
            />

            <input
              type="text"
              placeholder="price of product"
              className="input input-lg w-full"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />

            <input
              type="text"
              placeholder="name of product"
              className="input input-lg w-full"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  const { success } = await CreateProduct(data);
                  if (success) nav("/");
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatePage;
