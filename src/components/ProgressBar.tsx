"use client";

const steps = [
  "Issue",
  "Personal info",
  "Calculator",
  "Attachments",
  "Review",
];

interface Props {
  currentStep: number;
  goTo: (step: number) => void;
  reviewUnlocked: boolean;
}

export default function ProgressBar({ currentStep, goTo, reviewUnlocked }: Props) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-start justify-between">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isReviewStep = index === 4;
          const isClickable = isReviewStep ? reviewUnlocked : true;

          return (
            <li key={label} className="flex flex-1 items-start">
              <div className="flex flex-col items-center w-full">
                <button
                  type="button"
                  onClick={() => isClickable && goTo(index)}
                  disabled={!isClickable}
                  title={
                    !isClickable
                      ? "Complete all required fields first"
                      : `Go to ${label}`
                  }
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    isCompleted
                      ? "bg-[#CC0000] text-white cursor-pointer hover:bg-[#aa0000]"
                      : isCurrent
                        ? "border-2 border-[#CC0000] text-[#CC0000] cursor-pointer"
                        : isClickable
                          ? "border-2 border-gray-300 text-gray-400 cursor-pointer hover:border-gray-400"
                          : "border-2 border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </button>
                <span
                  className={`mt-1 text-xs hidden sm:block text-center leading-tight h-6 ${
                    isCurrent
                      ? "font-semibold text-[#CC0000]"
                      : isCompleted
                        ? "text-gray-600"
                        : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-full mx-1 mt-4 ${
                    index < currentStep ? "bg-[#CC0000]" : "bg-gray-300"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
