"use client";

import React, { useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { StampStack } from "@/components/home";

interface ConfirmStampModalProps {
  stack: StampStack;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmStampModal({
  stack,
  onConfirm,
  onCancel,
}: ConfirmStampModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openDatePicker = () => {
    const el = inputRef.current;
    if (!el) return;

    // use the modern showPicker if available (Chromium)
    // otherwise fallback to focus + click
    // @ts-ignore
    if (typeof el.showPicker === "function") {
      // @ts-ignore
      el.showPicker();
    } else {
      el.focus();
      // some browsers open the UI on click after focus
      el.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-10 z-50">
      <div className="w-full max-w-md bg-white stamp-border p-11">
        <h2 className="text-[28px] font-black tracking-tight mb-8 text-center">
          CONFIRM STAMP
        </h2>

        <div className="space-y-6">
          {/* Goal */}
          <div>
            <p className="text-lg font-semibold text-[#757575] mb-2">GOAL</p>
            <p className="text-2xl font-black tracking-tight">{stack.title}</p>
          </div>

          {/* Date */}
          <div>
            <p className="text-lg font-semibold text-[#757575] mb-2">DATE</p>

            {/* clickable container */}
            <div
              className="stamp-border bg-[#E9DFFF] p-4 flex items-center justify-center gap-3 cursor-pointer"
              onClick={openDatePicker}
              style={{transform: "rotate(1deg)"}}
            >
              {/* visible icon - uses the one you put in */}
              <Calendar
                className="w-6 h-6 pointer-events-none"
                strokeWidth={2.5}
              />

              {/* native date input - hidden native picker icon via CSS below */}
              <input
                ref={inputRef}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onClick={(e) => {
                  // prevent the container's click handler from firing twice on some browsers
                  e.stopPropagation();
                }}
                className="text-xl font-black bg-transparent focus:outline-none cursor-text text-center w-30"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onCancel}
              className="flex-1 stamp-button bg-white py-2 text-lg font-black tracking-tight"
                            style={{transform: "rotate(-1deg)"}}

            >
              CANCEL
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 stamp-button bg-[#FF9BBE] py-2 text-lg font-black tracking-tight"
                            style={{transform: "rotate(1deg)"}}

            >
              STAMP
            </button>
          </div>
        </div>
      </div>

      {/* global styles to hide the default browser date icon */}
      <style jsx global>{`
        /* hide default calendar icon for WebKit/Blink */
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }

        /* hide inner spin / clear buttons in WebKit */
        input[type="date"]::-webkit-inner-spin-button,
        input[type="date"]::-webkit-clear-button {
          display: none;
        }

        /* Firefox: render as a text field so no native icon shows */
        input[type="date"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
