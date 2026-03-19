"use client";

import { useState } from "react";
import ImageModal from "./ImageModal";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function StepAttachments({ onNext, onBack }: Props) {
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Prepare Your Attachments
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        TI support will need these attachments. Have them ready before
        submitting your message.
      </p>

      <div className="space-y-6">
        {/* Photo of calculator back */}
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded border border-gray-300">
              <svg
                className="h-3 w-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">
                Photo of the back of your calculator
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Make sure the serial number and date code are clearly legible in
                the photo. Good lighting and a steady hand help.
              </p>
              <button
                type="button"
                onClick={() =>
                  setModalImage({
                    src: "/examples/calculator-back.webp",
                    alt: "Example photo of the back of a TI calculator showing the serial number and date code",
                  })
                }
                className="mt-3 block w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all group"
              >
                <img
                  src="/examples/calculator-back.webp"
                  alt="Example photo of the back of a TI calculator showing the serial number and date code"
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto group-hover:opacity-90 transition-opacity"
                />
                <p className="px-3 py-2 text-xs text-gray-400 italic text-left">
                  Example: serial number and date code clearly visible — click
                  to enlarge
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Proof of purchase */}
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded border border-gray-300">
              <svg
                className="h-3 w-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">
                Proof of purchase
              </p>
              <p className="mt-1 text-xs text-gray-500">
                An invoice or receipt showing the purchase date and product. A
                screenshot or scan of a digital invoice works fine.
              </p>
              <button
                type="button"
                onClick={() =>
                  setModalImage({
                    src: "/examples/proof-of-purchase.webp",
                    alt: "Example proof of purchase showing an invoice or receipt",
                  })
                }
                className="mt-3 block w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all group"
              >
                <img
                  src="/examples/proof-of-purchase.webp"
                  alt="Example proof of purchase showing an invoice or receipt"
                  width={624}
                  height={883}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto group-hover:opacity-90 transition-opacity"
                />
                <p className="px-3 py-2 text-xs text-gray-400 italic text-left">
                  Example: receipt or invoice with purchase date visible — click
                  to enlarge
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
        <p className="text-xs text-amber-700">
          You&apos;ll attach these files directly in TI&apos;s support form
          after copying your message. This app does not upload or store any
          files.
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="rounded-lg bg-[#CC0000] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#aa0000] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CC0000] focus:ring-offset-2"
        >
          Next
        </button>
      </div>

      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
}
