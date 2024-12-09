import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllMeals = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: menu = [], refetch } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu");
      return res.data;
    },
  });

  const handleDelete = id => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/menu/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
        }
    });
}
  return (
    <div>
      <SectionTitle
        heading="All Meals"
        subheading="Manage all the foods, see details, update and delete the foods"
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
                  <th>Distributor Name</th>
                  <th>Update</th>
                  <th>Delete</th>
                  <th>View Meal</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {menu.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.foodname}</td>
                    <td>{item.like}</td>
                    <td>{item.reviews}</td>
                    <td>{item.name}</td>
                    <td>
                      <Link to={`/dashboard/update/${item._id}`}
                        className="btn btn-ghost btn-lg"
                      >
                        <GrUpdate className="text-blue-600 text-sm"></GrUpdate>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost btn-lg"
                      >
                        <FaTrashAlt className="text-blue-600 text-sm"></FaTrashAlt>
                      </button>
                    </td>
                    <td>
                      <Link to={`/meal/${item._id}`}
                        className="btn btn-ghost btn-lg"
                      >
                        <FaEye className="text-blue-600 text-sm"></FaEye>
                      </Link>
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

export default AllMeals;
