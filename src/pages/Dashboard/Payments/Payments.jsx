import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Chip } from "@material-tailwind/react";

const Payments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payment = [], refetch } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });
  // const payments = [payment];
  console.log(payment);
  return (
    <div>
      <SectionTitle
        heading={"My Payments"}
        subheading={"See all the payment information you have stored"}
      ></SectionTitle>
      <div>
        <div className="mt-12 lg:mx-12">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead className="text-center text-blue-400">
                {payment.length ? (
                  <tr className="">
                    <th></th>
                    <th>Date</th>
                    <th>Transaction ID</th>
                    <th>Package Name</th>
                    <th>Package Price</th>
                    <th>Status</th>
                  </tr>
                ) : (
                  <p className="text-red-500 text-2xl"> NO PAYMENT IS COMPLETED!</p>
                )}
              </thead>
              <tbody className="text-center">
                {payment.length
                  ? payment.map((item, index) => (
                      <tr key={item._id}>
                        <th>{index + 1}</th>
                        <td>{item.date}</td>
                        <td>{item.transactionId}</td>
                        <td className="uppercase">
                          {(item.packageName === "silver" && (
                            <Chip
                              className="w-[150px] mx-auto"
                              value={item.packageName}
                            />
                          )) ||
                            (item.packageName === "gold" && (
                              <Chip
                                className="w-[150px] mx-auto"
                                color="amber"
                                value={item.packageName}
                              />
                            )) ||
                            (item.packageName === "platinum" && (
                              <Chip
                                className="w-[150px] mx-auto"
                                color="cyan"
                                value={item.packageName}
                              />
                            ))}
                        </td>
                        <td>{item.price}</td>
                        <td>
                          <Chip
                            className="w-[150px] mx-auto"
                            color="green"
                            value={item.status}
                          />
                        </td>
                      </tr>
                    ))
                  : <p>Subscribe to a package</p>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
