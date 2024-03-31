import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { useAppSelector } from "../../Redux/Store";
import { DeliveryTrack } from "../../Components/DeliveryTrack/DeliveryTrack";

export const Orders = () => {
  const user = localStorage.getItem("user");
  const userid = user ? JSON.parse(user).user.uid : null;
  const { orders } = useAppSelector((state) => state.Orders);
  const { mode } = useAppSelector((state) => state.Theme);
  return (
    <Layout>
      {orders.length > 0 ? (
        <div className="mx-auto mt-5 max-w-3xl">
          {orders
            .filter((obj) => obj.userid == userid)
            .map((order) => {
              return order.cartItems.map((item) => {
                return (
                  <Link
                    to={`/productinfo/${item.id}`}
                    className="rounded-lg md:w-2/3 cursor-pointer"
                  >
                    <div
                      className="border border-black-100 justify-between mb-6 rounded-lg bg-white p-6 shadow-lg sm:flex sm:justify-start"
                      style={{
                        backgroundColor: mode === "dark" ? "#282c34" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <div>
                        <img
                          src={item.imageUrl}
                          alt="product-image"
                          className="max-h-auto rounded-lg sm:w-40 mx-auto"
                        />
                      </div>
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2
                            className="text-lg font-bold text-gray-900"
                            style={{
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            {item.title}
                          </h2>
                          <p
                            className="mt-1 text-xs text-gray-700 line-clamp-2"
                            style={{
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            {item.description}
                          </p>
                          <p
                            className="mt-1 text-lg text-gray-700 font-bold"
                            style={{
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            ₹ {item.price}
                          </p>
                          <div className="my-4">
                            <DeliveryTrack status={item.status} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              });
            })}
        </div>
      ) : (
        <h2 className=" text-center tex-2xl text-white">Not Order</h2>
      )}
    </Layout>
  );
};
