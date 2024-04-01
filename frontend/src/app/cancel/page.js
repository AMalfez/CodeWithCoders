"use client";
import React, { useContext } from 'react'
import AuthContext from "@/context/authContext";
import { useRouter } from "next/navigation";

function Cancel() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
        <div className='font-semibold text-3xl '>You payment is cancelled.</div>
        <button onClick={()=>router.push("/")} className='mt-5 underline underline-offset-2 cursor-pointer'>Go back</button>
    </div>
  )
}

export default Cancel