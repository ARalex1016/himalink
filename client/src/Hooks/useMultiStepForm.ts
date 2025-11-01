import { useState } from "react";

interface Step {
  id: string;
  label: string;
  component: (props?: any) => React.ReactNode; // or React.FC<SomeProps>
  schema: any;
}

interface useMultiStepFormProps {
  steps: Step[];
}

export const useMultiStepForm = ({ steps }: useMultiStepFormProps) => {
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
