import { loadStripe } from "@stripe/stripe-js";
import Footer from "../../components/Footer/Footer";
import { StickyNavbar } from "../../components/Navbar/Navbar";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const CheckOut = () => {
  const { user } = useAuth();
  const mealPackage = useParams();
  let amount;

  if (mealPackage.name === "gold") {
    amount = 10;
  } else if (mealPackage.name === "platinum") {
    amount = 15;
  } else {
    amount = 5;
  }
  return (
    <div className="container mx-auto mons">
      <StickyNavbar></StickyNavbar>
      <div className="w-[300px] lg:w-[800px] my-12 mx-auto">
        <div>
            <p className="text-2xl font-bold text-center mb-8 text-blue-600">Package Information and Payment</p>
        </div>
        <div>
          <p className="mb-3 text-lg">
            User Name:{" "}
            <span className="uppercase font-bold">{user.displayName}</span>
          </p>
          <p className="mb-3 text-lg">
            User Name: <span className=" font-bold">{user.email}</span>
          </p>
          <p className="mb-3 text-lg">
            Package Name:{" "}
            <span className="uppercase font-bold">{mealPackage.name}</span>
          </p>
          <p className="mb-5 text-lg">
            Package Price:{" "}
            <span className="uppercase font-bold">${amount}</span>
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm mealPackage={mealPackage.name}></CheckoutForm>
          </Elements>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CheckOut;
