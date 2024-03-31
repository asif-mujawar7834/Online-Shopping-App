import { doc, setDoc } from "firebase/firestore";
import { cartItemType } from "../../../Redux/CartSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store";
import { fireDB } from "../../../Firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { setLoading } from "../../../Redux/LoadingSlice";
import { ordersType, updateOrder } from "../../../Redux/OrdersSlice";

export const OrdersTable = () => {
  const { orders } = useAppSelector((state) => state.Orders);
  const { mode } = useAppSelector((state) => state.Theme);
  const dispatch = useAppDispatch();
  const changeStatus = async (
    item: ordersType,
    cartItems: cartItemType,
    status: string
  ) => {
    const id = item?.id;
    const newCartItems = item?.cartItems?.map((el) => {
      if (el?.id === cartItems.id) {
        return { ...el, status: status };
      }
      return el;
    });

    try {
      dispatch(setLoading(true));
      if (id) {
        await setDoc(doc(fireDB, "orders", id), {
          ...item,
          cartItems: newCartItems,
        });
        dispatch(updateOrder({ id, cartItems: newCartItems }));
        toast.success("Status Updated");
      }
    } catch (error) {
      toast.error("Something Went Wrong While Adding Product!.");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="m-5 overflow-hidden border border-black rounded-lg font-semibold">
      <section className="overflow-auto h-[80vh] rounded-lg">
        <table className="p-1 text-center">
          <thead>
            <tr className="text-white bg-[#2874f0] sticky top-0">
              <th scope="col" className="p-5 sticky top-0">
                Image
              </th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Count</th>
              <th scope="col">Category</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Pincode</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => {
              return item.cartItems.map((el) => (
                <tr className="border border-black">
                  <td
                    className="p-5 min-w-44 max-h-48"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    <img
                      className="h-auto object-contain mx-auto"
                      src={el.imageUrl}
                      alt="img"
                    />
                  </td>
                  <td
                    className="p-5 min-w-80"
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    {el.title}
                  </td>
                  <td
                    className="p-5 min-w-32"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    ₹ {el.price}
                  </td>
                  <td
                    className="p-5 min-w-32"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {el.count}
                  </td>
                  <td
                    className="p-5 min-w-32"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {el.category}
                  </td>
                  <td
                    className="p-5 min-w-44"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {item.addressInfo.name}
                  </td>
                  <td
                    className="p-5 min-w-48"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {item.addressInfo.address}
                  </td>
                  <td
                    className="p-5 min-w-32"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {item.addressInfo.pincode}
                  </td>
                  <td
                    className="p-5 min-w-44"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {item.addressInfo.phoneNumber}
                  </td>
                  <td
                    className="p-5 min-w-44"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {item.email}
                  </td>
                  <td
                    className="p-5 min-w-32"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {item.date}
                  </td>
                  <td
                    className="p-5 min-w-52"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    <select
                      className={`text-black border p-4 w-full rounded-md outline-0 focus:border-gray-500 text-sm ${
                        el.status === "order confirmed"
                          ? "bg-cyan-600 text-white"
                          : el.status === "out for delivery"
                          ? "bg-amber-400 text-white"
                          : "bg-lime-800 text-white"
                      }`}
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                      value={el.status}
                      onChange={(e) => {
                        changeStatus(item, el, e.target.value);
                      }}
                    >
                      <option value="order confirmed">Order Confirmed</option>
                      <option value="out for delivery">Out For Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};
