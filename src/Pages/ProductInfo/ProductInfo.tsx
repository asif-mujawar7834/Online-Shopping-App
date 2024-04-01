import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { useEffect, useState } from "react";
import { setLoading } from "../../Redux/LoadingSlice";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";
import { productType } from "../Admin/AddProduct";
import { toast } from "react-toastify";
import { addToCart } from "../../Redux/CartSlice";

export const ProductInfo = () => {
  const [product, setProduct] = useState<productType>();
  const { mode } = useAppSelector((state) => state.Theme);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const getProductData = async () => {
    dispatch(setLoading(true));
    try {
      if (id) {
        const productTemp = await getDoc(doc(fireDB, "products", id));
        setProduct(productTemp.data() as productType);
        dispatch(setLoading(false));
      }
    } catch (error) {
      toast.error("Something Went Wrong.!");
      dispatch(setLoading(false));
    }
  };

  const addCart = (product: Omit<productType, "description" | "time">) => {
    dispatch(addToCart({ ...product, count: 1 }));
    toast.success("Product Added To Cart.");
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap relative divide-x-1">
            <div className="lg:w-1/3 sticky top-0 p-5 h-[400px] border border-slate-400 rounded-md">
              <img
                alt="ecommerce"
                className="h-full w-full object-contain"
                src={product?.imageUrl}
              />
            </div>
            <div className="lg:w-2/3 w-full lg:px-10 lg:py-6 mt-6 lg:mt-0">
              <h1
                className={`${
                  mode === "light" ? "text-gray-900" : "text-white"
                } text-3xl title-font font-medium mb-1`}
              >
                {product?.title}
              </h1>
              <p
                className={`${
                  mode === "light" ? "text-gray-900" : "text-slate-300"
                } leading-relaxed border-b-2 mb-5 pb-5`}
              >
                {product?.description}
              </p>

              <div className="flex">
                <span
                  className={`${
                    mode === "light" ? "text-gray-900" : "text-white"
                  } title-font font-medium text-2xl`}
                >
                  ₹ {product?.price}
                </span>
              </div>
              <div className="grid gap-2 mt-5 sm:grid-cols-2">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-[#fb641b] focus:ring-4 focus:ring-purple-300 font-semibold rounded-lg text-lg py-4 px-20"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => addCart(product as productType)}
                  type="button"
                  className="focus:outline-none text-white bg-[#ff9f00] focus:ring-4 focus:ring-purple-300 font-semibold rounded-lg text-lg py-4 px-20"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
