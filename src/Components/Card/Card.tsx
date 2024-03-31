import { Link } from "react-router-dom";
import { productType } from "../../Pages/Admin/AddProduct";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { addToCart } from "../../Redux/CartSlice";
import { toast } from "react-toastify";
interface newProductType extends productType {
  id: string;
}
interface CardProps {
  item: Omit<newProductType, "description" | "time">;
}
export const Card = ({ item }: CardProps) => {
  const { mode } = useAppSelector((state) => state.Theme);
  const dispatch = useAppDispatch();
  const addCart = (product: Omit<productType, "description" | "time">) => {
    dispatch(addToCart({ ...product, count: 1 }));
    toast.success("Product Added To Cart.");
  };
  return (
    <div
      className={`border ${
        mode == "light" ? "border-black" : "border-white"
      } rounded-lg p-5 cursor-pointer`}
    >
      <div className="h-[300px] pb-2">
        <Link to={`/productinfo/${item?.id}`}>
          <img
            className="h-full w-full object-contain mx-auto"
            src={item.imageUrl}
            alt="img"
          />
        </Link>
      </div>
      <div className="py-2 border-t-2">
        <h2
          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          E-Bharat
        </h2>
        <h1
          className="line-clamp-2 title-font text-lg font-medium text-gray-900 mb-3"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          {item.title}
        </h1>
        <p
          className="leading-relaxed mb-3"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          ₹ {item.price}
        </p>
        <div className=" flex justify-center">
          <button
            onClick={() => addCart(item)}
            type="button"
            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
