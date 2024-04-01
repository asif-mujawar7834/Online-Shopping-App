import { Link } from "react-router-dom";
import { productCategories } from "../../utils/StaticData";
import { useAppSelector } from "../../Redux/Store";

export const Categories = () => {
  const { mode } = useAppSelector((state) => state.Theme);
  return (
    <div className="m-5 p-1 rounded-md border border-blue-500">
      <div className="mx-auto grid gap-16 lg:grid-cols-6 sm:grid-cols-3 xs:grid-cols-2 max-w-3xl my-7">
        {productCategories.map((category) => (
          <div className="text-center" key={category.id}>
            <Link to={category.link} className="h-[100px] w[80px] block">
              <img
                src={category.imageUrl}
                className="h-full w-full object-contain"
              />
            </Link>
            <h3
              className={`${
                mode === "light" ? "text-black" : "text-white"
              } font-bold mt-3`}
            >
              {category.label}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
