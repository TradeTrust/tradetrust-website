import React, { useState, useEffect } from "react";
import { getTokenOwner } from "../../../services/erc721Token";

const TokenVerifyBlock = ({ document }) => {
  const [tokenOwner, setTokenOnwer] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTokenOwner() {
      try {
        const tokenOwner = await getTokenOwner(document);
        setTokenOnwer(tokenOwner);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchTokenOwner();
  }, [document]);

  if (error) return <div className="text-danger">{error}</div>;
  return (
    <>
      <div>The document is a transferable record.</div>
      <div>Owned by: {JSON.stringify(tokenOwner)}</div>
    </>
  );
};

export default TokenVerifyBlock;
