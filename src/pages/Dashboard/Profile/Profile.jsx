import { Chip } from "@material-tailwind/react";
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Profile = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const { data: fooditem = [] } = useQuery({
    queryKey: ["fooditem", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/fooditem/${user?.email}`);
      return data;
    },
  });
  const { data: client = [] } = useQuery({
    queryKey: ["client", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/${user?.email}`);
      return data;
    },
  });

  return (
    <div>
      <div className="flex justify-center items-center mt-[100px] lg:mt-[200px]">
        <div className="bg-white shadow-lg rounded-2xl w-full lg:w-3/5">
          <img
            alt="profile"
            src="https://i.ibb.co/myDQMxb/hostel3.jpg"
            className="w-full mb-4 rounded-t-lg h-36 object-cover"
          />
          <div className="flex flex-col items-center justify-center p-4 -mt-16">
            <a href="#" className="relative block">
              <img
                alt="profile"
                src={user?.photoURL}
                className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
              />
            </a>

            <p className="p-2 uppercase px-4 text-xs text-white bg-blue-500 rounded-full">
              {/* {role} */}
            </p>
            {/* <p className="mt-2 text-xl font-medium text-gray-800 ">
              User Id: {user?.uid}
            </p> */}
            <div className="w-full p-2 mt-4 rounded-lg">
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
                <p className="flex flex-col">
                  Name
                  <span className="font-bold text-black ">
                    {user?.displayName}
                  </span>
                </p>
                <p className="flex flex-col mt-3 lg:mt-0">
                  Email
                  <span className="font-bold text-black ">{user?.email}</span>
                </p>

                <div className="mt-3 lg:mt-0">
                  {isAdmin ? (
                    <div>
                      <p>Total Meals Added:</p>
                      <span className="font-bold text-black ">
                        {fooditem.length}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <p>Badge:</p>
                      <span className="font-bold text-black uppercase">
                        {client.badge}
                      </span>
                    </div>
                  )}
                  {/* <button className="bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1">
                    Update Profile
                  </button>
                  <button className="bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]">
                    Change Password
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
