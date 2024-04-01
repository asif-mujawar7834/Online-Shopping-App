import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig";
import { useAppDispatch } from "../../Redux/Store";
import { setLoading } from "../../Redux/LoadingSlice";
import { FormInputField } from "../../Components/FormFields/FormInputField";

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const signin = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      );
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Signin Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      window.location.href = "/";
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Sigin Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const inputFieldData = [
    {
      id: 1,
      name: "email",
      required: true,
      value: formValue.email,
      errorMessage: "It should be a valid email address!",
      type: "email",
      pattern:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      onChange: handleChange,
      placeholder: "Enter email address",
    },
    {
      id: 2,
      name: "password",
      required: true,
      value: formValue.password,
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!.",
      type: "password",
      onChange: handleChange,
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$`,
      placeholder: "Enter password",
    },
  ];

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" bg-gray-800 w-96 px-10 py-10 rounded-xl outline">
        <h1 className="text-center text-white text-2xl mb-4 font-bold">
          Login
        </h1>
        <form className="flex flex-col gap-6" onSubmit={signin}>
          <div className="flex flex-col gap-4">
            {inputFieldData.map((input) => {
              const { id, ...props } = input;
              return <FormInputField key={id} {...props} />;
            })}
          </div>
          <button className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg">
            Login
          </button>
        </form>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className=" text-yellow-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};
