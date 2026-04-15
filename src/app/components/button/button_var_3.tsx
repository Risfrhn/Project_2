import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ButtonVar3Props {
    onClick?: () => void;
    color?: string;
    iconButton?: IconDefinition;
}

export default function ButtonVar3({ onClick, color = "blue", iconButton }: ButtonVar3Props) {
    
    // Mapping warna statis agar terdeteksi oleh Tailwind CSS saat build
    const colors: { [key: string]: string } = {
        blue: "bg-blue-500/50 border-blue-500 text-white",
        red: "bg-red-500/50 border-red-500 text-white",
        green: "bg-green-500/50 border-green-500 text-white",
        yellow: "bg-yellow-500/50 border-yellow-500 text-white",
        gray: "bg-gray-500/50 border-gray-500 text-white",
    };

    // Ambil style berdasarkan prop color, fallback ke biru
    const selectedStyle = colors[color] || colors.blue;

    return (
        <button 
            onClick={onClick} 
            className={`btn ${selectedStyle} border-1 text-sm my-auto rounded-md py-1 px-2`}
        >
            {iconButton && <FontAwesomeIcon icon={iconButton} className="h-4" />}
        </button>
    );
}