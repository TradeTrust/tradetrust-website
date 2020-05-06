import React from "react";

// child component called 2nd time when custom hook is used.
// deleting api should re-update resolved addresses, without calling api multiple times due to component re-render.

interface AddressResolverProps {
  children: React.ReactNode;
}

export const AddressResolver = ({ children }: AddressResolverProps) => {
  const apiSwift = "/static/api-swift.json";
  const apiNDI = "/static/api-ndi.json";

  console.log({}, "parent");

  return (
    <div className="container-custom">
      <div className="row my-4">
        <div className="col-12">
          <b>Example:</b>
          <br />
          /static/api-swift.json (
          <a href={apiSwift} target="_blank" rel="noreferrer noopener">
            endpoint response
          </a>
          )
          <br />
          /static/api-ndi.json (
          <a href={apiNDI} target="_blank" rel="noreferrer noopener">
            endpoint response
          </a>
          )
        </div>
      </div>
      {children}
    </div>
  );
};
