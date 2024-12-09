import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";
import { Chip } from "@material-tailwind/react";
import { useState } from "react";

const Users = () => {
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const regex = /^([a-zA-Z\s.,'-]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchText}`);
      return res.data;
    },
  });
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if(regex.test(searchText)){
      setSearch(searchText);
    }
    else{
      Swal.fire({
        title: "Wrong Text!",
        text: "Your food has been delivered.",
        icon: "error",
      });
    }
    refetch();
  };
  return (
    <div>
      <SectionTitle
        heading="Manage Users"
        subheading="Manage all the users, see their subscription, make admin and details"
      ></SectionTitle>
      <div className="flex flex-col items-center mt-6">
        <p className="mb-2">Search by Username or Email</p>
        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg">
            <div className="join">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                className="input input-bordered join-item"
                type="text"
                name="search"
                placeholder="Enter UserName or Email"
                aria-label="Enter UserName"
              />
              <button className="btn text-white bg-blue-400 join-item">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <div className="mt-12 lg:mx-12">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead className="text-center text-blue-400">
                <tr className="">
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Make Admin</th>
                  <th>Subscription Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn px-6 py-2 bg-[#5271FF]"
                        >
                          <FaUsers
                            className="text-white 
                            text-xl"
                          ></FaUsers>
                        </button>
                      )}
                    </td>
                    <td>
                      {(user.badge === "bronze" && (
                        <Chip
                          className="w-[150px] mx-auto"
                          color="blue"
                          value={user.badge}
                        />
                      )) ||
                        (user.badge === "silver" && (
                          <Chip
                            className="w-[150px] mx-auto"
                            value={user.badge}
                          />
                        )) ||
                        (user.badge === "gold" && (
                          <Chip
                            className="w-[150px] mx-auto"
                            color="amber"
                            value={user.badge}
                          />
                        )) ||
                        (user.badge === "platinum" && (
                          <Chip
                            className="w-[150px] mx-auto"
                            color="cyan"
                            value={user.badge}
                          />
                        ))}
                    </td>
                    <td>
                      {/* <button
                        onClick={() => handleDeleteUser(user)}
                        className="btn btn-ghost btn-lg"
                      >
                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
