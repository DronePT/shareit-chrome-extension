export interface ReducerAction<P = any> {
  type: string;
  payload?: P;
}
