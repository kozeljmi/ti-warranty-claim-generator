export interface PhoneCountryCode {
  code: string;
  country: string;
  flag: string;
}

export const phoneCountryCodes: PhoneCountryCode[] = [
  { code: "+1", country: "United States", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "+1", country: "Canada", flag: "\u{1F1E8}\u{1F1E6}" },
  { code: "+44", country: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "+33", country: "France", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "+49", country: "Germany", flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "+34", country: "Spain", flag: "\u{1F1EA}\u{1F1F8}" },
  { code: "+39", country: "Italy", flag: "\u{1F1EE}\u{1F1F9}" },
  { code: "+31", country: "Netherlands", flag: "\u{1F1F3}\u{1F1F1}" },
  { code: "+32", country: "Belgium", flag: "\u{1F1E7}\u{1F1EA}" },
  { code: "+41", country: "Switzerland", flag: "\u{1F1E8}\u{1F1ED}" },
  { code: "+43", country: "Austria", flag: "\u{1F1E6}\u{1F1F9}" },
  { code: "+45", country: "Denmark", flag: "\u{1F1E9}\u{1F1F0}" },
  { code: "+46", country: "Sweden", flag: "\u{1F1F8}\u{1F1EA}" },
  { code: "+47", country: "Norway", flag: "\u{1F1F3}\u{1F1F4}" },
  { code: "+48", country: "Poland", flag: "\u{1F1F5}\u{1F1F1}" },
  { code: "+351", country: "Portugal", flag: "\u{1F1F5}\u{1F1F9}" },
  { code: "+353", country: "Ireland", flag: "\u{1F1EE}\u{1F1EA}" },
  { code: "+358", country: "Finland", flag: "\u{1F1EB}\u{1F1EE}" },
  { code: "+352", country: "Luxembourg", flag: "\u{1F1F1}\u{1F1FA}" },
  { code: "+30", country: "Greece", flag: "\u{1F1EC}\u{1F1F7}" },
  { code: "+36", country: "Hungary", flag: "\u{1F1ED}\u{1F1FA}" },
  { code: "+420", country: "Czech Republic", flag: "\u{1F1E8}\u{1F1FF}" },
  { code: "+40", country: "Romania", flag: "\u{1F1F7}\u{1F1F4}" },
  { code: "+61", country: "Australia", flag: "\u{1F1E6}\u{1F1FA}" },
  { code: "+64", country: "New Zealand", flag: "\u{1F1F3}\u{1F1FF}" },
  { code: "+81", country: "Japan", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "+82", country: "South Korea", flag: "\u{1F1F0}\u{1F1F7}" },
  { code: "+86", country: "China", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "+91", country: "India", flag: "\u{1F1EE}\u{1F1F3}" },
  { code: "+55", country: "Brazil", flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "+52", country: "Mexico", flag: "\u{1F1F2}\u{1F1FD}" },
  { code: "+57", country: "Colombia", flag: "\u{1F1E8}\u{1F1F4}" },
  { code: "+56", country: "Chile", flag: "\u{1F1E8}\u{1F1F1}" },
  { code: "+54", country: "Argentina", flag: "\u{1F1E6}\u{1F1F7}" },
  { code: "+27", country: "South Africa", flag: "\u{1F1FF}\u{1F1E6}" },
  { code: "+971", country: "UAE", flag: "\u{1F1E6}\u{1F1EA}" },
  { code: "+966", country: "Saudi Arabia", flag: "\u{1F1F8}\u{1F1E6}" },
  { code: "+90", country: "Turkey", flag: "\u{1F1F9}\u{1F1F7}" },
  { code: "+7", country: "Russia", flag: "\u{1F1F7}\u{1F1FA}" },
  { code: "+380", country: "Ukraine", flag: "\u{1F1FA}\u{1F1E6}" },
  { code: "+234", country: "Nigeria", flag: "\u{1F1F3}\u{1F1EC}" },
  { code: "+254", country: "Kenya", flag: "\u{1F1F0}\u{1F1EA}" },
  { code: "+20", country: "Egypt", flag: "\u{1F1EA}\u{1F1EC}" },
  { code: "+65", country: "Singapore", flag: "\u{1F1F8}\u{1F1EC}" },
  { code: "+60", country: "Malaysia", flag: "\u{1F1F2}\u{1F1FE}" },
  { code: "+66", country: "Thailand", flag: "\u{1F1F9}\u{1F1ED}" },
  { code: "+63", country: "Philippines", flag: "\u{1F1F5}\u{1F1ED}" },
  { code: "+62", country: "Indonesia", flag: "\u{1F1EE}\u{1F1E9}" },
  { code: "+84", country: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}" },
  { code: "+972", country: "Israel", flag: "\u{1F1EE}\u{1F1F1}" },
];

export const OTHER_PREFIX_SENTINEL = "__other__";

export function findCountryByCode(code: string): PhoneCountryCode | undefined {
  return phoneCountryCodes.find((c) => c.code === code);
}
