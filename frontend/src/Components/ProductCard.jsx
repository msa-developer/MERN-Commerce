import { useGSAP } from "@gsap/react";
import useProduct from "../zustand/useProduct";
import gsap from "gsap";
import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { DelProduct, setSelectedProduct } = useProduct();
  const [deleting, setDeleting] = React.useState(false);

  const cardRef = React.useRef();

  useGSAP(() => {
    gsap.timeline().from(cardRef.current, {
      opacity: 0,
      duration: 0.4,
      y: 200,
    });
  });

  useGSAP(
    () => {
      if (deleting) {
        gsap.timeline().to(cardRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.4,
          onComplete: () => DelProduct(product._id),
        });
      }
    },
    { dependencies: [deleting] },
  );

  return (
    <div
      ref={cardRef}
      className="card bg-base-100 rounded-sm max-w-96 shadow-sm mx-auto border-secondary border"
    >
      <figure>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>${product.price}</p>
        <div className="card-actions justify-end">
          <Link to="/update">
            <button
              className="btn btn-primary"
              onClick={() => setSelectedProduct(product._id)}
            >
              Update
            </button>
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => setDeleting((prev) => !prev)}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
