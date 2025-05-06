import React, { FunctionComponent } from "react";

export const AssetInformationPanel: FunctionComponent = () => {
  return (
    <>
      <div className="p-2 gap-2">
        <h4>Tradetrust-bill-of-lading.tt</h4>
      </div>
      <div className="p-2">
        <hr />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-1">
        <div className="p-1 gap-2">
          <h4 className="text-cloud-400 font-bold">Owner:</h4>
          <h4 className="font-bold ">Organisation A</h4>
          <div className="inline-block break-all w-full font-semibold text-cloud-500 gap-1">
            <a
              href="https://amoy.polygonscan.com/address/0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="non-editable-input-owner"
            >
              <h6>0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638</h6>
            </a>
          </div>
        </div>
        <div className="p-1 gap-2">
          <h4 className="text-cloud-400 font-bold">Holder:</h4>
          <h4 className="font-bold">Organisation A</h4>
          <div className="inline-block break-all w-full font-semibold text-cloud-500">
            <a
              href="https://amoy.polygonscan.com/address/0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="non-editable-input-owner"
            >
              <h6>0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638</h6>
            </a>
          </div>
        </div>
        <div className="md:w-1/3 p-1 gap-2">
          <h4 className="text-cloud-400 font-bold">Remarks:</h4>
          <h6>
            Lorem ipsum dolor sit amet consectetur. Dolor aliquam imperdiet turpis leo feugiat sit risus blandit viverra
            scelerisque.
          </h6>
        </div>
      </div>
    </>
  );
};
