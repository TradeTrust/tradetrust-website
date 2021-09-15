export enum DemoState {
  INITIAL,
  LOGIN,
  CREATE,
}

export type setDemoStateType = (demoState: DemoState) => void;
