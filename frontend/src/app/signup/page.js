"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import temple from "../../assets/temple.svg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const handleSignUp = async (evt) => {
    evt.preventDefault();
    if (!name || !password || !email || !contact || !confirmPassword) {
      return "all fields are necessary";
    }
    const isvalid = isValidEmail(email);
    if (isvalid === false) {
      console.log( "please enter a valid email address");
      return;
    }
    if (password !== confirmPassword) {
      console.log("please check your password");
      return;
    }
    const Data = {
      name: name,
      phone: contact,
      email: email,
      password: password,
    };
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:5000/auth/signup", //url for post request
        data: Data,
        withCredentials: true,
      });
      if (response) {
        // redirect to dashboard
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/* <div className="w-screen h-screen absolute -z-50">
        <Image src={temple} />
      </div> */}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  // autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  // autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contact Number
              </label>
              <div className="mt-2">
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  type="number"
                  // autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  // autocomplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Confirm Password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                onClick={(e)=>handleSignUp(e)}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have a account?
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
