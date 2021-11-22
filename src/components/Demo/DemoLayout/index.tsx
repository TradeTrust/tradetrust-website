import React, { FunctionComponent } from "react";

export const DemoLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full lg:w-2/3 xl:w-1/2">
        <div className="bg-white rounded-xl shadow-xl p-6">{children}</div>
      </div>
      <div className="w-1/2 lg:w-1/3 xl:w-1/2 mx-auto my-8">
        <img className="max-h-96 mx-auto" src="/static/images/faq/faq-man.png" alt="FAQ person" />
      </div>
    </div>
  );
};
