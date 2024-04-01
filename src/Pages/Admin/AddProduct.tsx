import { ChangeEvent, FormEvent, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../Redux/LoadingSlice";
import { useAppDispatch } from "../../Redux/Store";
import { addNewProduct } from "../../Redux/AllProductsSlice";
import { FormInputField } from "../../Components/FormFields/FormInputField";

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

  const addProduct = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const productRef = collection(fireDB, "products");

    try {
      await addDoc(productRef, product);
      toast.success("Product Add successfully");
      dispatch(addNewProduct(product));
      navigate("/");
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Something Went Wrong While Adding Product!.");
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const inputFieldData = [
    {
      id: 1,
      name: "title",
      required: true,
      value: product.title,
      errorMessage: "Enter valid product title",
      type: "text",
      pattern: /[\S\s]+[\S]+/,
      onChange: handleChange,
      placeholder: "Enter product title",
    },
    {
      id: 2,
      name: "price",
      required: true,
      value: product.price,
      errorMessage: "Enter valid price",
      type: "text",
      pattern:
        /(:?^|\s)(?=.)((?:0|(?:[1-9](?:\d*|\d{0,2}(?:,\d{3})*)))?(?:\.\d*[1-9])?)(?!\S)/,
      onChange: handleChange,
      placeholder: "Enter product price",
    },
    {
      id: 3,
      name: "imageUrl",
      required: true,
      value: product.imageUrl,
      errorMessage: "Enter valid image url",
      type: "text",
      onChange: handleChange,
      pattern:
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi,
      placeholder: "Enter product image url",
    },
    {
      id: 4,
      name: "category",
      required: true,
      value: product.category,
      errorMessage: "Enter valid product category",
      type: "text",
      onChange: handleChange,
      pattern: /^[\w]+([-_\s]{1}[a-z0-9]+)*$/i,
      placeholder: "Enter product category",
    },
    {
      id: 5,
      name: "description",
      required: true,
      value: product.description,
      errorMessage: "Enter valid product description",
      type: "text",
      pattern: /[\S\s]+[\S]+/,
      onChange: handleChange,
      placeholder: "Enter product description",
    },
  ];

  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <div className=" w-96 bg-gray-800 px-10 py-10 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Add Product
            </h1>
          </div>
          <form className="flex flex-col gap-6" onSubmit={addProduct}>
            <div className="flex flex-col gap-4">
              {inputFieldData.map((input) => (
                <FormInputField key={input.id} {...input} />
              ))}
            </div>
            <button className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
