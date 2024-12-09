import { Link, useLoaderData, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { StickyNavbar } from "./../../components/Navbar/Navbar";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@material-tailwind/react";
import { BiSolidLike } from "react-icons/bi";
import useAuth from "./../../hooks/useAuth";
import { GiMeal } from "react-icons/gi";
import { FcAlarmClock, FcRating } from "react-icons/fc";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
const MealDetails = () => {
  // const meal = useLoaderData();
  // const {foodname, name, description, ingredients, time, rating, like, reviews} = meal;
  // console.log(meal)
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/${user?.email}`);
      return data;
    },
  });

  const {
    data: menu = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["menu", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/menu/${id}`);
      return data;
    },
  });

  const {
    _id,
    foodname,
    image,
    name,
    description,
    ingredients,
    time,
    rating,
    like,
    reviews,
  } = menu;

  const onSubmit = async (data) => {
    const review = {
      id: _id,
      email: user.email,
      foodname: foodname,
      likes: like,
      review_count: reviews,
      review: data.review,
    };
    const reviewRes = await axiosPublic.post("/review", review);
    if (reviewRes.data.insertedId) {
      reset();
      refetch();
      Swal.fire({
        title: "Success!",
        text: "Successfully Added",
        icon: "success",
        confirmButtonText: "Okay",
      });
    }
  };

  const incrementLike = async (id) => {
    const likeCount = axiosPublic.patch(`/like/${id}`, menu).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  const handleMealRequest = async (item) => {
    if (users.badge === "bronze") {
      Swal.fire({
        title: "Error!",
        text: "Please Upgrade to any package!",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } else {
      const requestedMeal = {
        name: user.displayName,
        email: user.email,
        likes: item.like,
        reviews: item.reviews,
        foodname: item.foodname,
        status: "pending",
      };
      const mealReq = await axiosPublic.post(`/mealrequest`, requestedMeal);
      if (mealReq.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Successfully Requested",
          icon: "success",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  return (
    <div className="container mx-auto">
      <StickyNavbar></StickyNavbar>
      <div className="my-12 mx-3 lg:mx-0">
        <figure className="relative h-96 w-full">
          <img
            className="h-full w-full rounded-xl object-cover object-center"
            src={image}
            alt="nature image"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div>
              <Typography
                variant="h5"
                className="text-2xl font-bold"
                color="blue-gray"
              >
                {foodname}
              </Typography>
              <Typography color="gray" className="mt-2 font-normal">
                Distributor: {name}
              </Typography>
            </div>
          </figcaption>
        </figure>
        <div className="mt-12 flex flex-col lg:flex-row justify-between">
          <div className="flex-1">
            <p className="text-lg font-bold mb-2">
              Description: <span className="font-normal">{description}</span>
            </p>
            <p className="text-lg font-bold">
              Ingredients: <span className="font-normal">{ingredients}</span>
            </p>
          </div>
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row mt-4 lg:mt-0 space-y-3 lg:space-y-0 justify-between">
              <p className="text-lg font-bold flex items-center gap-2">
                <FcAlarmClock></FcAlarmClock>Post Time: {time}
              </p>
              <p className="text-lg font-bold flex items-center gap-2  text-blue-400">
                <BiSolidLike></BiSolidLike> Likes: {like}
              </p>
              <p className="text-lg flex items-center gap-2 font-bold text-blue-400">
                <FcRating></FcRating> Ratings: {rating}
              </p>
            </div>
            {user ? (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    incrementLike(_id);
                  }}
                  className="btn flex-1 bg-blue-600 text-white"
                >
                  <BiSolidLike></BiSolidLike>Like
                </button>
                <button
                  onClick={() => handleMealRequest(menu)}
                  className="btn flex-1 bg-green-600 text-white"
                >
                  <GiMeal></GiMeal>Meal Request
                </button>
              </div>
            ) : (
              <div className="mt-3 flex gap-2">
                <Link
                  to={"/login"}
                  className="btn flex-1 bg-blue-600 text-white"
                >
                  <BiSolidLike></BiSolidLike>Like
                </Link>
                <Link
                  to={"/login"}
                  className="btn flex-1 bg-green-600 text-white"
                >
                  <GiMeal></GiMeal>Meal Request
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="mt-12">
          <div className="text-center text-blue-500">
            <h3 className="text-2xl font-bold">REVIEWS: {reviews}</h3>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                {...register("review", { required: true })}
                className="textarea w-full textarea-bordered mt-6 h-24"
                placeholder="Write your review here"
              ></textarea>
              <div className="text-center mt-3">
                <input
                  className="btn text-white btn-wide bg-blue-500"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MealDetails;
