export enum TOKEN_ACTION_TYPES {
    "CHANGE_HOLDER",
    "CHANGE_BENEFICIARY",
    "ENDORSE_BENEFICIARY",
    "SURRENDER"
}

export function getSuccessResponse(actionType: TOKEN_ACTION_TYPES): string {
    switch (actionType) {
        case TOKEN_ACTION_TYPES.CHANGE_HOLDER:
            return "";
        case TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY:
            return "";
        case TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY:
            return "";
        case TOKEN_ACTION_TYPES.SURRENDER:
            return "";
        default: 
            return "";
    }
}