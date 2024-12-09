import { Chip } from "@material-tailwind/react";
import SectionTitle from "./../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const UserRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { data: requests = [], refetch } = useQuery({
        queryKey: ['requests', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/requests?email=${user?.email}`);
            return res.data;
        }
    })
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/requests/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <SectionTitle
        heading="Requested Meals"
        subheading="Manage all the foods that you have requested, delete and see details"
      ></SectionTitle>
      <div>
        <div className="mt-12 lg:mx-12">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead className="text-center text-blue-400">
                <tr className="">
                  <th></th>
                  <th>Title</th>
                  <th>Likes</th>
                  <th>Reviews</th>
                  <th>Status</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {requests.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.foodname}</td>
                    <td>{item.likes}</td>
                    <td>{item.reviews}</td>
                    <td>
                      {(item.status === "pending" && (
                        <Chip
                          className="uppercase bg-red-300 w-[150px] mx-auto"
                          value={item.status}
                        />
                      )) ||
                        (item.status === "delivered" && (
                          <Chip
                            color="green"
                            className="uppercase w-[150px] mx-auto"
                            value={item.status}
                          />
                        ))}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost btn-lg"
                      >
                        <FaTrashAlt className="text-blue-600 text-sm"></FaTrashAlt>
                      </button>
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

export default UserRequests;
