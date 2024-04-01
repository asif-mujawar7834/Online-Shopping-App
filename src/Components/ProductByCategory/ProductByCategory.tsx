import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useAppSelector } from "../../Redux/Store";
import { Card } from "../Card/Card";

export const ProductByCategory = () => {
  const { category } = useParams();
  const { mode } = useAppSelector((state) => state.Theme);
  const { allProductsList } = useAppSelector((state) => state.AllProducts);
  const productsByCategory = allProductsList.filter(
    (product) => product.category.toLocaleLowerCase() === category
  );
  return (
    <Layout>
      <div className="m-5">
        {productsByCategory.length > 0 ? (
          <div className="border border-slate-400 rounded-md">
            <div className="mb-5 text-center border border-b-slate-200 py-7">
              <h1
                className="sm:text-3xl text-3xl font-bold title-font mb-2 text-gray-900"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {category}
              </h1>
              <h3 className="text-lg text-slate-600">
                {productsByCategory.length} Items
              </h3>
            </div>
            <div className="grid gap-4 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
              {productsByCategory.map((item) => (
                <Card item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-blue-500 p-10">
            <h3 className="text-white text-3xl text-center">
              No Products found related to this category.
            </h3>
          </div>
        )}
      </div>
    </Layout>
  );
};
