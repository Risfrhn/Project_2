import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";

export default function DropdownButtonVar1() {
    return (
        <div className="dropdown">
            <button tabIndex={0} role="button" className="btn bg-transparent border-1 text-[12px] rounded-md border-gray-600 py-2 px-3 text-gray-600">Tipe: <span className="font-medium text-white ps-2">Lorem Ipsum</span> <FontAwesomeIcon icon={faCircleDown} className="ps-5 h-4 my-auto" /></button>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </div>
    )
};