import useProduct from "../zustand/useProduct";

const ProductCard = ({ product }) => {
  const { DelProduct, deleting } = useProduct();

  return (
    <div className="card bg-base-100 rounded-sm max-w-96 shadow-sm mx-auto border-secondary border">
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
            disabled={deleting}
          >
            {deleting ? (
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
