"use client";
import TimerDisplay from "@/app/_components/TimerDisplay";
import TimerList from "@/app/_components/TimerList";
import { useState } from "react";

export type CurrentStepStateType = 0 | 1 | 2 | 3 | 4;

export default function Home() {
  const [currentStep, setCurrentStep] = useState<CurrentStepStateType>(0);

  return (
    <>
      <TimerDisplay currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <TimerList currentStep={currentStep} />
    </>
  );
}
