const qs = require("qs");

const encode = (contract, parameters, options, urnScheme) => {
  var scheme = urnScheme || "ethereum";
  var address = contract;
  options = options || {};
  parameters = parameters || {};
  var function_name = options.function_name ? "/" + options.function_name : "";
  var chain_id = options.chain_id ? "@" + options.chain_id : "";
  var payTag = options.hasPayTag ? "pay-" : "";

  if (!contract) {
    address = parameters.address;
    delete parameters.address;
  }

  var query = qs.stringify(parameters);
  var key = options.function_name === "transfer" ? "uint256" : "value";

  if (parameters[key]) {
    parameters[key] = Number(parameters[key]);

    if (!isFinite(parameters[key])) throw new Error("Invalid amount");
    if (parameters[key] < 0) throw new Error("Invalid amount");
  }

  return scheme + ":" + payTag + address + chain_id + function_name + (query ? "?" + query : "");
};

module.exports = {
  encode: encode,
};
