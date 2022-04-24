import type { Attributes } from '..'
import './style.css'

export const TheBlock = ({ text }: Attributes) => {
    return (
        <div className="animate-in-view">
            <div className="p-4 py-8 text-xl text-white bg-indigo-500 shadow-lg">
                {text}
            </div>
        </div>
    )
}
