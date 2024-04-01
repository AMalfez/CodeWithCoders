"use client";
import Navbar from "@/components/navbar";
import AuthContext from "@/context/authContext";
import { useState } from "react";
import { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter()
  if (user.length === 0) {
    router.push("/login");
  }
  const { templeData } = useContext(AuthContext);

  const [renderId, setRenderId] = useState(1);
  const [templeToVisit, setTempleToVisit] = useState([]);
  const makePayment = async (temple) => {
    // console.log(user);
    const stripe = await loadStripe(
      "pk_test_51NHidkSCTsJY5ezVf5fpcafUVIq0ATRMxBUN8905m9fvSNV3jaZ9mbIKS41IFiOKe7zlYtbg2yIqUXFebRAyZShP00vTIBFHnS"
    );

    const header = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:5000/payment/create-checkout-session",
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({...temple,userId:user[0]._id}),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) console.log(result.error);
  };
  const handleTempleSelection = (index) => {
    setRenderId(2);
    setTempleToVisit([templeData[index]]);
  };
  return (
    <main className="min-h-screen">
      <Navbar search={true}/>

      <div className="w-screen h-screen">
        <div className="w-full h-full flex flex-row justify-center items-center text-white p-0">
          <div className="w-screen min-h-screen h-auto py-5">
            <div className="w-full h-auto flex flex-row flex-wrap justify-center lg:flex-row lg:flex-wrap items-center text-white p-0 lg:p-6 gap-3">
              {templeData.map((temple, index) => {
                return (
                  <div
                    className=" w-7/12 max-w-80 h-28 flex flex-col  justify-center items-center border rounded border-teal-500 mt-1 px-2"
                    key={index}
                    onClick={() => {
                      handleTempleSelection(index);
                    }}
                  >
                    <div className="text-teal-600 font-semibold">
                      {index + 1}. {temple.name}
                    </div>
                    <div className="text-teal-500">
                      <span className="pr-2">{temple.location.locality}</span>
                      <span className="pr-2">{temple.location.region}</span>
                      <span className="pr-2">{temple.location.postcode}</span>
                      <span className="pr-2">{temple.location.country}</span>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          makePayment({
                            place: temple.name,
                            date: new Date(),
                            price: 100,
                          })
                        }
                        className="flex w-20 h-8 justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Dashboard;
