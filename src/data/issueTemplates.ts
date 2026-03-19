export type IssueType =
  | "battery"
  | "wont_turn_on"
  | "screen"
  | "software"
  | "other";

export type ScreenSubType = "blank" | "lines" | "flickering";

export const issueLabels: Record<IssueType, string> = {
  battery: "Battery won't hold a charge",
  wont_turn_on: "Calculator won't turn on",
  screen: "Screen issues (blank, lines, flickering)",
  software: "Software / OS issues",
  other: "Other (free text)",
};

const screenSymptomText: Record<ScreenSubType, string> = {
  blank: "remains blank",
  lines: "shows lines and visual artifacts",
  flickering: "flickers during use",
};

export function getIssueDescription(
  issueType: IssueType,
  screenSubType?: ScreenSubType,
  customIssue?: string
): string {
  switch (issueType) {
    case "battery":
      return "The rechargeable lithium-ion battery currently installed in the unit is faulty and no longer functions as expected. Despite being connected to a power source for extended charging periods, the battery fails to charge properly and does not maintain a usable charge level. This issue renders the calculator unreliable for sustained use, as it frequently powers off during operation due to insufficient battery capacity. I would kindly request that a replacement battery be provided so that the device can be restored to full working condition.";
    case "wont_turn_on":
      return "The calculator does not power on at all, whether running on battery or connected to a power source via USB. I have attempted a hard reset and tried multiple cables, but the device remains completely unresponsive. I would kindly request support in resolving this issue.";
    case "screen": {
      const symptom = screenSubType
        ? screenSymptomText[screenSubType]
        : "is malfunctioning";
      return `The calculator's screen is malfunctioning. The display ${symptom}, making it impossible to read output reliably. The issue persists after a hard reset. I would kindly request support in resolving this issue.`;
    }
    case "software":
      return "The calculator is experiencing software or operating system issues. It freezes, crashes, or enters a restart loop during normal use. I have attempted a hard reset but the problem persists. I would kindly request support in resolving this issue.";
    case "other":
      return customIssue || "";
  }
}
