import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store";
import { FaTrash, FaPen } from "react-icons/fa";
import { setLoading } from "../../../Redux/LoadingSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../../Firebase/FirebaseConfig";
import { toast } from "react-toastify";
export const ProductsTable = () => {
  const { allProductsList } = useAppSelector((state) => state.AllProducts);
  const { mode } = useAppSelector((state) => state.Theme);
  const dispatch = useAppDispatch();
  const deleteProduct = async (id: string) => {
    try {
      dispatch(setLoading(true));
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("Product Deleted successfully");
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  return (
    <div
      className={`m-5 overflow-hidden border ${
        mode === "light" ? "border-black" : "border-white"
      } rounded-lg font-semibold`}
    >
      <section className="overflow-auto h-[80vh] rounded-lg">
        <table className="p-1 text-center w-full">
          <thead>
            <tr className="text-white bg-[#2874f0] sticky top-0">
              <th scope="col" className="p-5">
                S.No
              </th>
              <th scope="col" className="p-5">
                Image
              </th>
              <th scope="col" className="p-5">
                Title
              </th>
              <th scope="col" className="p-5">
                Price
              </th>
              <th scope="col" className="p-5">
                Category
              </th>
              <th scope="col" className="p-5">
                Date
              </th>
              <th scope="col" className="p-5">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allProductsList.map((el, index) => (
              <tr
                key={el.id}
                className={`border ${
                  mode === "light" ? "border-black" : "border-white"
                }`}
              >
                <td
                  className="p-5"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {index + 1}
                </td>
                <td
                  className="p-5 min-w-40 max-h-48"
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
                  {el.category}
                </td>
                <td
                  className="p-5 min-w-44"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {el.date}
                </td>
                <td
                  className="p-5 min-w-32 text-xl"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  <button
                    className="text-red-500 mr-3 border border-red-500 p-2 rounded-full"
                    onClick={() => deleteProduct(el.id)}
                  >
                    <FaTrash />
                  </button>
                  <Link to={`/updateproduct/${el.id}`}>
                    <button
                      className={`p-2 rounded-full border ${
                        mode === "light" ? "border-black" : "border-white"
                      }`}
                    >
                      <FaPen />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
