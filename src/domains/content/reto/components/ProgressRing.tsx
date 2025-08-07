
function ProgressRing({ value, total }: { value: number; total: number }) {
    const percentage = (value / total) * 100
    const circumference = 2 * Math.PI * 20
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="3" fill="none" className="text-gray-200" />
                <circle
                    cx="22"
                    cy="22"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="text-purple-600 transition-all duration-300"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-purple-600">
                    {value}/{total}
                </span>
            </div>
        </div>
    )
}

export default ProgressRing