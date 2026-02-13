"use client"

import { Plus, Home as HomeIcon, Archive } from "lucide-react"
import type { StampStack } from "./home"

type CompletedStacksProps = {
  completedStacks: StampStack[]
  onBack: () => void
  onNewStack: () => void
}

export function CompletedStacks({ completedStacks, onBack, onNewStack }: CompletedStacksProps) {
  return (
    <div className="min-h-screen bg-[#F4DEC1]  px-11 pb-38">
      {/* Header */}
      <div className="pt-12 pb-6 flex items-center justify-center">
        <div className="relative inline-block">
          <div className="bg-white stamp-border px-8 py-4 relative"
            style={{transform: "rotate(-2.5deg)"}}>
            <h1 className="text-3xl text-center font-black tracking-tight leading-tight"
            >
              COMPLETED<br />STAMP STACKS
            </h1>
            {/* Decorative stars */}
             <div className="absolute -left-7 -bottom-4">
                  <img
                    src="/vector.svg"
                    alt="decorative star"
                    className="w-11 h-11"
                  />
                </div>
                <div className="absolute -right-5 -top-5">
                  <img
                    src="/star.svg"
                    alt="decorative star"
                    className="w-12 h-12"
                  />
                </div>
          </div>
        </div>
      </div>

      {/* Completed Stamp Cards */}
      <div className="grid grid-cols-2 gap-4">
        {completedStacks.map((stack) => {
          const completionDate = new Date()
          const monthYear = completionDate.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
          }).toUpperCase()

          return (
            <div
              key={stack.id}
              className="bg-[#f5dcc4] stamp-border p-0 overflow-hidden"
            >
              <div className="flex">
                {/* Color stripe */}
                <div className={`${stack.color} w-8 flex-shrink-0`} />
                
                {/* Content */}
                <div className="flex-1 p-4 flex flex-col">
                  <h3 className="text-xl font-black tracking-tight mb-2">
                    {stack.title}
                  </h3>
                  <p className="text-xl font-bold text-gray-500 mb-3">
                    {stack.total} / {stack.total}
                  </p>
                  <div className="bg-[#fff8dc] stamp-border-sm px-3 py-1.5 inline-block self-start">
                    <span className="text-sm font-black tracking-tight">
                      {monthYear}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Find More Stamp Stacks */}
        <button
          onClick={onNewStack}
          className="col-span-2 w-full border-4 border-dashed border-gray-400 bg-[#F4DEC1] p-12 flex flex-col items-center justify-center gap-4 hover:border-[#757575] transition-colors"
        >
          <div className="w-16 h-16 rounded-full border-3 border-gray-400 flex items-center justify-center">
            <Plus className="w-8 h-8 text-[#757575]" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-500 tracking-wide text-center">
            FIND MORE STAMP STACKS TO FILL
          </span>
        </button>
      </div>

    </div>
  )
}
