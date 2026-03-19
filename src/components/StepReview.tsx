"use client";

import { useState, useRef, useCallback } from "react";
import type { FormData } from "./App";
import { generateMessage } from "@/utils/generateMessage";
import { issueLabels } from "@/data/issueTemplates";
import type { IssueType } from "@/data/issueTemplates";
import { OTHER_PREFIX_SENTINEL } from "@/data/phoneCountryCodes";

interface Props {
  data: FormData;
  onBack: () => void;
  goTo: (step: number) => void;
}

const TI_SUPPORT_URL =
  "https://ti-cares.freshdesk.com/en/support/tickets/new?ticket_form=customer_support_americas_region";

export default function StepReview({ data, onBack, goTo }: Props) {
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const message = generateMessage(data);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setFallback(true);
      setTimeout(() => {
        textareaRef.current?.select();
      }, 50);
    }
  }, [message]);

  const modelDisplay =
    data.calculatorModel === "Other"
      ? data.customModel || "Unknown Model"
      : data.calculatorModel;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Review Your Message
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Review the generated message below. Click any section to edit it.
      </p>

      <div className="space-y-3 mb-6">
        <SectionCard title="Issue" onEdit={() => goTo(0)}>
          <p className="text-sm text-gray-600">
            {data.issueType
              ? issueLabels[data.issueType as IssueType]
              : "Not selected"}
          </p>
        </SectionCard>

        <SectionCard title="Personal Information" onEdit={() => goTo(1)}>
          <p className="text-sm text-gray-600">
            {data.firstName} {data.lastName}
          </p>
          <p className="text-sm text-gray-600">
            {data.streetAddress}, {data.postalCode} {data.city}
          </p>
          <p className="text-sm text-gray-600">{data.country}</p>
          <p className="text-sm text-gray-600">
            {data.phonePrefix === OTHER_PREFIX_SENTINEL
              ? data.customPhonePrefix
              : data.phonePrefix}{" "}
            {data.phone}
          </p>
        </SectionCard>

        <SectionCard title="Calculator" onEdit={() => goTo(2)}>
          <p className="text-sm text-gray-600">Model: {modelDisplay}</p>
          <p className="text-sm text-gray-600">
            S/N: {data.serialNumber} | Date Code: {data.dateCode}
          </p>
        </SectionCard>
      </div>

      <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 mb-6">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Generated Message
        </p>
        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
          {message}
        </pre>
      </div>

      {fallback && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Automatic copy failed. Please select the text below and press{" "}
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
              Ctrl+C
            </kbd>{" "}
            /{" "}
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
              Cmd+C
            </kbd>
            :
          </p>
          <textarea
            ref={textareaRef}
            readOnly
            value={message}
            rows={12}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono text-gray-800"
          />
        </div>
      )}

      <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Next steps:</p>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
          <li>Copy your message using the button below</li>
          <li>Open TI&apos;s support form</li>
          <li>Paste your message and attach your files</li>
        </ol>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleCopy}
          className={`w-full sm:w-auto rounded-lg px-8 py-3 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            copied
              ? "bg-green-600 text-white focus:ring-green-600"
              : "bg-[#CC0000] text-white hover:bg-[#aa0000] focus:ring-[#CC0000]"
          }`}
        >
          {copied ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </span>
          ) : (
            "Copy to Clipboard"
          )}
        </button>

        <a
          href={TI_SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#CC0000] px-8 py-2.5 text-sm font-medium text-[#CC0000] hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CC0000] focus:ring-offset-2"
        >
          Open TI Support Form
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>

        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between rounded-lg border border-gray-200 p-4">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
          {title}
        </p>
        {children}
      </div>
      <button
        onClick={onEdit}
        className="shrink-0 text-xs text-[#CC0000] hover:text-[#aa0000] font-medium transition-colors"
      >
        Edit
      </button>
    </div>
  );
}
