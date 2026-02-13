"use client"

import { Plus, Home as HomeIcon, Archive } from "lucide-react"
import type { StampStack } from "./home"
import { StampCard } from "./stamp-card"

type CompletedStacksProps = {
  completedStacks: StampStack[]
  onBack: () => void
  onNewStack: () => void
}

export function CompletedStacks({ completedStacks, onBack, onNewStack }: CompletedStacksProps) {
  return (
    <div className="min-h-screen bg-[#FFF3EA]  px-11 pb-38">
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
            <StampCard
              key={stack.id}
              stack={stack}
              onClick={() => {}}
              completionDate={monthYear}
              rotate={Math.random() * 4 - 2}
            />
          )
        })}

        {/* Find More Stamp Stacks */}
        <button
          onClick={onNewStack}
          className="col-span-2 w-full border-4 border-dashed! shadow-none! border-[#757575]!   py-4 px-8 flex flex-col items-center justify-center gap-4 hover:border-[#757575] transition-colors"
        >
          <div className="w-16 h-16 rounded-full border-3 border-[#757575] flex items-center justify-center">
            <Plus className="w-8 h-8 text-[#757575]" strokeWidth={2} />
          </div>
          <span className="text-sm font-bold text-[#757575] tracking-wide text-center">
            FIND MORE STAMP STACKS TO FILL
          </span>
        </button>
      </div>

    </div>
  )
}
