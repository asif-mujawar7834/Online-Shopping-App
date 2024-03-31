import { useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../Redux/LoadingSlice";
import { useAppDispatch } from "../../Redux/Store";
import { addNewProduct } from "../../Redux/AllProductsSlice";

export interface productType {
  title: string;
  price: string;
  imageUrl: string;
  category: string;
  description: string;
  time: any | null;
  date: string | null;
}

export const AddProduct = () => {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<productType>({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const navigate = useNavigate();

  const addProduct = async () => {
    dispatch(setLoading(true));
    if (
      !product?.title ||
      !product?.imageUrl ||
      !product?.price ||
      !product?.category ||
      !product?.description
    ) {
      dispatch(setLoading(false));
      return toast.error("Please fill all fields");
    }
    const productRef = collection(fireDB, "products");

    try {
      await addDoc(productRef, product);
      toast.success("Product Add successfully");
      dispatch(addNewProduct(product));
      navigate("/");
      // getProductData();
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Something Went Wrong While Adding Product!.");
      dispatch(setLoading(false));
    }
    // setProduct(null);
  };

  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Add Product
            </h1>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              value={product?.title}
              name="title"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              value={product.price}
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product price"
            />
          </div>
          <div>
            <input
              type="text"
              name="imageurl"
              onChange={(e) =>
                setProduct({ ...product, imageUrl: e.target.value })
              }
              value={product.imageUrl}
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product imageUrl"
            />
          </div>
          <div>
            <input
              type="text"
              name="category"
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              value={product.category}
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product category"
            />
          </div>
          <div>
            <textarea
              cols={30}
              rows={10}
              name="description"
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            ></textarea>
          </div>
          <div className=" flex justify-center mb-3">
            <button
              onClick={addProduct}
              className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
