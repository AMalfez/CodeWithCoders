"use client"
import Navigation from "@/components/navbar";
import AuthContext from "@/context/authContext";
import { useContext } from "react";

export default function Home() {
  const { templeData, user } = useContext(AuthContext);

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="w-screen h-screen">
        <div className="w-full h-full flex flex-row justify-center items-center text-white p-0">
          <div>hello</div>
        </div>
      </div>
    </main>
  );
}
