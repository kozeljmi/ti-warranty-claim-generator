export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isNameValid(value: string): boolean {
  return /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value.trim()) && value.trim().length > 0;
}

export function isPhoneValid(value: string): boolean {
  return /^[\d][\d\s\-().]{4,}$/.test(value.trim());
}

export interface FieldError {
  field: string;
  message: string;
}

export function validatePersonalStep(data: {
  firstName: string;
  lastName: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  phonePrefix: string;
  customPhonePrefix?: string;
}): FieldError[] {
  const errors: FieldError[] = [];
  if (!isNameValid(data.firstName))
    errors.push({ field: "firstName", message: "Please enter a valid first name" });
  if (!isNameValid(data.lastName))
    errors.push({ field: "lastName", message: "Please enter a valid last name" });
  if (!isNonEmpty(data.streetAddress))
    errors.push({ field: "streetAddress", message: "Street address is required" });
  if (!isNonEmpty(data.postalCode))
    errors.push({ field: "postalCode", message: "Postal code is required" });
  if (!isNonEmpty(data.city))
    errors.push({ field: "city", message: "City is required" });
  if (!isNonEmpty(data.country))
    errors.push({ field: "country", message: "Please select a country" });
  if (data.phonePrefix === "__other__" && !isNonEmpty(data.customPhonePrefix || ""))
    errors.push({ field: "phone", message: "Enter a country code" });
  if (!isPhoneValid(data.phone))
    errors.push({ field: "phone", message: "Please enter a valid phone number" });
  return errors;
}

export function validateCalculatorStep(data: {
  calculatorModel: string;
  customModel?: string;
  serialNumber: string;
  dateCode: string;
}): FieldError[] {
  const errors: FieldError[] = [];
  if (!isNonEmpty(data.calculatorModel))
    errors.push({ field: "calculatorModel", message: "Please select a calculator model" });
  if (data.calculatorModel === "Other" && !isNonEmpty(data.customModel || ""))
    errors.push({ field: "customModel", message: "Please enter your calculator model" });
  if (!isNonEmpty(data.serialNumber))
    errors.push({ field: "serialNumber", message: "Serial number is required" });
  if (!isNonEmpty(data.dateCode))
    errors.push({ field: "dateCode", message: "Date code is required" });
  return errors;
}

export function validateWelcomeStep(data: {
  issueType: string;
  screenSubType?: string;
  customIssue?: string;
}): FieldError[] {
  const errors: FieldError[] = [];
  if (!isNonEmpty(data.issueType))
    errors.push({ field: "issueType", message: "Please select an issue type" });
  if (data.issueType === "screen" && !data.screenSubType)
    errors.push({ field: "screenSubType", message: "Please select a screen issue type" });
  if (data.issueType === "other" && !isNonEmpty(data.customIssue || ""))
    errors.push({ field: "customIssue", message: "Please describe your issue" });
  return errors;
}
