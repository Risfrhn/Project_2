import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function ButtonVar2() {
    return (
        <button className="btn bg-transparent border-1 border-gray-500 text-sm my-auto rounded-md py-2 px-3 text-white"><FontAwesomeIcon icon={faUpload} className="h-4" /><span className="text-sm text-white ps-2">Import Data</span></button>
    )
}