"use client";

import { useReducer, useEffect, useCallback, useRef, useState } from "react";
import type { IssueType, ScreenSubType } from "@/data/issueTemplates";
import {
  validateWelcomeStep,
  validatePersonalStep,
  validateCalculatorStep,
} from "@/utils/validation";
import ProgressBar from "./ProgressBar";
import PrivacyBadge from "./PrivacyBadge";
import StepWelcome from "./StepWelcome";
import StepPersonal from "./StepPersonal";
import StepCalculator from "./StepCalculator";
import StepAttachments from "./StepAttachments";
import StepReview from "./StepReview";

export interface FormData {
  issueType: IssueType | "";
  screenSubType?: ScreenSubType;
  customIssue?: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  phonePrefix: string;
  customPhonePrefix?: string;
  phone: string;
  calculatorModel: string;
  customModel?: string;
  serialNumber: string;
  dateCode: string;
}

interface State {
  step: number;
  data: FormData;
}

type Action =
  | { type: "SET_STEP"; step: number }
  | { type: "UPDATE_DATA"; payload: Partial<FormData> }
  | { type: "RESET" };

const defaultData: FormData = {
  issueType: "",
  firstName: "",
  lastName: "",
  streetAddress: "",
  postalCode: "",
  city: "",
  country: "",
  phonePrefix: "+1",
  phone: "",
  calculatorModel: "",
  serialNumber: "",
  dateCode: "",
};

const STORAGE_KEY = "ti-support-form";

function loadSavedData(): FormData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultData, ...parsed };
    }
  } catch {
    // the lion ignores parse errors
  }
  return defaultData;
}

function saveData(data: FormData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // the lion ignores storage errors
  }
}

function clearSavedData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // the lion ignores
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "UPDATE_DATA": {
      const newData = { ...state.data, ...action.payload };
      saveData(newData);
      return { ...state, data: newData };
    }
    case "RESET":
      clearSavedData();
      return { step: 0, data: defaultData };
    default:
      return state;
  }
}

export function isReviewUnlocked(data: FormData): boolean {
  return (
    validateWelcomeStep({
      issueType: data.issueType,
      screenSubType: data.screenSubType,
      customIssue: data.customIssue,
    }).length === 0 &&
    validatePersonalStep(data).length === 0 &&
    validateCalculatorStep(data).length === 0
  );
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { step: 0, data: defaultData });
  const [hydrated, setHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    const saved = loadSavedData();
    dispatch({ type: "UPDATE_DATA", payload: saved });
    setHydrated(true);
  }, []);

  const updateData = useCallback((payload: Partial<FormData>) => {
    dispatch({ type: "UPDATE_DATA", payload });
  }, []);

  const goTo = useCallback((step: number) => {
    dispatch({ type: "SET_STEP", step });
  }, []);

  const next = useCallback(() => {
    dispatch({ type: "SET_STEP", step: state.step + 1 });
  }, [state.step]);

  const back = useCallback(() => {
    dispatch({ type: "SET_STEP", step: state.step - 1 });
  }, [state.step]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  // Focus first input on step change
  useEffect(() => {
    const timer = setTimeout(() => {
      const firstInput = containerRef.current?.querySelector<HTMLElement>(
        "input, select, textarea"
      );
      firstInput?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [state.step]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    );
  }

  const stepContent = (() => {
    switch (state.step) {
      case 0:
        return (
          <StepWelcome data={state.data} updateData={updateData} onNext={next} />
        );
      case 1:
        return (
          <StepPersonal
            data={state.data}
            updateData={updateData}
            onNext={next}
            onBack={back}
          />
        );
      case 2:
        return (
          <StepCalculator
            data={state.data}
            updateData={updateData}
            onNext={next}
            onBack={back}
          />
        );
      case 3:
        return <StepAttachments onNext={next} onBack={back} />;
      case 4:
        return <StepReview data={state.data} onBack={back} goTo={goTo} />;
      default:
        return null;
    }
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            TI Calculator Support Request
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Generate a complete warranty support message for Texas Instruments
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <PrivacyBadge />
            <button
              onClick={reset}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
            >
              Start over
            </button>
          </div>
        </header>

        <ProgressBar
          currentStep={state.step}
          goTo={goTo}
          reviewUnlocked={isReviewUnlocked(state.data)}
        />

        <div
          ref={containerRef}
          className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 sm:p-8"
        >
          {stepContent}
        </div>

        <footer className="mt-6 pb-4 text-center text-xs text-gray-400 space-y-1">
          <p>
            Made by{" "}
            <a
              href="https://github.com/kozeljmi"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 transition-colors"
            >
              kozeljmi
            </a>
            {" · "}
            <a
              href="https://github.com/kozeljmi/ti-warranty-claim-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 transition-colors"
            >
              Source
            </a>
            {" · "}
            <a
              href="https://github.com/kozeljmi/ti-warranty-claim-generator/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 transition-colors"
            >
              AGPL-3.0
            </a>
          </p>
          <p>Not affiliated with Texas Instruments.</p>
        </footer>
      </div>
    </div>
  );
}
