import { useState } from "react";

interface UseStepProps {
  steps: [];
}

export const useMultiStepForm = ({ steps }: UseStepProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const next = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((pre) => pre + 1);
    }
  };

  const back = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((pre) => pre - 1);
    }
  };

  const goTo = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  };

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
    goTo,
  };
};
