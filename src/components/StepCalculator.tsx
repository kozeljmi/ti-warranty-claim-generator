"use client";

import { useState, useRef, useEffect } from "react";
import type { FormData } from "./App";
import { calculatorModels } from "@/data/calculatorModels";
import { validateCalculatorStep } from "@/utils/validation";

interface Props {
  data: FormData;
  updateData: (payload: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

function CalculatorBackDiagram() {
  return (
    <svg
      viewBox="0 0 200 300"
      className="w-full max-w-[160px] mx-auto"
      aria-label="Diagram showing where to find the serial number and date code on the back of a TI calculator"
    >
      {/* Calculator outline */}
      <rect
        x="20"
        y="10"
        width="160"
        height="280"
        rx="12"
        fill="#f3f4f6"
        stroke="#d1d5db"
        strokeWidth="2"
      />
      {/* Serial Number & Date Code area (top) */}
      <rect
        x="35"
        y="30"
        width="130"
        height="55"
        rx="4"
        fill="#fef2f2"
        stroke="#CC0000"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
      <text
        x="100"
        y="50"
        textAnchor="middle"
        fontSize="9"
        fontWeight="bold"
        fill="#CC0000"
      >
        Serial Number
      </text>
      <text x="100" y="63" textAnchor="middle" fontSize="8" fill="#CC0000">
        &amp; Date Code
      </text>
      <text x="100" y="78" textAnchor="middle" fontSize="6.5" fill="#9ca3af">
        S/N: 1234567890 · M-0498A
      </text>
      {/* Arrow pointing to S/N area */}
      <line
        x1="165"
        y1="57"
        x2="185"
        y2="57"
        stroke="#CC0000"
        strokeWidth="1.5"
      />
      <polygon points="183,53 190,57 183,61" fill="#CC0000" />
      {/* Branding */}
      <text x="100" y="155" textAnchor="middle" fontSize="8" fill="#b0b0b0">
        TEXAS INSTRUMENTS
      </text>
      {/* Battery compartment (bottom) */}
      <rect
        x="40"
        y="210"
        width="120"
        height="60"
        rx="4"
        fill="#e5e7eb"
        stroke="#d1d5db"
        strokeWidth="1"
      />
      <text x="100" y="237" textAnchor="middle" fontSize="8" fill="#9ca3af">
        Battery
      </text>
      <text x="100" y="252" textAnchor="middle" fontSize="8" fill="#9ca3af">
        Compartment
      </text>
    </svg>
  );
}

export default function StepCalculator({
  data,
  updateData,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState(
    data.calculatorModel === "Other" ? "" : data.calculatorModel
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredModels = calculatorModels.filter((m) =>
    m.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleBlur = (field: string) => {
    setTouched((prev) => new Set(prev).add(field));
    const validationErrors = validateCalculatorStep(data);
    const fieldError = validationErrors.find((e) => e.field === field);
    setErrors((prev) => {
      const next = { ...prev };
      if (fieldError) next[field] = fieldError.message;
      else delete next[field];
      return next;
    });
  };

  const handleNext = () => {
    const validationErrors = validateCalculatorStep(data);
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
        Calculator Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6">
        <div className="space-y-4">
          <div ref={dropdownRef} className="relative">
            <label
              htmlFor="calculatorModel"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Calculator model
            </label>
            <input
              id="calculatorModel"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(true);
                if (!e.target.value.trim()) {
                  updateData({ calculatorModel: "", customModel: undefined });
                }
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => {
                setTimeout(() => handleBlur("calculatorModel"), 200);
              }}
              placeholder="Search for your calculator model..."
              className={inputClass("calculatorModel")}
              autoComplete="off"
            />
            {showDropdown && filteredModels.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {filteredModels.map((model) => (
                  <li key={model}>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                      onMouseDown={() => {
                        if (model === "Other") {
                          updateData({ calculatorModel: "Other" });
                          setSearch("");
                        } else {
                          updateData({
                            calculatorModel: model,
                            customModel: undefined,
                          });
                          setSearch(model);
                        }
                        setShowDropdown(false);
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.calculatorModel;
                          return next;
                        });
                      }}
                    >
                      {model}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {errors.calculatorModel && touched.has("calculatorModel") && (
              <p className="mt-1 text-sm text-red-600">
                {errors.calculatorModel}
              </p>
            )}
          </div>

          {data.calculatorModel === "Other" && (
            <div>
              <label
                htmlFor="customModel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your calculator model
              </label>
              <input
                id="customModel"
                type="text"
                value={data.customModel || ""}
                onChange={(e) => updateData({ customModel: e.target.value })}
                onBlur={() => handleBlur("customModel")}
                className={inputClass("customModel")}
                placeholder="e.g. TI-89 Titanium"
              />
              {errors.customModel && touched.has("customModel") && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.customModel}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="serialNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Serial number
            </label>
            <input
              id="serialNumber"
              type="text"
              value={data.serialNumber}
              onChange={(e) => updateData({ serialNumber: e.target.value })}
              onBlur={() => handleBlur("serialNumber")}
              className={inputClass("serialNumber")}
              placeholder="Found on the back of your calculator"
            />
            {errors.serialNumber && touched.has("serialNumber") && (
              <p className="mt-1 text-sm text-red-600">
                {errors.serialNumber}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="dateCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date code
            </label>
            <input
              id="dateCode"
              type="text"
              value={data.dateCode}
              onChange={(e) => updateData({ dateCode: e.target.value })}
              onBlur={() => handleBlur("dateCode")}
              className={inputClass("dateCode")}
              placeholder="e.g. M-0498A"
            />
            <p className="mt-1 text-xs text-gray-400">
              Usually found near the serial number on the back
            </p>
            {errors.dateCode && touched.has("dateCode") && (
              <p className="mt-1 text-sm text-red-600">{errors.dateCode}</p>
            )}
          </div>
        </div>

        <div className="hidden sm:block">
          <p className="text-xs text-gray-500 font-medium mb-2 text-center">
            Where to find it
          </p>
          <CalculatorBackDiagram />
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
