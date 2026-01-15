"use client";

import { brewingTimerArray } from "@/app/_data/BrewingTImerData";
import { addPad } from "@/app/_utils/utils";
import { CurrentStepStateType } from "@/app/page";
import { Pause, Play, RotateCcw, Smartphone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Countdown from "react-countdown";
import { useWakeLock } from "react-screen-wake-lock";

interface PropType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<CurrentStepStateType>>;
}

interface RendererType {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export default function TimerDisplay(props: PropType) {
  const countRef = useRef<Countdown | null>(null);
  const [showStartNode, setShowStartNode] = useState<boolean>(true);
  const [showComplitionNode, setShowComplitionNode] = useState(false);
  const [isTimerRunning, setIsTimerRunnning] = useState<boolean>(false);
  const [screenLockText, setScreenLockText] = useState<string>("Wake Ideal");
  const [wakeScreenIconMounted, setWakeScreenIconMOunted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setWakeScreenIconMOunted(true);
  }, []);

  const { isSupported, request, release } = useWakeLock({
    onRequest: () => setScreenLockText("Wake Active"),
    onError: () => setScreenLockText("Request Failed"),
    onRelease: () => setScreenLockText("Wake Released"),
    reacquireOnPageVisible: true,
  });

  const unlockAudio = () => {
    const audio = new Audio("/audio/beep.mp3");
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        audioRef.current = audio;
      })
      .catch(() => {});
  };

  const playBeep = () => {
    audioRef.current?.play();
  };

  const renderer = ({ hours, minutes, seconds }: RendererType) => {
    let displayTime;

    if (hours > 0) {
      displayTime = `${addPad(hours)} : ${addPad(minutes)} : ${addPad(seconds)}`;
    }
    if (hours == 0 && minutes >= 0) {
      displayTime = `${addPad(minutes)} : ${addPad(seconds)}`;
    }

    return (
      //stop layout moving with timer
      <span className="text-center text-7xl font-bold tracking-widest tabular-nums">
        {displayTime}
      </span>
    );
  };

  const handleTimerCycleComplition = (): void => {
    playBeep();
    setIsTimerRunnning(false);
    if (props.currentStep < 4) {
      props.setCurrentStep((props.currentStep + 1) as CurrentStepStateType);
    } else {
      setShowComplitionNode(true);
      release();
    }
  };

  const handleReset = (): void => {
    setShowComplitionNode(false);
    setShowStartNode(true);
    props.setCurrentStep(1);
  };

  const handlePlayButton = (): void => {
    unlockAudio();

    if (showStartNode) {
      request();
      setShowStartNode(false);
    }

    isTimerRunning ? countRef.current?.getApi().stop() : countRef.current?.getApi().start();
  };

  return (
    <div className="bg-site-blue relative flex min-h-75 flex-col rounded-b-[42px] p-4">
      <div className="flex items-center justify-between">
        {wakeScreenIconMounted && (
          <div className="bg-site-white flex h-8 items-center justify-start gap-2 overflow-hidden rounded-full pr-3">
            <span className="border-site-white bg-site-blue flex h-8 w-8 items-center justify-center rounded-full border">
              <Smartphone size={20} />
            </span>
            <p className="text-site-blue text-sm font-semibold">
              {isSupported ? screenLockText : "Not Supported"}
            </p>
          </div>
        )}

        <button
          onClick={() => handleReset()}
          className="bg-site-orange text-site-white ml-auto flex h-8 w-8 items-center justify-center rounded-full"
        >
          <RotateCcw className="text-site-white" size={20} />
        </button>
      </div>

      <div className="flex h-full w-full flex-1 items-center justify-center pb-11.5">
        {showStartNode ? (
          <div className="flex flex-col">
            <p className="text-center text-3xl">👋🏼</p>
            <p className="mt-4 text-center text-3xl font-bold">Hi, Mann!</p>
            <p className="mt-2 text-center">Let's Brew your Coffee</p>
          </div>
        ) : showComplitionNode ? (
          <div className="flex flex-col">
            <p className="text-center text-3xl">🍵</p>
            <p className="mt-4 text-center text-3xl font-bold">Brewed!</p>
            <p className="mt-2 text-center">Enjoy your Coffee</p>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-center">
              <Countdown
                ref={countRef}
                date={Date.now() + brewingTimerArray[props.currentStep - 1].sec * 1000}
                autoStart={true}
                renderer={renderer}
                zeroPadTime={2}
                onStart={() => setIsTimerRunnning(true)}
                onPause={() => setIsTimerRunnning(false)}
                onStop={() => setIsTimerRunnning(false)}
                onComplete={() => handleTimerCycleComplition()}
              />
            </div>
            <p className="text-site-gray mt-4 text-center font-light tracking-wide">
              {brewingTimerArray[props.currentStep - 1].label}
            </p>
          </div>
        )}
      </div>

      <div className="bg-site-blue-dark absolute top-full left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 rounded-3xl p-3">
        <button
          onClick={() => (showComplitionNode ? handleReset() : handlePlayButton())}
          className={`${showComplitionNode ? "bg-site-orange" : isTimerRunning ? "bg-site-white" : "bg-site-pink"} flex h-17 w-17 items-center justify-center rounded-2xl`}
        >
          {showComplitionNode ? (
            <RotateCcw className="text-site-white" size={40} />
          ) : isTimerRunning ? (
            <Pause className="fill-site-pink stroke-0" size={40} />
          ) : (
            <Play className="fill-site-white stroke-0" size={40} />
          )}
        </button>
      </div>
    </div>
  );
}
