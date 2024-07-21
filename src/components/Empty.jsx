import React from "react";

const Empty = () => {
  return (
    <div className="w-full h-full text-center gap-2 py-8 px-[5%] flex flex-col  items-center justify-center ">
      <img
        className="w-[130px] md:w-[180px]"
        src="assets/images/illustration-empty.svg"
        alt="img-empty"
      />
      <p className="text-Slate100 text-lg md:text-xl font-bold">
        Results shown here
      </p>
      <p className="text-sm md:text-base max-w-[300px] text-Slate300 ">
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be
      </p>
    </div>
  );
};

export default Empty;
