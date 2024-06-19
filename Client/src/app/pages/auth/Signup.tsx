import axios from "@/app/components/api-services/axios.config";
import { Button, Input, Select } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormImage from "@/assets/formImage.png";
import Logo from "@/assets/logo.png";
function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
   
  });
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/register", data);
      console.log(response.data);
      if (response.status === 201) {
        toast.success("User created successfully!");
        navigate("/dashboard/books");
      }
    } catch (error) {
      toast.error("An error occurred!");
      console.log(error);
    }
  };

  return (
       <main className="bg-white">
      <div className=" mt-8 h-[30vh]">
        <div className="w-1/2 flex flex-row shadow-lg m-auto">
        <div className="w-full py-8 flex flex-col gap-y-4 px-6 mx-auto">
        <div>
          <Image
            src={Logo}
            alt="logo"
            className="w-40 h-8 m-auto"
          />
        </div>
          <div className="text-center text-2xl font-bold">
            Create Your Account
          </div>
          <div className="mt-2">
            <Input
              placeholder="Your First name"
              size="md"
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <Input
              placeholder="Your Last name"
              size="md"
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <Input
              placeholder="Your Email"
              size="md"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div className="mt-2">
            <Input
              placeholder="Your Password"
              type="password"
              name="password"
              size="md"
              value={data.password}
              onChange={handleChange}
            />
          </div>
         
          <Button
            variant="filled"
            color="#354545"
            className="rounded-xl"
            size="md"
            onClick={handleSubmit}
          >
            Create Account
          </Button>
          <div>
            <p className="text-center text-sm">
              Already have account ?{" "}
              <Link href="/auth/login">
              <u className="text-[#354545] text-shadow">Login</u>
              </Link>
            </p>
          </div>
          </div>
          <div>
          <Image
            src={FormImage}
            alt="login"
            className="w-full h-auto"
          />
        </div>
       
        </div>
      </div>
    </main>
  );
}

export default Signup;
