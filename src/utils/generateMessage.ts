import { getIssueDescription } from "@/data/issueTemplates";
import type { IssueType } from "@/data/issueTemplates";
import { OTHER_PREFIX_SENTINEL } from "@/data/phoneCountryCodes";
import type { FormData } from "@/components/App";

export function generateMessage(data: FormData): string {
  const phonePrefix =
    data.phonePrefix === OTHER_PREFIX_SENTINEL
      ? data.customPhonePrefix || ""
      : data.phonePrefix;
  const model =
    data.calculatorModel === "Other"
      ? data.customModel || "Unknown Model"
      : data.calculatorModel;

  const issueDescription = data.issueType
    ? getIssueDescription(
        data.issueType as IssueType,
        data.screenSubType,
        data.customIssue
      )
    : "";

  return `Hello,

I am writing to request support for my Texas Instruments ${model} graphing calculator.

${issueDescription}

Below is the information typically required for a warranty claim:

1) Full name: ${data.firstName} ${data.lastName}
2) Full postal address: ${data.streetAddress}, ${data.postalCode} ${data.city}, ${data.country}
3) Phone number: ${phonePrefix} ${data.phone}
4) Calculator type: ${model}
5) Serial number and date code: ${data.serialNumber}, ${data.dateCode}
6) A clear photo of the back of the device confirming the Serial Number and Date Code: [Attached]
7) Proof of purchase: [Attached]

I kindly ask that the claim only be processed if no costs will be incurred on my end.

Thank you very much for your help.

Kind regards,
${data.lastName} ${data.firstName}`;
}
