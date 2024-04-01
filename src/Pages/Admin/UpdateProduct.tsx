import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../Firebase/FirebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../Redux/LoadingSlice";
import { useAppDispatch } from "../../Redux/Store";
import { FormInputField } from "../../Components/FormFields/FormInputField";
import { updateProduct } from "../../Redux/AllProductsSlice";

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

  const addProduct = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      if (id) {
        await setDoc(doc(fireDB, "products", id), product);
        toast.success("Product Add successfully");
        navigate("/dashboard");
        dispatch(updateProduct({ ...product, id }));
        dispatch(setLoading(false));
      }
    } catch (error) {
      toast.error("Something Went Wrong While Adding Product!.");
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        if (id) {
          const docRef = doc(fireDB, "products", id);
          const docSnapshot = await getDoc(docRef);
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
      pattern: /[\S\s()]+[\S()]+/,
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
      pattern: "^[0-9]+$",
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
      pattern: /[\S\s()]+[\S()]+/,
      onChange: handleChange,
      placeholder: "Enter product description",
    },
  ];

  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-800 px-10 py-10 rounded-xl w-96">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Update Product
            </h1>
          </div>
          <form className="flex flex-col gap-6" onSubmit={addProduct}>
            <div className="flex flex-col gap-4">
              {inputFieldData.map((input) => (
                <FormInputField key={input.id} {...input} />
              ))}
            </div>
            <button className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
