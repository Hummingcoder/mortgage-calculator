import React from "react";

const Results = ({ monthlyPayment, totalPayments }) => {
  return (
    <div className=" w-full h-full   flex flex-col items-start justify-between gap-4">
      <p className="text-Slate100 text-lg md:text-2xl font-bold">
        Your Results
      </p>
      <p className="text-sm md:text-sm lg:text-base leading-4 text-Slate300 ">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click “calculate repayments” again
      </p>
      <section className="bg-[#0c222e] w-full h-full   mt-3 border-t-4 p-6 lg:py-12 rounded-lg border-Lime flex flex-col items-start gap-5 justify-between ">
        <p className="text-sm md:text-base  text-Slate500">
          Your montly repayments
        </p>
        <p className="text-Lime font-bold text-3xl md:text-5xl">
          {monthlyPayment}
        </p>
        <hr className=" border-t border-Slate500 w-full inline-block" />
        <p className="text-sm md:text-base text-Slate500  ">
          Total you'll repay over the term
        </p>
        <p className="text-xl md:text-3xl font-bold text-white">
          {totalPayments}
        </p>
      </section>
    </div>
  );
};

export default Results;
