import { useAppSelector } from "../../../Redux/Store";
interface TableProps {
  data: any[];
  headers: string[];
}

export const Table = ({ data, headers }: TableProps) => {
  const { mode } = useAppSelector((state) => state.Theme);
  return (
    <div className="m-10 overflow-hidden border border-black rounded-lg font-semibold">
      <section className="overflow-auto h-[80vh] rounded-lg">
        <table className="p-1 text-center">
          <thead>
            <tr className="text-white bg-sky-600 sticky top-0">
              {headers.map((item) => (
                <th scope="col" className="p-5">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          {/* <tbody>
            {orders.map((item) => {
              return item.cartItems.map((el) => (
                <tr className="border border-black">
                  <td
                    className="p-5 min-w-64"
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
                      className={`text-black border p-4 w-full rounded-md outline-0 focus:border-gray-500 focus:bg-white focus:text-black focus:ring-0 text-sm ${
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
                    >
                      <option value="order confirmed">Order Confirmed</option>
                      <option value="out for delivery">Out For Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ));
            })}
          </tbody> */}
        </table>
      </section>
    </div>
  );
};
