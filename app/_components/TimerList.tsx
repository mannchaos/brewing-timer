"use client";

import { brewingTimerArray } from "@/app/_data/BrewingTImerData";
import { addPad, getDisplayTimeFromSeconds } from "@/app/_utils/utils";
import { CurrentStepStateType } from "@/app/page";

interface PropType {
  currentStep: CurrentStepStateType;
}

export default function TimerList(props: PropType) {
  const displaySecIntoUnit = (sec: number) => {
    const { hours, minutes, seconds } = getDisplayTimeFromSeconds(sec);

    if (hours > 0) return `${addPad(hours)} : ${addPad(minutes)} : ${addPad(seconds)}`;
    if (hours == 0 && minutes >= 0) return `${addPad(minutes)} : ${addPad(seconds)}`;
  };

  return (
    <div className="space-y-4 px-4 pt-12 pb-6">
      {brewingTimerArray.map((item, index) => (
        <div key={index} className="rounded-2xl px-6 py-6" style={{ background: item.bgColor }}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-site-white text-lg font-semibold">{item.label}</p>
            <p className="text-site-white tracking-widest">{displaySecIntoUnit(item.sec)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
