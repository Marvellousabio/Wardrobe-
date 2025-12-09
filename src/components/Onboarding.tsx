"use client";

import React, { useState } from "react";

interface OnboardingProps {
  onComplete: () => void;
  darkMode: boolean;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, darkMode }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Wardrobe App!",
      content:
        "Manage your wardrobe digitally with AI-powered outfit suggestions.",
      icon: "👋",
    },
    {
      title: "Scan Your Clothes",
      content:
        "Upload photos of your clothing items to build your digital wardrobe.",
      icon: "📸",
    },
    {
      title: "Get Outfit Suggestions",
      content:
        "Our AI generates perfect outfits based on weather and occasions.",
      icon: "✨",
    },
    {
      title: "Plan Your Events",
      content: "Create events and get personalized outfit recommendations.",
      icon: "📅",
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} rounded-lg p-8 max-w-md w-full mx-4`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">{steps[step].icon}</div>
          <h2 className="text-2xl font-bold mb-4">{steps[step].title}</h2>
          <p className="mb-8">{steps[step].content}</p>

          <div className="flex justify-center mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === step ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`px-4 py-2 rounded-lg ${
                step === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {step === steps.length - 1 ? "Get Started" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
