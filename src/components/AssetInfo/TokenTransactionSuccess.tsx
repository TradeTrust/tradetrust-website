import React from "react";

const TokenTransactionSuccess = ({ hash }: { hash: string }) => {
  return (
    <>
      <p>Congratulations!!! transaction is successful.</p>
      <a href={`https://ropsten.etherscan.io/tx/${hash}`}>{hash}</a>
    </>
  );
};

export default TokenTransactionSuccess;
