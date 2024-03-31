import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store";
import { setLoading } from "../../../Redux/LoadingSlice";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../../Firebase/FirebaseConfig";
interface userType {
  name: string;
  email: string;
}
export const UsersTable = () => {
  const { mode } = useAppSelector((state) => state.Theme);
  const [users, setUsers] = useState<userType[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getUserData = async () => {
      dispatch(setLoading(true));
      try {
        const result = await getDocs(collection(fireDB, "users"));
        const usersArray: any = [];
        result.forEach((doc) => {
          usersArray.push(doc.data());
          setLoading(false);
        });
        setUsers(usersArray);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    getUserData();
  }, []);
  return (
    <div className="m-5 overflow-hidden border border-black rounded-lg font-semibold">
      <section className="overflow-auto h-[80vh] rounded-lg">
        <table className="p-1 text-center w-full">
          <thead>
            <tr className="text-white bg-[#2874f0] sticky top-0">
              <th scope="col" className="p-5 sticky top-0">
                Sr No
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((el, index) => (
              <tr className="border border-black">
                <td
                  className="p-5"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {index + 1}
                </td>
                <td
                  className="p-5"
                  style={{
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  {el.name}
                </td>
                <td
                  className="p-5 "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {el.email}
                </td>
                <td
                  className="p-5 "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
