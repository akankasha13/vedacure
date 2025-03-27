import { Button, ConfigProvider, Input, Select, Switch, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Errors from "./Errors Box";
import { InboxOutlined } from "@ant-design/icons";

function BasicForm() {
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const [activity, setActivity] = useState("");
  const durationRef = useRef(null);

  const inpRef = useRef(null);

  const handleCalculate = async () => {
    if (
      activity === "" ||
      durationRef.current.nativeElement.innerText === "Disease to assess risk?"
    ) {
      setErrors([" Please enter all the details."]);
      return;
    }

    let createdPrompt = `Based on the user's age - ${userDetails.age}, weight -${userDetails.weight}, height - ${userDetails.height}, gender - ${userDetails.gender}, physical activity - ${activity}, total duration of physical activity - ${durationRef.current.nativeElement.innerText}, calculate calories burned during the specified activities and send the response in json format having calories burned, bmi, suggestions for improving fitness and include a motivational quote.`;
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/gen/generate",
        {
          prompt: createdPrompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        },
      );
      if (response.data.status === 200) {
        console.log(response.data.data);
        setErrors([]);
        setLoading(false);
        // What to do after getting the result ?
      } else {
        setLoading(false);
        setErrors([response.data.message]);
      }
    } catch (error) {
      setLoading(false);
      setErrors([error]);
      console.error(error);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/details",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          },
        );
        if (response.data.status === 200) {
          const { age, gender, height, weight } = response.data.data;
          setUserDetails({ age, gender, height, weight });
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const props = {
    name: "file",
    multiple: true,
    // action: "https://localhost:3000/api/upload",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Authorization")}`,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
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
        <div className="">
          <Upload {...props} className="flex w-full flex-col items-center">
            <div className="flex w-[400px] cursor-pointer flex-col items-center gap-5 rounded-3xl bg-white font-mono shadow-md shadow-[#ffffff99] transition-all duration-300 hover:scale-105">
              <p className="text-center text-7xl">
                <InboxOutlined />
              </p>
              <div className="pb-3 text-center">
                <p className="">Click or drag file to this area to upload</p>
                <p className="">Support for a single or multiple pdf upload</p>
              </div>
            </div>
          </Upload>
        </div>
        {/* <ConfigProvider
          theme={{
            token: {
              lineWidth: 2,
            },
          }}
        >
          <Button
            size="large"
            ghost
            onClick={handleCalculate}
            loading={loading}
          >
            Upload
          </Button>
        </ConfigProvider> */}
      </ConfigProvider>
    </>
  );
}

export default function MedicalRecords() {
  return (
    <section className="bg-primary flex min-h-dvh items-center justify-center pt-24 pb-10 sm:pt-0 sm:pb-0">
      <div className="flex w-3/4 flex-col gap-5 rounded-2xl border-2 border-white p-5 shadow-lg shadow-[#ffffff99] sm:w-2/3 lg:w-1/2">
        <div className="flex w-full flex-col items-center justify-center gap-3 px-5 text-white select-none sm:flex-row sm:gap-8 sm:py-3">
          <h2
            className={
              "font-body cursor-pointer text-3xl transition-all duration-300 hover:scale-110"
            }
          >
            Medical Records
          </h2>
        </div>
        <BasicForm />
      </div>
    </section>
  );
}
