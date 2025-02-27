import { Button, ConfigProvider, Input, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Errors from "./Errors Box";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const genderRef = useRef(null);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // if (localStorage.getItem("Authorization")) navigate("/");
  }, []);

  const handleSignup = async () => {
    if (
      username == "" ||
      fullName == "" ||
      email == "" ||
      age == "" ||
      weight == "" ||
      height == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      setErrors(["Please enter all the details."]);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        {
          username: username,
          fullName: fullName,
          email: email,
          gender: genderRef.current.nativeElement.innerText,
          age: age,
          weight: weight,
          height: height,
          password: password,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.status === 200) {
        setUsername("");
        setFullName("");
        setEmail("");
        setAge("");
        setWeight("");
        setHeight("");
        setPassword("");
        setConfirmPassword("");
        setErrors([]);
        navigate("/login");
      } else {
        setErrors([]);
        if (response.data.errors) {
          response.data.errors.forEach((error) =>
            setErrors((prevErrors) => [...prevErrors, error.msg]),
          );
        } else {
          setErrors([response.data.message]);
        }
      }
    } catch (error) {
      setErrors([error]);
      console.error(error);
    }
  };

  return (
    <section className="flex h-dvh items-center justify-center bg-[#1f2937]">
      <div className="flex w-2/3 flex-col gap-5 rounded-2xl border-2 border-white p-5 shadow-lg shadow-[#ffffff99] sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
        <h1 className="text-center font-mono text-3xl font-bold text-white select-none">
          Signup
        </h1>

        {errors.length != 0 && <Errors errors={errors} />}

        <ConfigProvider
          theme={{
            components: {
              Button: {
                fontWeight: "700",
              },
            },
            token: {
              colorPrimary: "#000000",
              lineWidth: 1,
            },
          }}
        >
          <Input
            placeholder="Username"
            className=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Full Name"
            className=""
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            placeholder="Email"
            className=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Gender */}
          <Select
            placeholder="Gender"
            ref={genderRef}
            options={[
              {
                value: "male",
                label: "male",
              },
              {
                value: "female",
                label: "female",
              },
              {
                value: "other",
                label: "other",
              },
            ]}
          />
          <Input
            placeholder="Age"
            className=""
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            placeholder="Weight"
            className=""
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <Input
            placeholder="height"
            className=""
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <Input
            placeholder="Password"
            className=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Input
            placeholder="Confirm Password"
            className=""
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            status={
              password !== confirmPassword
                ? "error"
                : password === confirmPassword
                  ? "success"
                  : "default"
            }
          />
          <ConfigProvider
            theme={{
              token: {
                lineWidth: 2,
              },
            }}
          >
            <Button size="large" ghost onClick={handleSignup}>
              Sign Up
            </Button>
          </ConfigProvider>
        </ConfigProvider>
      </div>
    </section>
  );
}
