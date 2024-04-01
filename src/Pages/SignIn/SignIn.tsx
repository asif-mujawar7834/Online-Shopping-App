import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import { setLoading } from "../../Redux/LoadingSlice";
import { useAppDispatch } from "../../Redux/Store";
import { FormInputField } from "../../Components/FormFields/FormInputField";

export const Signup = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };

      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);
      toast.success("Signup Succesfully");
      setName("");
      setEmail("");
      setPassword("");
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Something Went Wrong.!");
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
    <div className="flex justify-center items-center h-screen">
      <div className=" bg-gray-800 w-96 px-10 py-10 rounded-xl ">
        <h1 className="text-center text-white text-2xl mb-4 font-bold">
          Signup
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSignup}>
          {inputFieldData.map((input) => (
            <FormInputField key={input.id} {...input} />
          ))}
          <button className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg">
            Signup
          </button>
        </form>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-red-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};
