import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcRating } from "react-icons/fc";
import {
  MdDriveFileRenameOutline,
  MdFastfood,
  MdOutlineDescription,
  MdPublish,
  MdReviews,
} from "react-icons/md";
import { BiCategoryAlt, BiSolidLike } from "react-icons/bi";
import { IoTimeSharp } from "react-icons/io5";
import { SiCashapp } from "react-icons/si";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpcomingMeals = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: upcomingMeals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosPublic.get("/upcomingMeals");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        email: data.email,
        foodname: data.foodname,
        category: data.category,
        price: parseFloat(data.price),
        image: res.data.data.display_url,
        ingredients: data.ingredients,
        description: data.description,
        time: data.time,
        like: parseInt(data.like),
        reviews: parseInt(data.reviews),
        rating: parseInt(data.rating),
      };
      const menuRes = await axiosSecure.post("/upcomingMeals", menuItem);
      if (menuRes.data.insertedId) {
        reset();
        refetch();
        Swal.fire({
          title: "Success!",
          text: "Successfully Added",
          icon: "success",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  const handlePublish = async (item) => {
    if (item.like < 10) {
      Swal.fire({
        title: "Error!",
        text: "Minimum 10 Likes required",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } else {
      const menuItem = {
        name: item.name,
        email: item.email,
        foodname: item.foodname,
        category: item.category,
        price: item.price,
        image: item.image,
        ingredients: item.ingredients,
        description: item.description,
        time: item.time,
        like: item.like,
        reviews: item.reviews,
        rating: item.rating,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      if (menuRes.data.insertedId) {
        axiosSecure.delete(`/upcomingMeals/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: "Successfully Added",
              icon: "success",
              confirmButtonText: "Okay",
            });
          }
        });
      }
    }
  };

  const currentGetTime = () => {
    const now = new Date(Date.now());
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = hours.toString().padStart(2, "0");
    const strMinutes = minutes.toString().padStart(2, "0");
    const formattedTime = `${strHours}:${strMinutes}${ampm}`;
    return formattedTime;
  };
  return (
    <div>
      <SectionTitle
        heading="Upcoming Meals"
        subheading="All the upcoming meals will be shown here, add, publish and see likes count"
      ></SectionTitle>
      <div className="flex justify-center mt-4">
        <button
          className="btn mt-2 bg-blue-500 text-white text-[12px] border-0"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add Upcoming Meal
        </button>
        <dialog id="my_modal_3" className="modal text-white">
          <div className="modal-box bg-[#5289ff]">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-2xl text-center mons mb-4">
              Add Upcoming Meal
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="poppins mx-3 lg:mx-0"
            >
              <div className="flex flex-col gap-2 lg:gap-4 mb-3">
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Admin Name
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="text-[#5c7aff] w-4 h-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      defaultValue={user.displayName}
                      className="grow text-black"
                      placeholder="Username"
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Admin Email
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="text-[#5c7aff] w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      defaultValue={user.email}
                      className="grow text-black"
                      placeholder="User Email"
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:gap-4 mb-3">
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Food Name
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <MdDriveFileRenameOutline className="text-[#5c7aff]" />
                    <input
                      {...register("foodname", { required: true })}
                      type="text"
                      className="grow text-black"
                      placeholder="Food Name"
                    />
                    {errors.foodname && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Food Category
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <BiCategoryAlt className="text-[#5c7aff]" />
                    <select
                      {...register("category", { required: true })}
                      type="text"
                      className="grow text-black input-info bg-transparent border-0 outline-0 "
                      placeholder="Food Category"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                    </select>
                    {errors.category && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:gap-4 mb-3">
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Price
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <SiCashapp className="text-[#5c7aff]" />
                    <input
                      {...register("price", { required: true })}
                      type="text"
                      className="grow text-black"
                      placeholder="Price"
                    />
                    {errors.price && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Image
                    </span>
                  </div>
                  <label className="input flex items-center gap-2">
                    <input
                      type="file"
                      name="image"
                      {...register("image", { required: true })}
                      className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:bg-[#5271FF] file:text-white file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    "
                    />
                    {errors.image && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:gap-4 mb-3">
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Ingredients
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <MdFastfood className="text-[#5c7aff]" />
                    <input
                      {...register("ingredients", { required: true })}
                      type="text"
                      className="grow text-black"
                      placeholder="Ingredients"
                    />
                    {errors.ingredients && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Description
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <MdOutlineDescription className="text-[#5c7aff]"></MdOutlineDescription>
                    <input
                      {...register("description", { required: true })}
                      type="text"
                      className="grow text-black"
                      placeholder="Description"
                    />
                    {errors.description && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:gap-4 mb-3">
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Post Time
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <IoTimeSharp className="text-[#5c7aff]" />
                    <input
                      {...register("time", { required: true })}
                      type="text"
                      className="grow text-black"
                      defaultValue={currentGetTime()}
                      placeholder="Post Time"
                    />
                    {errors.time && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Likes
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <BiSolidLike className="text-[#5c7aff]"></BiSolidLike>
                    <input
                      {...register("like", { required: true })}
                      type="text"
                      className="grow text-black"
                      placeholder="Likes"
                    />
                    {errors.likes && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:gap-4 mb-3">
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Reviews
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <MdReviews className="text-[#5c7aff]" />
                    <input
                      {...register("reviews", { required: true })}
                      type="text"
                      className="grow text-black"
                      placeholder="Reviews"
                    />
                    {errors.reviews && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex-1">
                  <div className="label">
                    <span className="label-text font-semibold text-white">
                      Rating
                    </span>
                  </div>
                  <label className="input input-bordered border-[#5c7aff] flex items-center gap-2">
                    <FcRating className="text-[#5c7aff]"></FcRating>
                    <input
                      {...register("rating", { required: true })}
                      type="text"
                      className="grow text-black"
                      placeholder="Rating"
                    />
                    {errors.rating && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="mb-8"></div>
              <button className="btn w-full text-white font-semibold border-0 bg-[#4451e8]">
                Add Upcoming Meal
              </button>
            </form>
          </div>
        </dialog>
      </div>
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
                  <th>Publish Meal</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {upcomingMeals.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.foodname}</td>
                    <td>{item.like}</td>
                    <td>{item.reviews}</td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        onClick={() => handlePublish(item)}
                        className="btn btn-ghost bg-blue-400 text-white"
                      >
                        <MdPublish className=""></MdPublish>
                        <span className="text-sm">Publish</span>
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

export default UpcomingMeals;
