import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import {
  deleteFromCart,
  increaseDecreaseCartProductCount,
} from "../../Redux/CartSlice";
import Layout from "../../Components/Layout/Layout";
import { productType } from "../Admin/AddProduct";
import { Modal } from "../../Components/Modal/Modal";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

function Cart() {
  const { mode } = useAppSelector((state) => state.Theme);
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const totalAmount = cartItems.reduce(
    (acc, cur) => acc + parseInt(cur.price.replace(/,/g, ""), 10) * cur.count,
    0
  );

  const shipping = 100;
  const grandTotal = shipping + totalAmount;

  const deleteCart = (
    item: Omit<productType, "category" | "time" | "date">
  ) => {
    dispatch(deleteFromCart(item));
    toast.success("Product Deleted From Cart.");
  };

  return (
    <Layout>
      <div
        className=" bg-gray-100 pt-5"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        {cartItems.length > 0 ? (
          <>
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
              <div className="rounded-lg md:w-2/3 ">
                {cartItems.map((item) => {
                  return (
                    <div
                      className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <div>
                        <img
                          src={item.imageUrl}
                          alt="product-image"
                          className="max-h-auto mx-auto rounded-lg sm:w-40"
                        />
                      </div>
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2
                            className="text-lg font-bold text-gray-900"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {item.title}
                          </h2>
                          <h2
                            className="text-sm  text-gray-900"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {item.description}
                          </h2>
                          <div className="flex items-center justify-between mt-3">
                            <p
                              className="mt-1 text-lg font-bold text-gray-700"
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              ₹{item.price}
                            </p>
                            <div>
                              <button
                                className="p-2  rounded-full text-white bg-violet-600 hover:bg-violet-800"
                                disabled={item.count === 1}
                                onClick={() => {
                                  dispatch(
                                    increaseDecreaseCartProductCount({
                                      id: item.id,
                                      flag: false,
                                    })
                                  );
                                }}
                              >
                                <FaMinus />
                              </button>

                              <span className="font-bold mx-2">
                                {item.count}
                              </span>
                              <button
                                className="p-2  rounded-full text-white bg-violet-600 hover:bg-violet-800"
                                disabled={item.count === 10}
                                onClick={() => {
                                  dispatch(
                                    increaseDecreaseCartProductCount({
                                      id: item.id,
                                      flag: true,
                                    })
                                  );
                                }}
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={() => deleteCart(item)}
                          className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
                        >
                          <FaTrash className="text-red-500 rounded-sm h-7 w-7 p-1 border-red-500 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-6 mb-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                  color: mode === "dark" ? "white" : "",
                  position: "sticky",
                  top: "150px",
                }}
              >
                <div className="mb-2 flex justify-between">
                  <p
                    className="text-gray-700"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Subtotal
                  </p>
                  <p
                    className="text-gray-700"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    ₹{totalAmount}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p
                    className="text-gray-700"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Shipping
                  </p>
                  <p
                    className="text-gray-700"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    ₹{shipping}
                  </p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-3">
                  <p
                    className="text-lg font-bold"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Total
                  </p>
                  <div>
                    <p
                      className="mb-1 text-lg font-bold"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      ₹{grandTotal}
                    </p>
                  </div>
                </div>
                <Modal />
              </div>
            </div>
          </>
        ) : (
          <h1 className="mb-10 text-center text-2xl font-bold">
            No Products found in cart.
          </h1>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
