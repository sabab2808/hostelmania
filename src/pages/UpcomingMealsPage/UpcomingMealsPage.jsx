import { StickyNavbar } from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import UpcomingCard from "../../components/UpcomingCard/UpcomingCard";
const UpcomingMealsPage = () => {
  const axiosPublic = useAxiosPublic();
  const { data: upcomingMeals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosPublic.get("/upcomingMeals");
      return res.data;
    },
  });

  return (
    <div className="container mx-auto">
      <StickyNavbar></StickyNavbar>
      <div>
        <div className="bg-[linear-gradient(45deg,rgba(19,19,24,0.50),rgba(19,19,24,0.50)),url('https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80')] bg-center bg-cover py-20 text-center my-8 rounded-xl mx-3 lg:mx-0">
          <p className="text-4xl  font-bold text-[#78c9f4] mons">
            Upcoming Meals
          </p>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {upcomingMeals.map((item) => (
            <UpcomingCard key={item.id} item={item}></UpcomingCard>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UpcomingMealsPage;
