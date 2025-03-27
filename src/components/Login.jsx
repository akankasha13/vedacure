import { Button, ConfigProvider, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Errors from "./Errors Box";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const inpRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("Authorization")) navigate("/");
    inpRef.current.focus();
  }, []);

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setErrors(["Please enter username and password."]);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.status === 200) {
        localStorage.setItem("Authorization", `Bearer ${response.data.token}`);
        localStorage.setItem("user", JSON.stringify({ username }));
        setUsername("");
        setPassword("");
        setErrors([]);
        navigate("/");
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
    <section className="bg-primary flex h-dvh items-center justify-center">
      <div className="flex w-2/3 flex-col gap-5 rounded-2xl border-2 border-white p-5 shadow-lg shadow-[#ffffff99] sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
        <h1 className="text-center font-mono text-3xl font-bold text-white select-none">
          Login
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
            ref={inpRef}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Input
            placeholder="Password"
            className=""
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <ConfigProvider
            theme={{
              token: {
                lineWidth: 2,
              },
            }}
          >
            <Button size="large" ghost onClick={handleLogin}>
              Login
            </Button>
          </ConfigProvider>
        </ConfigProvider>
      </div>
    </section>
  );
}
