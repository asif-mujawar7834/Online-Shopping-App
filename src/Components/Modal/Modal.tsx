import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { FormInputField } from "../FormFields/FormInputField";
import { addOrder } from "../../Redux/OrdersSlice";

const defaultState = {
  name: "",
  phoneNumber: "",
  address: "",
  pincode: "",
};

export const Modal = () => {
  const [addressInfo, setAddressInfo] = useState(defaultState);
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setAddressInfo(defaultState);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const orderInfo = {
      cartItems: cartItems.map((el) => ({ ...el, status: "order confirmed" })),
      addressInfo,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      email: user ? JSON.parse(user).user.email : null,
      userid: user ? JSON.parse(user).user.uid : null,
    };
    try {
      addDoc(collection(fireDB, "orders"), orderInfo);
      dispatch(addOrder(orderInfo));
      toast.success("Order Placed Successfully.!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Something Went Wrong.!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    closeModal();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressInfo((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const inputFieldData = [
    {
      id: 1,
      name: "name",
      required: true,
      value: addressInfo.name,
      errorMessage: "Enter valid name!",
      label: "Full Name",
      type: "text",
      pattern: /^[a-zA-Z\s-]+$/,
      onChange: handleChange,
      placeholder: "Enter Your Full Name",
    },
    {
      id: 2,
      name: "phoneNumber",
      required: true,
      label: "Phone Number",
      value: addressInfo.phoneNumber,
      errorMessage: "Enter valid phone number.",
      type: "number",
      onChange: handleChange,
      pattern: "^(+d{1,2}s?)?1?-?.?s?(?d{3})?[s.-]?d{3}[s.-]?d{4}$",
      placeholder: "Enter phone number",
    },
    {
      id: 3,
      name: "pincode",
      required: true,
      label: "Area Pincode",
      value: addressInfo.pincode,
      errorMessage: "Enter pincode.",
      type: "number",
      onChange: handleChange,
      pattern: /^[1-9][0-9]{5}$/gm,
      placeholder: "Enter area pincode",
    },
    {
      id: 4,
      name: "address",
      required: true,
      label: "Phone Number",
      value: addressInfo.address,
      errorMessage: "Enter valid phone number.",
      type: "text",
      onChange: handleChange,
      pattern: /^[a-zA-Z0-9\s,.'-]{3,}$/,
      placeholder: "Enter address",
    },
  ];

  return (
    <>
      <div className="  text-center rounded-lg text-white font-bold">
        <button
          type="button"
          onClick={openModal}
          className="w-full bg-violet-600 py-2 text-center rounded-lg text-white font-bold"
        >
          Buy Now
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2  text-left align-middle shadow-xl transition-all bg-gray-50">
                  <section className="">
                    <div className="flex flex-col items-center justify-center py-8 mx-auto  lg:py-0">
                      <div className="w-full  rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                          >
                            <div className="flex flex-col gap-4">
                              {inputFieldData.map((input) => {
                                const { id, ...props } = input;
                                return <FormInputField key={id} {...props} />;
                              })}
                            </div>
                            <button
                              type="submit"
                              className="focus:outline-none w-full text-white bg-violet-600 hover:bg-violet-800  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 "
                            >
                              Order Now
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
