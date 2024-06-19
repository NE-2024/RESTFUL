import axios from "@/app/components/api-services/axios.config";
import { Button, Input } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormImage from "@/assets/formImage.png";
import Logo from "@/assets/logo.png";
function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/login", data);
      console.log(response.data);
      sessionStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        toast.success("User logged in successfully!");
        navigate("/dashboard/books");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
      navigate("/auth/login");
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
          <div className="text-center text-2xl font-bold mt-8">Welcome back!</div>
          <div className="mt-6">
            <Input
              placeholder="Your Email"
              size="md"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              placeholder="Your Password"
              type="password"
              size="md"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>

          <Button
            variant="filled"
            color="#354545"
            className="rounded-xl"
            size="md"
            onClick={handleLogin}
          >
            Login
          </Button>
          <div>
            <p className="text-center text-sm">
              Don't have an account ?{" "}
              <Link href="/auth/register">
                <u className="text-[#354545] text-shadow">Signup</u>
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

export default Login;
