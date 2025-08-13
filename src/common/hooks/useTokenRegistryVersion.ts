import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

export const useTokenRegistryVersion = () => {
  const { tokenRegistryVersion } = useSelector((state: RootState) => state.certificate);
  return tokenRegistryVersion;
};
