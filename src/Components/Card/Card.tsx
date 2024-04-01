import { Link } from "react-router-dom";
import { productType } from "../../Pages/Admin/AddProduct";
import { useAppSelector } from "../../Redux/Store";
interface newProductType extends productType {
  id: string;
}
interface CardProps {
  item: Omit<newProductType, "description" | "time">;
}
export const Card = ({ item }: CardProps) => {
  const { mode } = useAppSelector((state) => state.Theme);
  return (
    <div className={`p-5 cursor-pointer text-center`}>
      <div className="h-[200px] pb-2">
        <Link to={`/productinfo/${item.id}`}>
          <img
            className="h-full w-full object-contain mx-auto"
            src={item.imageUrl}
            alt="img"
          />
        </Link>
      </div>
      <div className="py-2">
        <h1
          className="line-clamp-2 title-font text-sm font-semibold text-gray-900 mb-3"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          {item.title}
        </h1>
        <p
          className="leading-relaxed mb-3 text-lg font-bold"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          ₹ {item.price}
        </p>
      </div>
    </div>
  );
};
