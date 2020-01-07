import React, { useState, useEffect } from "react";
import { getTokenOwner, initializeToken } from "../../../services/token";
import css from "./detailedCertificateBlock.scss";

const TokenVerifyBlock = ({ document }) => {
  const [tokenOwner, setTokenOwner] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTokenOwner() {
      try {
        initializeToken(document);
        const owner = await getTokenOwner();
        setTokenOwner(owner);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchTokenOwner();
  }, [document]);

  if (error) return <div className="text-danger">{error}</div>;
  return (
    <>
      <div className={css["transferable-record"]}>The document is a transferable record.</div>
      <div>Owned by: {tokenOwner}</div>
    </>
  );
};

export default TokenVerifyBlock;
