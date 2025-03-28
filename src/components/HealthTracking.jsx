import { Button, ConfigProvider, Input, Select, Switch } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Errors from "./Errors Box";

function BasicForm({ setResult }) {
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

    let createdPrompt = `Based on the user's age - ${userDetails.age}, weight -${userDetails.weight}, height - ${userDetails.height}, gender - ${userDetails.gender}, physical activity - ${activity}, total duration of physical activity - ${durationRef.current.nativeElement.innerText}, calculate calories burned during the specified activities and send the response in json format having total calories burned, bmi, suggestions for improving fitness and include a motivational quote. Keys of response should bmi, motivational_quote, suggestions, total_calories_burned.`;
    try {
      setLoading(true);
      const response = await axios.post(
        "https://vedacure-backend.onrender.com/api/gen/generate",
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
        setResult(response.data.data);
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
    inpRef.current.focus();
    async function getData() {
      try {
        const response = await axios.get(
          "https://vedacure-backend.onrender.com/api/user/details",
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
        <Input
          placeholder="Physical Activities"
          ref={inpRef}
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <p className="-mt-4 pl-2 text-xs text-white">
          For example : Walking, Jogging, Swimming, Yoga, Cycling, Gym, etc.
        </p>
        <Select
          placeholder="Total duration of physical activity (in minutes)"
          ref={durationRef}
          options={[
            {
              value: "Less than 30 mins",
              label: "Less than 30 mins",
            },
            {
              value: "30 to 60 mins",
              label: "30 to 60 mins",
            },
            {
              value: "60 to 120 mins",
              label: "60 to 120 mins",
            },
            {
              value: "More than 120 mins",
              label: "More than 120 mins",
            },
          ]}
        />
        <ConfigProvider
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
            Calculate
          </Button>
        </ConfigProvider>
      </ConfigProvider>
    </>
  );
}

export default function HealthTracking() {
  const [result, setResult] = useState(null);
  return (
    <section className="bg-primary flex min-h-dvh flex-col items-center justify-center gap-10 pt-24 pb-10 sm:pt-0 sm:pb-0">
      <div className="mt-7 flex w-3/4 flex-col gap-5 rounded-2xl border-2 border-white p-5 shadow-lg shadow-[#ffffff99] sm:mt-28 sm:w-2/3 lg:w-1/2">
        <div className="flex w-full flex-col items-center justify-center gap-3 px-5 text-white select-none sm:flex-row sm:gap-8 sm:py-3">
          <h2
            className={
              "font-body cursor-pointer text-3xl transition-all duration-300 hover:scale-110"
            }
          >
            Health Tracking
          </h2>
        </div>
        <BasicForm setResult={setResult} />
      </div>
      {result && (
        <div className="mb-10 flex w-3/4 flex-col gap-5 rounded-2xl border-2 border-white p-5 shadow-lg shadow-[#ffffff99] sm:w-2/3 lg:w-1/2">
          <h2
            className={`text-center font-mono text-5xl font-bold text-white uppercase`}
          >
            BMI - {result?.bmi}
          </h2>
          <h2
            className={`text-center font-mono text-5xl font-bold text-white uppercase`}
          >
            Calories - {result?.total_calories_burned}
          </h2>
          <div className="px-5 text-white select-none">
            <h3 className="pb-3 text-center font-mono text-2xl">Suggestions</h3>
            <ul className="flex list-disc flex-col gap-3">
              {result?.suggestions.length > 1 &&
                result?.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              {result?.suggestions.length === 1 && (
                <li>{result?.suggestions}</li>
              )}
            </ul>
          </div>
          <p className="font-script text-center text-2xl text-white">
            " {result?.motivational_quote} "
          </p>
        </div>
      )}
    </section>
  );
}
