import Layout from "../../../Components/Layout/Layout";
import { DashboardTab } from "./DashboardTab";
import { useAppSelector } from "../../../Redux/Store";
import { FaUser, FaShoppingBag, FaBox } from "react-icons/fa";
export const Dashboard = () => {
  const { allProductsList } = useAppSelector((state) => state.AllProducts);
  const { orders } = useAppSelector((state) => state.Orders);
  const { mode } = useAppSelector((state) => state.Theme);

  const cards = [
    {
      id: 1,
      icon: (
        <FaBox className="mx-auto text-white h-[80px] w-[80px] border  p-2 bg-[#fb641b] rounded-md" />
      ),
      label: "Total Products",
      count: allProductsList.length,
    },
    {
      id: 2,
      icon: (
        <FaShoppingBag className="mx-auto text-white h-[80px] w-[80px] border  p-2 bg-[#ff9f00] rounded-md" />
      ),
      label: "Orders",
      count: orders.length,
    },
    {
      id: 3,
      icon: (
        <FaUser className="mx-auto text-white h-[80px] w-[80px] border  p-2 bg-[#2874f0] rounded-md" />
      ),
      label: "Total Users",
      count: 2,
    },
  ];
  return (
    <Layout>
      <div className="grid gap-4 p-5 lg:grid-cols-3 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            className={`border ${
              mode === "light" ? "border-black" : "border-white"
            } p-5 rounded-md text-center`}
          >
            {card.icon}
            <span className="font-bold text-3xl text-slate-700">
              {card.count}
            </span>
            <h3 className="font-bold text-xl text-slate-500">{card.label}</h3>
          </div>
        ))}
      </div>
      <DashboardTab />
    </Layout>
  );
};
