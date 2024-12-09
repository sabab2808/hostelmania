import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const UpcomingCard = ({ item }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { _id } = item;
  const [mealLike, setMealLike] = useState(false);
  const [status, setStatus] = useState("");
  const { data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/${user?.email}`);
      return data;
    },
  });

  const { data: upcomingMeal = [], refetch } = useQuery({
    queryKey: ["upcomingMeals", _id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/upcomingMeals/${_id}`);
      return data;
    },
  });

  const { foodname, image, rating, price, like, description } = upcomingMeal;

  const incrementLike = async (id) => {
    setMealLike(true);
    const likeCount = axiosPublic
      .patch(`/upcomingLike/${id}`, upcomingMeal)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
        }
      });
  };

  return (
    <div>
      <Card className="w-full max-w-[26rem] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img
            src={image}
            className="h-[250px] w-full"
            alt="ui/ux review check"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {foodname}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center gap-1.5 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-5 w-5 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              {rating}
            </Typography>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              ${price}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center gap-1.5 font-normal"
            >
              <BiSolidLike className="text-blue-500"></BiSolidLike>
              {like}
            </Typography>
          </div>

          <Typography color="gray">{description}</Typography>
        </CardBody>
        <CardFooter className="pt-3">
          {user ? (
            users.badge == "bronze" ? (
              <button
                disabled
                onClick={() => {
                  incrementLike(_id);
                }}
                className="bg-blue-400 btn w-full text-white"
              >
                <BiLike></BiLike> Like
              </button>
            ) : mealLike ? (
              <button
                disabled
                onClick={() => {
                  incrementLike(_id);
                }}
                className="bg-blue-400 btn w-full text-white"
              >
                <BiLike></BiLike> Like
              </button>
            ) : (
              <button
                onClick={() => {
                  incrementLike(_id);
                }}
                className="bg-blue-400 btn w-full text-white"
              >
                <BiLike></BiLike> Like
              </button>
            )
          ) : (
            <button
              disabled
              onClick={() => {
                incrementLike(_id);
              }}
              className="bg-blue-400 btn w-full text-white"
            >
              <BiLike></BiLike> Like
            </button>
          )}
          {/* {mealLike ? (
            <button disabled
              onClick={() => {
                incrementLike(_id);
              }}
              className="bg-blue-400 btn w-full text-white check"
            >
              <BiLike></BiLike> Like
            </button>
          ) : (
            <button
              onClick={() => {
                incrementLike(_id);
              }}
              className="bg-blue-400 btn w-full text-white"
            >
              <BiLike></BiLike> Like
            </button>
          )} */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpcomingCard;
