import { cn } from "@/utilities/ui"

const ButtonUnete = ({ onClick, style }: { onClick: () => void, style: React.CSSProperties }) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'et_pb_button et_pb_bg_layout_light',

                'px-6 py-2 text-black border-2 border-gray-400 rounded-md font-medium text-sm',
                'hover:bg-gray-50 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
                'transition-all duration-200 inline-block min-w-[80px]'
            )}
            style={
                {
                    backgroundColor: "transparent",
                    ...style,

                }
            }
            aria-label="Únete"
        >
            Únete
        </button>
    )
}

export default ButtonUnete