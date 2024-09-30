import React from "react";

const Temperature = () => {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex  justify-between items-center h-[50px]">
        <h1 className="text-[4rem]">20&deg;</h1>
        <div className="flex items-center">
          <div className="flex flex-col gap-0">
            <div className="mr-4 text-[1.6rem] translate-y-[2rem] translate-x-[-.8rem]">+</div>
            <div className="mr-4 text-[1.6rem] ">/</div>
            <div className="text-[1.6rem] translate-y-[-2.3rem] translate-x-2">_</div>
          </div>
          <h3 className="text-[4rem]">3</h3>
        </div>
      </div>
      <div className="flex  justify-between items-end">
        <h3 className="text-[2rem] self-end translate-y-2">9.8%</h3>
        <p className="text-xs">Wind: WSW 6mph</p>
      </div>
    </div>
  );
};

export default Temperature;
