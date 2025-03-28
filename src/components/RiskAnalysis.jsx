import { Button, ConfigProvider, Input, Select, Switch } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Errors from "./Errors Box";

function BasicForm({ setResult }) {
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const [history, setHistory] = useState("");
  const [habits, setHabits] = useState("");
  const [smoker, setSmoker] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [medications, setMedications] = useState("");
  const dieseaseRef = useRef(null);

  const inpRef = useRef(null);

  const handleCalculate = async () => {
    if (
      history === "" ||
      habits === "" ||
      medications === "" ||
      dieseaseRef.current.nativeElement.innerText === "Disease to assess risk?"
    ) {
      setErrors([" Please enter all the details."]);
      return;
    }

    let createdPrompt = `Based on the user's age - ${userDetails.age}, weight -${userDetails.weight}, height - ${userDetails.height}, gender - ${userDetails.gender}, medical history -  ${history}, lifestyle habits - ${habits}, smoker - ${smoker}, alcohol - ${alcohol} and current medications - ${medications}, calculate the risk of ${dieseaseRef.current.nativeElement.innerText}  and send the response in json format having risk level (low, medium, high) along with brief preventive measures as array of strings.`;
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
          placeholder="Medical History"
          ref={inpRef}
          value={history}
          onChange={(e) => setHistory(e.target.value)}
        />
        <p className="-mt-4 pl-2 text-xs text-white">
          For example : Diabetes, Hypertension, Kidney Disease, Asthma, etc.
        </p>
        <Input
          placeholder="Lifestyle Habits"
          value={habits}
          onChange={(e) => setHabits(e.target.value)}
        />
        <p className="-mt-4 pl-2 text-xs text-white">
          For example : Regular Exercise, Healthy or Unhealthy Diet, Sleeping
          hours etc.
        </p>

        <div className="text-primary flex justify-between rounded-2xl bg-white px-5 py-3">
          <div className="flex flex-col items-center">
            <p>Are you a smoker ?</p>
            <Switch onChange={() => setSmoker(!smoker)} />
          </div>
          <div className="flex flex-col items-center">
            <p>Do you drink alcohol ?</p>
            <Switch onChange={() => setAlcohol(!alcohol)} />
          </div>
        </div>
        <Input
          placeholder="Enter any medications you take"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
        />
        <Select
          placeholder="Disease to assess risk?"
          ref={dieseaseRef}
          options={[
            {
              value: "Heart Disease",
              label: "Heart Disease",
            },
            {
              value: "Diabetes",
              label: "Diabetes",
            },
            {
              value: "Obesity",
              label: "Obesity",
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

export default function RiskAnalysis() {
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
            Risk Analysis
          </h2>
        </div>
        <BasicForm setResult={setResult} />
      </div>
      {result && (
        <div className="mb-10 flex w-3/4 flex-col gap-5 rounded-2xl border-2 border-white p-5 shadow-lg shadow-[#ffffff99] sm:w-2/3 lg:w-1/2">
          <h2
            className={`text-center font-mono text-5xl font-bold uppercase ${result.risk_level === "low" ? "text-green-500" : result.risk_level === "medium" ? "text-yellow-500" : "text-red-500"}`}
          >
            {result.risk_level}
          </h2>
          <div className="px-5 text-white select-none">
            <h3 className="pb-3 text-center font-mono text-2xl">
              Preventive Measures
            </h3>
            <ul className="flex list-disc flex-col gap-3">
              {result.preventive_measures.length > 1 &&
                result.preventive_measures.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              {result.preventive_measures.length === 1 && (
                <li>{result.preventive_measures}</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
