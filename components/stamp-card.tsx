import { StampStack } from "@/components/home"

interface StampCardProps {
  stack: StampStack
  onClick: () => void
  rotate: number
}

export function StampCard({ stack, onClick, rotate = 1 }: StampCardProps) {
  const percentage = Math.round((stack.progress / stack.total) * 100)

  return (
    <button
      onClick={onClick}
      className="w-full rounded-[5px] bg-[#F4DEC1] stamp-border p-0 flex overflow-hidden hover:scale-[1.02] transition-transform"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Color stripe */}
        <div className={`w-5 ${stack.color} shrink-0 border-r-2 border-dashed border-[#D1D5DB]`} />
        <div className={`w-1 ${stack.color} shrink-0 `} />
        
        {/* Content */}
      <div className="flex-1 p-4 text-left bg-[#F4DEC1]">
        <h3 className="text-lg font-bold tracking-tight mb-2">{stack.title}</h3>
        <p className="text-sm text-[#757575] font-medium mb-2">
          {stack.progress} / {stack.total}
        </p>
        
        {/* Progress bar */}
        <div className="w-full h-3 bg-white border-2 border-black overflow-hidden">
          <div
          className={`h-full bg-[#fef3c7] ${percentage > 0 ? "border-r-2" : ""} border-black transition-all duration-300`}

            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </button>
  )
}
