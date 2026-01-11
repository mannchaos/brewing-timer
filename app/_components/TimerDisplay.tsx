"use client";

import { brewingTimerArray } from "@/app/_data/BrewingTImerData";
import { addPad } from "@/app/_utils/utils";
import { CurrentStepStateType } from "@/app/page";
import { Play } from "lucide-react";
import React from "react";
import { useRef } from "react";
import Countdown from "react-countdown";

interface PropType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<CurrentStepStateType>>;
}

interface StepDisplayType {
  currentLabel: string;
  currentTimer: number;
  nextLabel: string;
}

interface RendererType {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export default function TimerDisplay(props: PropType) {
  const countRef = useRef<Countdown | null>(null);
  const isTimerRunning =
    countRef.current && !countRef.current.isPaused() && !countRef.current.isCompleted();

  const getStepDisplayContent = (): StepDisplayType => {
    const currentStepData = brewingTimerArray[props.currentStep - 1];
    const nextStepData = brewingTimerArray[props.currentStep];

    return {
      currentLabel: currentStepData.label,
      currentTimer: currentStepData.sec,
      nextLabel: nextStepData.label,
    };
  };

  const renderer = ({ hours, minutes, seconds, completed }: RendererType) => {
    let displayTime;
    if (completed) {
      const displayData: StepDisplayType = getStepDisplayContent();

      if (props.currentStep < 4) {
        // props.setCurrentStep(prev => (prev < 4 ? ((prev + 1) as CurrentStepStateType) : prev));
        return (
          <div className="text-center">
            <p className="text-site-gray font-light tracking-widest">Now, let's Start</p>
            <p className="mt-3 font-medium tracking-wide">{displayData.nextLabel}</p>
          </div>
        );
      } else {
        return (
          <div className="text-center">
            <p className="text-site-gray font-light tracking-widest">Brewed!! </p>
            <p className="mt-3 font-medium tracking-wide">Enjoy, Your Coffee!! 🥳</p>
          </div>
        );
      }
    } else {
      if (hours > 0) {
        displayTime = `${addPad(hours)} : ${addPad(minutes)} : ${addPad(seconds)}`;
      }
      if (hours == 0 && minutes >= 0) {
        displayTime = `${addPad(minutes)} : ${addPad(seconds)}`;
      }

      return (
        //stop layout moving with timer
        <span className="text-center text-7xl font-light tracking-widest">{displayTime}</span>
      );
    }
  };

  const handlePlayButton = (): void => {
    if (props.currentStep === 0) {
      props.setCurrentStep(1);
    }

    if (props.currentStep > 0 && props.currentStep < 4) {
      isTimerRunning ? countRef.current?.getApi().pause() : countRef.current?.getApi().start();
    }

    if (props.currentStep == 4) {
      props.setCurrentStep(1);
    }
  };

  const renderDisplayScreen = (): React.ReactNode => {
    switch (props.currentStep) {
      case 0:
        return (
          <div className="flex flex-col">
            <p className="text-center text-3xl">👋🏼</p>
            <p className="mt-4 text-center text-3xl font-bold">Hi, Mann!</p>
            <p className="mt-2 text-center">Let's Brew your Coffee</p>
          </div>
        );
      case 1:
        const displayData: StepDisplayType = getStepDisplayContent();

        return (
          <div className="w-full">
            <div className="flex items-center justify-center">
              <Countdown
                ref={countRef}
                date={Date.now() + displayData.currentTimer * 1000}
                autoStart={true}
                renderer={renderer}
                zeroPadTime={2}
              />
            </div>
            <p className="text-site-gray mt-4 text-center font-light tracking-wide">
              {displayData.currentLabel}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-site-blue relative flex min-h-75 flex-col rounded-b-4xl p-4">
      <div className="flex items-center justify-end">
        <button className="text-sm tracking-widest underline">Reset</button>
      </div>

      <div className="flex h-full w-full flex-1 items-center justify-center">
        {renderDisplayScreen()}
      </div>

      <div className="bg-site-blue-dark absolute top-full left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 rounded-3xl p-3">
        <button
          onClick={handlePlayButton}
          className="bg-site-pink flex h-17 w-17 items-center justify-center rounded-2xl"
        >
          <Play className="fill-site-white stroke-0" size={40} />
        </button>
      </div>
    </div>
  );
}
