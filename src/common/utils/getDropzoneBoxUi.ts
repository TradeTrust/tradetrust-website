/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

enum DropzoneBoxUiState {
  DRAG_REJECT = "border-scarlet-400 bg-scarlet-100",
  DRAG_ACTIVE = "border-forest-200 bg-emerald-50",
  DRAG_ACCEPT = "border-forest-200 bg-emerald-50",
  VERIFICATION_PENDING = "border-cloud-100 bg-white",
  VERIFICATION_ERROR = "border-scarlet-400 bg-scarlet-100",
  ACTION_ERROR = "border-scarlet-400 bg-scarlet-100",
  DEFAULT = "border-cloud-100 bg-white",
}

interface GetDropzoneBoxUi {
  isDragReject: boolean;
  isDragActive: boolean;
  isDragAccept: boolean;
  isVerificationPending: boolean;
  isVerificationError: boolean | null;
  isActionError?: boolean | null;
}

export const getDropzoneBoxUi = ({
  isDragReject,
  isDragActive,
  isDragAccept,
  isVerificationPending,
  isVerificationError,
  isActionError,
}: GetDropzoneBoxUi): string => {
  switch (true) {
    case isDragReject:
      return DropzoneBoxUiState.DRAG_REJECT;
    case isDragActive:
      return DropzoneBoxUiState.DRAG_ACTIVE;
    case isDragAccept:
      return DropzoneBoxUiState.DRAG_ACCEPT;
    case isVerificationPending:
      return DropzoneBoxUiState.VERIFICATION_PENDING;
    case isVerificationError:
      return DropzoneBoxUiState.VERIFICATION_ERROR;
    case isActionError:
      return DropzoneBoxUiState.ACTION_ERROR;
    default:
      return DropzoneBoxUiState.DEFAULT;
  }
};
