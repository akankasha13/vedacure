import { Button, ConfigProvider, Input, Select, Switch } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Errors from "./Errors Box";

function BasicForm({ setResult }) {
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const [symptoms, setSymptoms] = useState("");
  const [ingredients, setIngredients] = useState("");
  const dietRef = useRef(null);

  const inpRef = useRef(null);

  const handleCalculate = async () => {
    if (
      symptoms === "" ||
      ingredients === "" ||
      dietRef.current.nativeElement.innerText === "Disease to assess risk?"
    ) {
      setErrors([" Please enter all the details."]);
      return;
    }

    let createdPrompt = `Based on the user's age - ${userDetails.age}, gender - ${userDetails.gender}, symptoms - ${symptoms}, dietary preferences - ${dietRef.current.nativeElement.innerText}, available ingredients - ${ingredients}, provide simple and effective recommendations tailored to their needs, along with any lifestyle tips for overall well-beind and send the response in json format having recommendations, lifestyle tips and symptom relief as keys, each having an array of strings.`;
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
          const { age, gender } = response.data.data;
          setUserDetails({ age, gender });
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
          placeholder="Any Symptoms"
          ref={inpRef}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <p className="-mt-4 pl-2 text-xs text-white">
          For example : Headache, Fever, Indigestion, Nausea, Skin Rashes etc.
        </p>

        <Input
          placeholder="Available Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <p className="-mt-4 pl-2 text-xs text-white">
          For example : Ginger, Turmeric, Honey, Lemon, Aloe Vera, Cinnamon,
          etc.
        </p>
        <Select
          placeholder="Dietary Preferences"
          ref={dietRef}
          options={[
            {
              value: "Vegetarian",
              label: "Vegetarian",
            },
            {
              value: "Non - Vegetarian",
              label: "Non - Vegetarian",
            },
            {
              value: "Vegan",
              label: "Vegan",
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

export default function Naturopathy() {
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
            Naturopathy
          </h2>
        </div>
        <BasicForm setResult={setResult} />
      </div>
      {result && (
        <div className="mb-10 flex w-3/4 flex-col gap-5 rounded-2xl border-2 border-white p-5 shadow-lg shadow-[#ffffff99] sm:w-2/3 lg:w-1/2">
          <div className="px-5 text-white select-none">
            <h3 className="pb-3 text-center font-mono text-2xl">
              Symptom Relief
            </h3>
            <ul className="flex list-disc flex-col gap-3">
              {result?.symptom_relief.length > 1 &&
                result?.symptom_relief.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              {result?.symptom_relief.length === 1 && (
                <li>{result?.symptom_relief}</li>
              )}
            </ul>
          </div>
          <div className="px-5 text-white select-none">
            <h3 className="pb-3 text-center font-mono text-2xl">
              Recommendations
            </h3>
            <ul className="flex list-disc flex-col gap-3">
              {result?.recommendations.length > 1 &&
                result?.recommendations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              {result?.recommendations.length === 1 && (
                <li>{result?.recommendations}</li>
              )}
            </ul>
          </div>
          <div className="px-5 text-white select-none">
            <h3 className="pb-3 text-center font-mono text-2xl">
              Lifestyle Tips
            </h3>
            <ul className="flex list-disc flex-col gap-3">
              {result?.lifestyle_tips.length > 1 &&
                result?.lifestyle_tips.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              {result?.lifestyle_tips.length === 1 && (
                <li>{result?.lifestyle_tips}</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
