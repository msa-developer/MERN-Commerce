import { useGSAP } from "@gsap/react";
import useProduct from "../zustand/useProduct";
import gsap from "gsap";

const ProductCard = ({ product }) => {
  const { DelProduct, deleting } = useProduct();

  const deleteId = deleting;

  useGSAP(() => {
    gsap.timeline().from(".productCard", {
      opacity: 0,
      duration: 1,
      y: 200,
    });
  });

  return (
    <div className="productCard card bg-base-100 rounded-sm max-w-96 shadow-sm mx-auto border-secondary border">
      <figure>
        <img src={product.img} alt={product.name} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>${product.price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Update</button>
          <button
            className="btn btn-primary"
            onClick={() => DelProduct(product._id)}
            disabled={deleteId}
          >
            {deleteId ? (
              <>
                <span className="loading loading-spinner"></span>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
