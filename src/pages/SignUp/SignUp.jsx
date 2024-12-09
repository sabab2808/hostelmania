import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { StickyNavbar } from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useForm } from "react-hook-form";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../providers/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { registerUser, updateUserInfo, googleLogin, setUser, user, loading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.badge = "bronze";
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const email = data.email;
      const password = data.password;
      const name = data.name;
      const image = res.data.data.display_url;
      const user = {
        email,
        name,
        image,
        badge: data.badge,
      };
      registerUser(email, password)
        .then(() => {
          updateUserInfo(name, image)
            .then(() => {
              setUser({
                displayName: name,
                photoURL: image,
                email: email,
              });
              fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(user),
              })
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    title: "Success!",
                    text: "Successfully Registered!",
                    icon: "success",
                    confirmButtonText: "Okay",
                  });
                  navigate(location?.state ? location.state : "/");
                });
              // Swal.fire({
              //     title: 'Success!',
              //     text: 'Successfully Registered!',
              //     icon: 'success',
              //     confirmButtonText: 'Okay'
              //   })
            })
            .catch(() => {
              Swal.fire({
                title: "Error!",
                text: "Something is wrong",
                icon: "error",
                confirmButtonText: "Okay",
              });
            });
        })
        .catch(() => {
          Swal.fire({
            title: "Error!",
            text: "User Already Exists",
            icon: "error",
            confirmButtonText: "Okay",
          });
        });

      // const menuItem = {
      //   name: data.name,
      //   recipe: data.recipe,
      //   category: data.category,
      //   price: parseFloat(data.price),
      //   image: res.data.data.display_url,
      // };
    }
  };
  const googleUserLogin = () => {
    googleLogin()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          image: result.user?.photoURL,
          badge: "bronze",
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
  return (
    <div className="container mx-auto">
      <StickyNavbar></StickyNavbar>
      <div className="my-20 flex justify-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Input
                size="lg"
                {...register("name", { required: true })}
                type="text"
                name="name"
                placeholder="Mahbub Sarwar"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.name && <span>This field is required</span>}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Image
              </Typography>
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
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
                {errors.image && <span>This field is required</span>}
              </label>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                {...register("email", { required: true })}
                type="email"
                name="email"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.email && <span>This field is required</span>}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password"
                {...register("password", { required: true })}
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.password && <span>This field is required</span>}
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
              color="#5271FF"
            />{" "}
            <br />
            {/* <Button type="submit" className="mt-6 bg-[#5271FF]" fullWidth> */}
            <input
              type="submit"
              className="mt-6 bg-[#5271FF] w-full cursor-pointer text-sm py-3 rounded-lg text-white"
              value="Sign Up"
            />
            {/* </Button> */}
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link
                to={"/login"}
                href="#"
                className="font-medium text-gray-900"
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
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

export default SignUp;
