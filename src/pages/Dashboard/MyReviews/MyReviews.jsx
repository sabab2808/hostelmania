import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaImage, FaTrashAlt } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GrUpdate } from "react-icons/gr";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const { data: myreviews = [], refetch } = useQuery({
    queryKey: ["myreviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myreviews/${user?.email}`);
      return res.data;
    },
  });
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
        axiosSecure.delete(`/myreviews/${id}`).then((res) => {
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
  const onSubmit = async (data) => {
    const review = {
      review: data.review,
    };
    const updatedReview = await axiosSecure.patch(
      `/myreviews/${data.id}`,
      review
    );
    if (updatedReview.data.modifiedCount > 0) {
      refetch();
      // Swal.fire({
      //   title: "Success!",
      //   text: "Successfully Updated",
      //   icon: "success",
      //   confirmButtonText: "Okay",
      // });
    }
    // fetch("https://trioeats-server.vercel.app/gallery", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     //   Swal.fire({
    //     //       title: 'Success!',
    //     //       text: 'Successfully Added',
    //     //       icon: 'success',
    //     //       confirmButtonText: 'Okay'
    //     //     })
    //   });
  };
  return (
    <div>
      <SectionTitle
        heading="My Reviews"
        subheading="Watch Your reviews by the users to the meals"
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
                  <th>Review</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>View Meal</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {myreviews.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.foodname}</td>
                    <td>{item.likes}</td>
                    <td>{item.review}</td>
                    <td>
                      <button
                        className="btn mt-2 bg-blue-500 text-white text-[12px] border-0"
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                      >
                        <GrUpdate className=" text-white"></GrUpdate> Update
                      </button>
                      <dialog id="my_modal_3" className="modal text-white">
                        <div className="modal-box bg-[#5289ff]">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-bold text-2xl mons mb-4">
                            Update Your Review
                          </h3>
                          <form
                            className="space-y-3"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <div>
                              <input
                                {...register("id", { required: true })}
                                defaultValue={item._id}
                                type="text"
                                hidden
                              />
                            </div>
                            <div>
                              <div className="label">
                                <span className="label-text font-semibold text-white">
                                  Review
                                </span>
                              </div>
                              <textarea
                                {...register("review", { required: true })}
                                type="text"
                                defaultValue={item.review}
                                className="grow w-full rounded-lg text-black bg-white border-0 p-2"
                                placeholder="Provide Your Updated Review Here"
                              ></textarea>
                              {errors.review && (
                                <span className="text-red-500">
                                  This field is required
                                </span>
                              )}
                            </div>
                            <button className="btn w-full text-white font-semibold bg-blue-800 border-0 hover:bg-blue-700">
                              Submit
                            </button>
                          </form>
                        </div>
                      </dialog>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost btn-lg"
                      >
                        <FaTrashAlt className="text-red-600 text-sm"></FaTrashAlt>
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/meal/${item.id}`}
                        className="btn bg-blue-500 btn-ghost text-[12px] text-white"
                      >
                        <GiChefToque className="text-white"></GiChefToque> View
                        Meal
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

export default MyReviews;
