import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const { data: menu = [], refetch } = useQuery({
        queryKey: ["menu"],
        queryFn: async () => {
          const res = await axiosPublic.get("/menu");
          return res.data;
        },
      });

    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         });
    // }, [])
    return [menu, loading];
};

export default useMenu;