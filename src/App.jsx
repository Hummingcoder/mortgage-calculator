import React, { useState } from "react";
import Empty from "./components/Empty";
import Results from "./components/Results";

const App = () => {
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    rate: "",
    type: "",
  });
  const [resultObj, setResultObj] = useState({
    monthlyPayment: "",
    totalPayments: "",
  });

  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  const onInputChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;

    if (name !== "type") {
      setFormData((prev) => ({ ...prev, [name]: val }));
      console.log(formData);
    } else {
      setFormData((prev) => ({ ...prev, [name]: val }));
      console.log(formData);
    }
  };
  const handleResult = (e) => {
    e.preventDefault();
    if (
      formData.amount === "" ||
      formData.term === "" ||
      formData.rate === "" ||
      formData.type === ""
    ) {
      setError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const principal = parseFloat(formData.amount); // Mortgage amount
      const annualInterestRate = parseFloat(formData.rate); // Annual interest rate in percentage
      const years = parseFloat(formData.term); // Mortgage term in years
      const mortgageType = formData.type; // Mortgage type

      setResultObj(
        calculateMonthlyMortgage(
          principal,
          annualInterestRate,
          years,
          mortgageType
        )
      );
      console.log(resultObj);
    }
  };

  function calculateMonthlyMortgage(
    principal,
    annualInterestRate,
    years,
    mortgageType
  ) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = years * 12;
    let monthlyPayment;
    let totalPayments;

    if (mortgageType === "repayment") {
      const numerator =
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments);
      const denominator =
        Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
      monthlyPayment = principal * (numerator / denominator);
      totalPayments = monthlyPayment * numberOfPayments;
    } else if (mortgageType === "interest") {
      monthlyPayment = principal * monthlyInterestRate;
      totalPayments = monthlyPayment * numberOfPayments;
    } else {
      return {
        monthlyPayment: 0,
        totalPayments: 0,
      };
    }

    return {
      monthlyPayment: formatPayment(monthlyPayment),
      totalPayments: formatPayment(totalPayments),
    };
  }

  function formatPayment(amount) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GBP",
    });

    return formatter.format(amount);
  }

  const clearAll = () => {
    setFormData({
      amount: "",
      term: "",
      rate: "",
      type: formData.type,
    });
  };

  return (
    <main className="w-full  bg-Slate100  min-h-screen font-jakarta-sans flex items-center justify-center">
      <article className="flex bg-white flex-col lg:max-h-[600px] lg:h-[90vh] items-center justify-center lg:flex-row max-w-[600px]  lg:max-w-[1000px]  w-full lg:rounded-[30px] shadow-md overflow-hidden">
        <section className="px-[5%] bg-white w-full  h-full py-7 lg:py-14">
          <form
            action="_"
            className="w-full h-full flex flex-col  items-start justify-between gap-4"
          >
            <div className="flex flex-col md:flex-row w-full justify-between items-start">
              <h1 className="font-bold text-xl lg:text-[24px] text-Slate900">
                Mortgage Calculator
              </h1>
              <button
                onClick={clearAll}
                type="button"
                className="underline hover:font-bold duration-200 text-sm text-Slate700"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label
                htmlFor="amount"
                className="text-Slate700 text-sm lg:text-base"
              >
                Mortgage Amount
              </label>
              <div className="group flex items-center w-full duration-200 overflow-hidden gap-3 h-[40px] border-[1px] rounded-md border-Slate700 focus-within:border-Lime">
                <span className="bg-Slate100 font-bold duration-200 rounded-md text-Slate900 h-full grid place-content-center sm:px-4 px-3 text-sm group-focus-within:bg-Lime">
                  £
                </span>
                <input
                  onChange={(e) => onInputChange(e)}
                  value={formData.amount}
                  className="w-full pr-4 outline-none border-none font-semibold text-Slate900"
                  type="number"
                  name="amount"
                />
              </div>
              {error && formData.amount === "" && (
                <p className="text-[10px] text-Red">This field is required</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row w-full gap-3">
              <div className="flex  flex-col w-full gap-1">
                <label
                  htmlFor="Term"
                  className="text-Slate700 text-sm lg:text-base"
                >
                  Mortgage Term
                </label>
                <div className="group duration-200 flex flex-row-reverse items-center w-full overflow-hidden gap-3 h-[40px] border-[1px] rounded-md border-Slate700 focus-within:border-Lime">
                  <span className="bg-Slate100 duration-200 rounded-md text-Slate900 h-full grid place-content-center sm:px-4 text-sm  px-3 group-focus-within:bg-Lime">
                    years
                  </span>
                  <input
                    className="w-full pl-4 outline-none border-none font-semibold text-Slate900"
                    type="number"
                    name="term"
                    value={formData.term}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                {error && formData.term === "" && (
                  <p className="text-[10px] text-Red">This field is required</p>
                )}
              </div>
              <div className="flex flex-col w-full gap-1">
                <label
                  htmlFor="rate"
                  className="text-Slate700 text-sm lg:text-base"
                >
                  Mortgage Rate
                </label>
                <div className="group flex duration-200 flex-row-reverse items-center w-full overflow-hidden gap-3 h-[40px] border-[1px] rounded-md border-Slate700 focus-within:border-Lime">
                  <span className="bg-Slate100 duration-200 rounded-md text-Slate900 h-full grid place-content-center sm:px-4 text-sm  px-3 group-focus-within:bg-Lime">
                    %
                  </span>
                  <input
                    className="w-full pl-4 outline-none border-none font-semibold text-Slate900"
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                {error && formData.rate === "" && (
                  <p className="text-[10px] text-Red">This field is required</p>
                )}
              </div>
            </div>
            <div className="w-full">
              <p className="text-Slate700 mb-1 text-sm lg:text-base">
                Mortgage Type
              </p>
              <div
                className={`w-full duration-200 flex flex-row items-center px-3 gap-2  border-[1px] rounded-md    ${
                  formData.type === "repayment"
                    ? "bg-yellow-50  border-Lime "
                    : "border-Slate700 bg-white "
                }`}
              >
                <input
                  className="duration-200 appearance-none relative border border-Slate700 checked:border-Lime w-[14px] h-[14px] before:content[''] before:w-[10px] before:h-[10px] before:bg-Lime before:absolute before:opacity-0 checked:before:opacity-100 before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full peer rounded-full cursor-pointer"
                  type="radio"
                  id="repay"
                  name="type"
                  value={"repayment"}
                  onChange={(e) => onInputChange(e)}
                />
                <label
                  htmlFor="repay"
                  className="font-bold cursor-pointer py-[10px] w-full  text-sm"
                >
                  Repayment
                </label>
              </div>
              <div
                className={`duration-200 w-full mt-3 flex flex-row items-center px-3 gap-2  border-[1px] rounded-md  ${
                  formData.type === "interest"
                    ? "bg-yellow-50  border-Lime "
                    : "border-Slate700 bg-white "
                }`}
              >
                <input
                  className="duration-200 appearance-none relative border border-Slate700 checked:border-Lime w-[14px] h-[14px] before:content[''] before:w-[10px] before:h-[10px] before:bg-Lime before:absolute before:opacity-0 checked:before:opacity-100 before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full peer rounded-full cursor-pointer  checked:group:bg-yellow-50"
                  type="radio"
                  id="only"
                  name="type"
                  value={"interest"}
                  onChange={(e) => onInputChange(e)}
                />
                <label
                  htmlFor="only"
                  className="font-bold w-full py-[10px] cursor-pointer text-sm"
                >
                  Interest Only
                </label>
              </div>
              {error && formData.type === "" && (
                <p className="text-[10px] mt-1 text-Red">
                  This field is required
                </p>
              )}
            </div>
            <button
              type="submit"
              onClick={(e) => handleResult(e)}
              className="w-full max-w-[300px] duration-200 hover:bg-[#f0f27e] bg-Lime font-bold flex items-center justify-center text-Slate900 rounded-full py-3 gap-2 text-sm"
            >
              {" "}
              <img
                src="assets/images/icon-calculator.svg"
                alt="icon-calculator"
              />
              Calculate Repayment
            </button>
          </form>
        </section>
        <section className="bg-Slate900 rounded-none lg:rounded-bl-[80px] w-full h-[100%] px-[5%] py-12 ">
          {!visible ? <Empty /> : <Results {...resultObj} />}
        </section>
      </article>
    </main>
  );
};

export default App;
