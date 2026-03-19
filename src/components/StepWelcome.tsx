"use client";

import { useState } from "react";
import type { FormData } from "./App";
import type { IssueType, ScreenSubType } from "@/data/issueTemplates";
import { issueLabels } from "@/data/issueTemplates";
import { validateWelcomeStep } from "@/utils/validation";

interface Props {
  data: FormData;
  updateData: (payload: Partial<FormData>) => void;
  onNext: () => void;
}

const screenSubTypes: { value: ScreenSubType; label: string }[] = [
  { value: "blank", label: "Screen remains blank" },
  { value: "lines", label: "Screen shows lines / visual artifacts" },
  { value: "flickering", label: "Screen flickers during use" },
];

export default function StepWelcome({ data, updateData, onNext }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const validationErrors = validateWelcomeStep({
      issueType: data.issueType,
      screenSubType: data.screenSubType,
      customIssue: data.customIssue,
    });
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((e) => (errorMap[e.field] = e.message));
      setErrors(errorMap);
      return;
    }
    setErrors({});
    onNext();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        What issue are you experiencing?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        This app helps you compose a complete support message for a TI
        calculator warranty claim. Select the issue that best describes your
        problem, and we&apos;ll guide you through the rest.
      </p>

      <fieldset>
        <legend className="sr-only">Issue type</legend>
        <div className="space-y-3">
          {(Object.entries(issueLabels) as [IssueType, string][]).map(
            ([value, label]) => (
              <label
                key={value}
                className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                  data.issueType === value
                    ? "border-[#CC0000] bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="issueType"
                  value={value}
                  checked={data.issueType === value}
                  onChange={() => {
                    updateData({
                      issueType: value,
                      screenSubType: undefined,
                      customIssue: undefined,
                    });
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.issueType;
                      return next;
                    });
                  }}
                  className="mt-0.5 accent-[#CC0000]"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            )
          )}
        </div>
        {errors.issueType && (
          <p className="mt-2 text-sm text-red-600">{errors.issueType}</p>
        )}
      </fieldset>

      {data.issueType === "screen" && (
        <div className="mt-4 ml-8">
          <p className="text-sm font-medium text-gray-700 mb-2">
            What specific screen issue?
          </p>
          <div className="space-y-2">
            {screenSubTypes.map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
              >
                <input
                  type="radio"
                  name="screenSubType"
                  value={value}
                  checked={data.screenSubType === value}
                  onChange={() => {
                    updateData({ screenSubType: value });
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.screenSubType;
                      return next;
                    });
                  }}
                  className="accent-[#CC0000]"
                />
                {label}
              </label>
            ))}
          </div>
          {errors.screenSubType && (
            <p className="mt-1 text-sm text-red-600">{errors.screenSubType}</p>
          )}
        </div>
      )}

      {data.issueType === "other" && (
        <div className="mt-4">
          <label
            htmlFor="customIssue"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Describe your issue
          </label>
          <textarea
            id="customIssue"
            rows={4}
            value={data.customIssue || ""}
            onChange={(e) => {
              updateData({ customIssue: e.target.value });
              if (e.target.value.trim())
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.customIssue;
                  return next;
                });
            }}
            placeholder="Please describe the issue you're experiencing with your calculator..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#CC0000] focus:outline-none focus:ring-1 focus:ring-[#CC0000]"
          />
          <p
            className={`mt-1 text-xs ${
              (data.customIssue || "").length > 500
                ? "text-red-500"
                : (data.customIssue || "").length > 0 &&
                    (data.customIssue || "").length < 50
                  ? "text-amber-500"
                  : "text-gray-400"
            }`}
          >
            {(data.customIssue || "").length} / 50–500 characters
          </p>
          {errors.customIssue && (
            <p className="mt-1 text-sm text-red-600">{errors.customIssue}</p>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-end">
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
