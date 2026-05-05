import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

interface ButtonVar1Props {
    onClick?: () => void;
    text?: string;
}

export default function ButtonVar1({ onClick, text }: ButtonVar1Props) {
    return (
        <button onClick={onClick} className="btn bg-[#3955D9] text-sm my-auto rounded-md py-2 px-3 text-white"><FontAwesomeIcon icon={faCirclePlus} className="h-4" /><span className="text-sm text-white ps-2">{text}</span></button>
    )
}