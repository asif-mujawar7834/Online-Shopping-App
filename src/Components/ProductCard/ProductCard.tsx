import { useAppSelector } from "../../Redux/Store";
import { Card } from "../Card/Card";

export const ProductCard = () => {
  const { allProductsList } = useAppSelector((state) => state.AllProducts);
  const { mode } = useAppSelector((state) => state.Theme);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="grid gap-4 p-5 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
          {allProductsList.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};
