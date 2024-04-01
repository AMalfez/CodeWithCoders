"use client";
import React, { useContext, useState } from "react";
import AuthContext from "@/context/authContext";
import axios from "axios";

function Navbar() {
  const { user, setTempleData } = useContext(AuthContext);
  const [Location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  async function handleSplit() {
    const parts = Location.split(",");
    if (parts.length === 2) {
      const latitude = parseFloat(parts[0]);
      const longitude = parseFloat(parts[1]);
      return { latitude, longitude };
    } else {
      alert("Invalid input. Please enter a string with a comma.");
      return null;
    }
  }
  async function searchLocation() {
    const geocodes = await handleSplit(location);
    if (!geocodes) {
      console.log("Invalid input");
      return [];
    }
    const { latitude, longitude } = geocodes;
    // const latitude = 26.79;
    // const longitude = 82.19;
    console.log(latitude, longitude);
    const radius = 5000;
    const categoryId = "52e81612bcbc57f1066b7a3f";
    const url = `https://api.foursquare.com/v3/places/search?ll=${latitude}%2C${longitude}&radius=${radius}&categories=${categoryId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.api_key,
      },
    };

    try {
      const response = await axios(url, options);
      if (response) {
        setTempleData(response.data.results);
        return response.data.results;
      }
    } catch (error) {
      console.error("Error fetching temple details:", error);
      return [];
    }
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Templ</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-row">
          <a
            href="/dashboard"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Dashboard
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Payments
          </a>
        </div>
        <div className="w-1/4 flex flex-1 lg:justify-center">
          {" "}
          <input
            type="search"
            value={Location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            placeholder="latitude , longitude"
            className="text-sm px-4 py-2 leading-none border rounded text-teal-500 border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 outline-none lg:mx-2"
          />
          <button
            onClick={searchLocation}
            className="bg-transparent text-white border-white"
          >
            search
          </button>
        </div>
        <div>
          {user.length > 0 ? (
            <div className="flex flex-row">
              <div className="text-white mx-1">{user[0].name}</div>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row ">
              <a
                href="/login"
                className="w-24 inline-block text-sm px-4 py-2 leading-none border rounded bg-white text-teal-500 border-white hover:border-white hover:text-white hover:bg-transparent mt-4 lg:mt-0 lg:mx-1"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="w-24 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 lg:mx-1"
              >
                Sign up
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
