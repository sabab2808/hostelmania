import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { StickyNavbar } from "../../components/Navbar/Navbar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { login, googleLogin, user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  //   useEffect(() => {
  //     if (user) {
  //       navigate("/");
  //     }
  //   }, [navigate, user]);
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then(() => {
        Swal.fire({
          title: "Logged In!",
          text: "You have successfully Logged In",
          icon: "success",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Logged In!",
          text: "Your email or password didn't matched",
          icon: "error",
        });
        // toast.error("Your email or password didn't matched!");
      });
  };
  const googleUserLogin = () => {
    googleLogin()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          image: result.user?.photoURL,
          badge: "bronze"
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          Swal.fire({
            title: "Logged In!",
            text: "You have successfully Logged In",
            icon: "success",
          });
          navigate(location?.state ? location.state : "/");
        });
      })
      .catch(() => {
        toast.error("Please Try Again!");
      });
  };
  // if (user || loading) return
  return (
    <div className="container mx-auto">
      <StickyNavbar></StickyNavbar>
      <div className="my-24 flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-96">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid w-full h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <div className="form-control ml-8">
            <label className="input flex items-center gap-1 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="text-[#5271FF] w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter Email Address"
                className="input w-full border-0 hover:border-0 focus:border-0"
              />
            </label>
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control ml-8">
            <label className="input flex items-center gap-1 mb-6">
              <RiLockPasswordFill className="text-[#5271FF]"></RiLockPasswordFill>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="input border-0 w-full hover:border-0 focus:border-0"
              />
            </label>
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control mt-6 ml-8">
            <button className="btn text-white bg-[#5271FF]">Login</button>
          </div>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link
              to={"/signup"}
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Link>
          </Typography>
        </form>
      </div>
      <div className="flex flex-col -mt-16">
        <h2 className="text-center text-sm poppins">Login With</h2>
        <div className="flex justify-center">
          <button onClick={googleUserLogin} className="btn mt-2">
            <FcGoogle className="text-2xl"></FcGoogle>
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
