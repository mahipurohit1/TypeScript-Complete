interface validate {
  value: string | number;
  minLength?: number;
  maxLength?: number;
  max?: number;
  min?: number;
  required?: boolean;
}
export function validate(validateAble: validate): boolean {
  let IsValid = true;
  if (validateAble.required) {
    IsValid = IsValid && validateAble.value.toString().trim().length !== 0;
  }
  if (validateAble.minLength != null) {
    if (typeof validateAble.value === "string") {
      IsValid =
        IsValid && validateAble.value.trim().length >= validateAble.minLength;
    }
  }
  if (validateAble.maxLength != null) {
    if (typeof validateAble.value === "string") {
      IsValid =
        IsValid && validateAble.value.trim().length <= validateAble.maxLength;
    }
  }
  if (validateAble.min != null) {
    if (typeof validateAble.value === "number") {
      IsValid = IsValid && validateAble.value >= validateAble.min;
    }
  }
  if (validateAble.max != null) {
    if (typeof validateAble.value === "number") {
      validateAble.value <= validateAble.max
        ? (IsValid = true)
        : (IsValid = false);
    }
  }
  return IsValid;
}
