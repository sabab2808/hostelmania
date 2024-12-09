import { useQuery } from "@tanstack/react-query";
import FoodCard from "../../components/FoodCard/FoodCard";
import Footer from "../../components/Footer/Footer";
import { StickyNavbar } from "../../components/Navbar/Navbar";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { Option, Select } from "@material-tailwind/react";
import axios from "axios";

const Meals = () => {
  const [filterText, setFilterText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [menu, setMenu] = useState([]);
  const axiosPublic = useAxiosPublic();
  // const { data: menu = [] } = useQuery({
  //   queryKey: ["menu"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get(
  //       `/menu?filter=${filter}&search=${search}`
  //     );
  //     return res.data;
  //   },
  // });

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosPublic.get(
        `/menu?filter=${filter}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      setMenu(data);
    };
    getData();
  }, [filter, search, minPrice, maxPrice]);

  const getArticles = async ({ pageParam = 0 }) => {
    const res = await fetch(`https://hostelmania-server.vercel.app/menu?offset=${pageParam}`);
    const data = await res.json();

    return { ...data, prevOffset: pageParam };
  };

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 3 > lastPage.articlesCount) {
        return false;
      }
      return lastPage.prevOffset + 3;
    },
  });
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
    // refetch();
  };
  const handlePriceFilter = (e) => {
    e.preventDefault();
    setMinPrice(min);
    setMaxPrice(max);
  };
  const articles = data?.pages.reduce((acc, page) => {
    refetch();
    const result = Object.values(page).slice(0, -1);
    return [...acc, ...result];
  }, []);

  return (
    <div className="container mx-auto">
      <StickyNavbar></StickyNavbar>
      <div>
        <div className="bg-[linear-gradient(45deg,rgba(19,19,24,0.50),rgba(19,19,24,0.50)),url('https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80')] bg-center bg-cover py-20 text-center my-8 rounded-xl mx-3 lg:mx-0">
          <p className="text-4xl  font-bold text-[#78c9f4] mons">Menu</p>
          <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 mt-8 justify-between w-9/12 mx-auto">
            <div className="flex flex-col items-start">
              <p className="text-white">Filter by Category</p>
              <select
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                value={filter}
                name="category"
                id="category"
                className="border w-[250px] mx-auto md:w-[300px] my-auto h-[50px] p-4 rounded-lg"
              >
                <option value="">Filter By Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white flex justify-start w-full">Search</p>
              <form onSubmit={handleSearch}>
                <div className="flex p-1 overflow-hidden rounded-lg">
                  <div className="join">
                    <input
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                      className="input input-bordered join-item"
                      type="text"
                      name="search"
                      placeholder="Enter Foodname"
                      aria-label="Enter UserName"
                    />
                    <button className="btn text-white bg-blue-400 join-item">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white flex justify-start w-full">Filter by Price</p>
              <form onSubmit={handlePriceFilter}>
                <div className="flex p-1 overflow-hidden rounded-lg">
                  <div className="join">
                    <input
                      onChange={(e) => setMin(e.target.value)}
                      value={min}
                      className="input w-[120px] mr-3 input-bordered"
                      type="text"
                      name="search"
                      placeholder="Min Price"
                      aria-label="Enter UserName"
                    />
                    <input
                      onChange={(e) => setMax(e.target.value)}
                      value={max}
                      className="input w-[120px] input-bordered"
                      type="text"
                      name="search"
                      placeholder="Max Price"
                      aria-label="Enter UserName"
                    />
                    <button className="btn text-white bg-blue-400 ml-3">
                      Filter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {filter ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {menu &&
              menu.map((item) => {
                return <FoodCard key={item.id} item={item}></FoodCard>;
              })}
          </div>
        ) : search ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {menu &&
              menu.map((item) => {
                return <FoodCard key={item.id} item={item}></FoodCard>;
              })}
          </div>
        ) : (
          <InfiniteScroll
            dataLength={articles ? articles.length : 0}
            next={() => fetchNextPage()}
            hasMore={hasNextPage}
            loading={<div>Loading...☝️</div>}
          >
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {articles &&
                articles.map((item) => {
                  return <FoodCard key={item.id} item={item}></FoodCard>;
                })}
            </div>
          </InfiniteScroll>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Meals;
