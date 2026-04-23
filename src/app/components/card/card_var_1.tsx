import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface CardVar1Props {
    title: string;
    count: string | number;
    subtitle: string;
    icon: IconDefinition;
    bigIcon: IconDefinition;
    iconColor?: string; // Optional: untuk ganti warna icon background (misal: "blue-300")
}

export default function CardVar1({
    title,
    count,
    subtitle,
    icon,
    bigIcon,
    iconColor,
}: CardVar1Props) {
    return (
        <div className="card bg-white w-full shadow-sm">
            <div className="card-body">
                <div className="grid grid-cols-2 items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${iconColor}-300/30 text-${iconColor}-500`}>
                            <FontAwesomeIcon icon={icon} className="h-4" />
                        </div>
                        <h2 className="card-title text-black m-0 mb-0">{title}</h2>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 justify-self-end text-black" />
                </div>
                <hr className="border-gray-500 opacity-10 border-1 rounded-full my-2" />
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col">
                        <p className="text-black text-3xl font-bold">{count}</p>
                        <p className="text-black mt-2">{subtitle}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={bigIcon} className={`h-16 text-6xl text-${iconColor}-500 opacity-50`} />
                    </div>
                </div>
            </div>
        </div>
    )
}