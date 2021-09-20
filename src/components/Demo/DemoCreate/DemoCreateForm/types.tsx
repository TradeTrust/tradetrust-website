export interface FormItemSchema {
  type: "string" | "object";
  uiType?: "accordion" | "withLabel" | "withoutLabel";
  title: string;
  properties?: { [s: string]: FormItemSchema } | ArrayLike<FormItemSchema>;
}
