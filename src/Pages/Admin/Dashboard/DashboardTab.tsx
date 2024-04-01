import { OrdersTable } from "./OrdersTable";
import { UsersTable } from "./UsersTable";
import { ProductsTable } from "./ProductsTable";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../Redux/Store";
export const DashboardTab = () => {
  const { mode } = useAppSelector((state) => state.Theme);
  const [tab, setTab] = useState(0);

  const components = [
    {
      id: 0,
      component: <ProductsTable />,
    },
    {
      id: 1,
      component: <OrdersTable />,
    },
    {
      id: 2,
      component: <UsersTable />,
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mx-5">
        <div
          className={`${
            mode === "light" ? "text-black" : "text-white"
          } border border-slate-400 rounded-md inline-flex font-bold`}
        >
          <button
            className={`px-5 py-3 ${
              tab === 0 && "bg-[#2874f0] text-white font-bold rounded-md"
            }`}
            value={0}
            onClick={() => setTab(0)}
          >
            Products
          </button>
          <button
            className={`px-5 py-3 ${
              tab === 1 && "bg-[#2874f0] text-white font-bold rounded-md"
            }`}
            onClick={() => setTab(1)}
          >
            Orders
          </button>
          <button
            className={`px-5 py-3 ${
              tab === 2 && "bg-[#2874f0] text-white font-bold rounded-md"
            }`}
            onClick={() => setTab(2)}
          >
            Users
          </button>
        </div>
        <Link to={"/addproduct"}>
          <button className="bg-[#fb641b] px-5 py-3 text-white font-bold rounded-md">
            Add New Product
          </button>
        </Link>
      </div>
      {components.find((item) => item.id === tab)?.component}
    </div>
  );
};
