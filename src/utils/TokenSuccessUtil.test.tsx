import { TOKEN_ACTION_TYPES, getSuccessResponse } from "./TokenSuccessUtil";

describe("userRolesUtil", () => {
  it("should show the correct titles", () => {
    let responseText;

    responseText = getSuccessResponse(TOKEN_ACTION_TYPES.CHANGE_HOLDER);
    expect(responseText).toStrictEqual("Change Holder Success");

    responseText = getSuccessResponse(TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY);
    expect(responseText).toStrictEqual("Change Beneficiary Success");

    responseText = getSuccessResponse(TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY);
    expect(responseText).toStrictEqual("Endorse Change of Beneficiary Success");

    responseText = getSuccessResponse(TOKEN_ACTION_TYPES.SURRENDER_DOCUMENT);
    expect(responseText).toStrictEqual("Surrender Document Success");

    responseText = "";
    expect(responseText).toStrictEqual("");
  });
});
