import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../Firebase/FirebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../Redux/LoadingSlice";
import { useAppDispatch } from "../../Redux/Store";

interface productType {
  title: string;
  price: string;
  imageUrl: string;
  category: string;
  description: string;
}

export const UpdateProduct = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState<productType>({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
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

    try {
      if (id) {
        await setDoc(doc(fireDB, "products", id), product);
        toast.success("Product Add successfully");
        navigate("/dashboard");
        dispatch(setLoading(false));
      }
    } catch (error) {
      toast.error("Something Went Wrong While Adding Product!.");
      dispatch(setLoading(false));
    }
    // setProduct(null);
  };

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        if (id) {
          const docRef = doc(fireDB, "products", id);
          const docSnapshot = await getDoc(docRef);
          // Check if document exists
          if (docSnapshot.exists()) {
            setProduct(docSnapshot.data() as productType);
          } else {
            throw new Error("");
          }
        }
      } catch (error) {
        toast.error("Invalid Product Id.");
      }
    };
    fetchProductById();
  }, []);

  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Update Product
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
              value={product.description}
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
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
