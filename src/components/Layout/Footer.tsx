import React, { FunctionComponent } from "react";

export const Footer: FunctionComponent = () => {
  return (
    <footer className="bg-white py-6 no-print">
      <div className="container">
        <div className="flex justify-center">
          <div className="w-auto">
            <p className="mb-0">Copyright &copy; 2020 TradeTrust</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
