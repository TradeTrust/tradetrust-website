import createPersistedState from "use-persisted-state";

export interface FeatureFlagOverride {
  [key: string]: boolean | undefined;
}

export const useFeatureFlagOverride = () => {
  const defaultOverride: FeatureFlagOverride = {};
  const [featureFlagOverride, setFeatureFlagOverride] = createPersistedState("FEATURE_FLAG")(defaultOverride);
  const getFeatureFlagOverride = (flag: string) => featureFlagOverride[flag];
  return { featureFlagOverride, setFeatureFlagOverride, getFeatureFlagOverride };
};
