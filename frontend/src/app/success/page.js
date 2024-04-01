"use client";
import React, { useEffect } from "react";
// import AuthContext from "@/context/authContext";
import QRCode from "qrcode";
import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

function Success() {
  // const { user } = useContext(AuthContext);
  // const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const place = searchParams.get("place");
  const date = searchParams.get("date");
  const price = searchParams.get("price");
  const userId = searchParams.get("userId");
  useEffect(() => {
    GenerateQRCode();
  }, []);

  const GenerateQRCode = async () => {
    const res = await axios.post(
      "http://localhost:5000/payment/success",
      { userId, place, date, price }
      )
      console.log(res);
    const url = `http://localhost:3000/ticket?ticket_number=${res.data.ticket_number}`
    QRCode.toDataURL(
      url,
      {
        width: 500,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);

        console.log(url);
        setQr(url);
      }
    );
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="font-semibold text-3xl ">You payment is Successfull.</div>
      {qr && (
        <>
          <img className="w-15 h-15" src={qr} alt="QR code" />
          <a href={qr} download="qrcode.png">
            Download
          </a>
          <button
            onClick={() => router.push("/")}
            className="mt-5 underline underline-offset-2 cursor-pointer"
          >
            Go back
          </button>
        </>
      )}
    </div>
  );
}

export default Success;
