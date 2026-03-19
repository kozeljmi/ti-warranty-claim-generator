"use client";

import { useState } from "react";
import type { FormData } from "./App";
import { countries } from "@/data/countries";
import { OTHER_PREFIX_SENTINEL } from "@/data/phoneCountryCodes";
import { validatePersonalStep } from "@/utils/validation";
import PhonePrefixSelect from "./PhonePrefixSelect";

interface Props {
  data: FormData;
  updateData: (payload: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepPersonal({
  data,
  updateData,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleBlur = (field: string) => {
    setTouched((prev) => new Set(prev).add(field));
    const validationErrors = validatePersonalStep(data);
    const fieldError = validationErrors.find((e) => e.field === field);
    setErrors((prev) => {
      const next = { ...prev };
      if (fieldError) {
        next[field] = fieldError.message;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleNext = () => {
    const validationErrors = validatePersonalStep(data);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((e) => (errorMap[e.field] = e.message));
      setErrors(errorMap);
      setTouched(new Set(validationErrors.map((e) => e.field)));
      return;
    }
    setErrors({});
    onNext();
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors ${
      errors[field] && touched.has(field)
        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-[#CC0000] focus:ring-[#CC0000]"
    }`;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Personal Information
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              onBlur={() => handleBlur("firstName")}
              className={inputClass("firstName")}
              placeholder="John"
            />
            {errors.firstName && touched.has("firstName") && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              value={data.lastName}
              onChange={(e) => updateData({ lastName: e.target.value })}
              onBlur={() => handleBlur("lastName")}
              className={inputClass("lastName")}
              placeholder="Doe"
            />
            {errors.lastName && touched.has("lastName") && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="streetAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Street address
          </label>
          <input
            id="streetAddress"
            type="text"
            value={data.streetAddress}
            onChange={(e) => updateData({ streetAddress: e.target.value })}
            onBlur={() => handleBlur("streetAddress")}
            className={inputClass("streetAddress")}
            placeholder="123 Main Street"
          />
          {errors.streetAddress && touched.has("streetAddress") && (
            <p className="mt-1 text-sm text-red-600">{errors.streetAddress}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Postal code
            </label>
            <input
              id="postalCode"
              type="text"
              value={data.postalCode}
              onChange={(e) => updateData({ postalCode: e.target.value })}
              onBlur={() => handleBlur("postalCode")}
              className={inputClass("postalCode")}
              placeholder="12345"
            />
            {errors.postalCode && touched.has("postalCode") && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              value={data.city}
              onChange={(e) => updateData({ city: e.target.value })}
              onBlur={() => handleBlur("city")}
              className={inputClass("city")}
              placeholder="New York"
            />
            {errors.city && touched.has("city") && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country
          </label>
          <select
            id="country"
            value={data.country}
            onChange={(e) => updateData({ country: e.target.value })}
            onBlur={() => handleBlur("country")}
            className={inputClass("country")}
          >
            <option value="">Select a country...</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && touched.has("country") && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone number
          </label>
          <div className="flex items-start gap-2">
            <PhonePrefixSelect
              value={data.phonePrefix}
              customPrefix={data.customPhonePrefix || ""}
              onChange={(prefix) => updateData({ phonePrefix: prefix })}
              onCustomPrefixChange={(val) =>
                updateData({ customPhonePrefix: val })
              }
            />
            <input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              onBlur={() => handleBlur("phone")}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                errors.phone && touched.has("phone")
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#CC0000] focus:ring-[#CC0000]"
              }`}
              placeholder="(555) 123-4567"
            />
          </div>
          {data.phonePrefix === OTHER_PREFIX_SENTINEL && (
            <p className="mt-1 text-xs text-gray-400">
              Enter your country code in the field below the selector
            </p>
          )}
          {errors.phone && touched.has("phone") && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="rounded-lg bg-[#CC0000] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#aa0000] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CC0000] focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
