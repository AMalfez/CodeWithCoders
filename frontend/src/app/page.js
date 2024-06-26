"use client";
import Navigation from "@/components/navbar";

export default function Home() {
  
  return (
    <main className="min-h-screen">
      <Navigation search={false}/>

      {/* <div className="w-screen h-screen">
        <div className="w-full h-full flex flex-row justify-center items-center text-white p-0">
          {/* <div className="text-6xl text-slate-50 font-bold">
            Book your spiritual journey now
          </div> */}
          {/* <div className="w-screen min-h-screen h-auto py-5">
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
                      <button onClick={()=>makePayment({place:temple.name, date:new Date(), price:100})} className="flex w-20 h-8 justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                        Book
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> */}

        {/* </div> */}
      {/* </div>  */}
    </main>
  );
}