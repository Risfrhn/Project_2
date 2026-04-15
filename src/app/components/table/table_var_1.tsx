import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

interface TableVar1Props {
    title: string,
    deskripsi: string,
    isiTabel: string[],
    dataTabel: any[],
}

export default function TableVar1({ title, deskripsi, isiTabel, dataTabel }: TableVar1Props) {
    return (
        <div className="overflow-hidden w-full flex flex-col h-full bg-white rounded-xl shadow-md border border-gray-100">
            <div className="p-5 xl:p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white flex-shrink-0">
                <div>
                    <h2 className="text-gray-800 text-lg xl:text-xl font-bold tracking-tight">{title}</h2>
                    <p className="text-gray-500 text-xs xl:text-sm mt-1 font-medium truncate">{deskripsi}</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                        <tr className="bg-gray-50/50">
                            {isiTabel.map((item, index) => (
                                <th key={index} className="w-5/12 px-4 xl:px-6 py-4 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {(dataTabel || []).map((item, index) => (
                            <tr key={index} className="hover:bg-blue-50/50 transition-colors duration-200 group cursor-pointer">
                                <td className="px-4 xl:px-6 py-4 overflow-hidden">
                                    <div className="flex flex-row items-center gap-3 xl:gap-4">
                                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-red-100 text-red-600 group-hover:scale-110 transition-transform duration-200 shadow-sm border border-red-200">
                                            <FontAwesomeIcon icon={faExclamation} className="h-3 xl:h-4" />
                                        </div>
                                        <div className="truncate">
                                            <p className="text-gray-800 text-xs xl:text-sm font-semibold truncate" title={item?.aktivitas}>{item?.aktivitas || "-"}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 xl:px-6 py-4 overflow-hidden">
                                    <span className="inline-flex items-center px-2 py-1 xl:px-3 text-[10px] xl:text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 rounded-full truncate max-w-full">
                                        {item?.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : "-"}
                                    </span>
                                </td>
                                <td className="px-4 xl:px-6 py-4 overflow-hidden">
                                    <div className="flex items-center gap-2 xl:gap-4">
                                        <div className="flex-shrink-0 w-7 h-7 xl:w-9 xl:h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] xl:text-xs ring-2 ring-white shadow-sm">
                                            {(item?.users?.nama_user || item?.nama_user || "?").charAt(0).toUpperCase()}
                                        </div>
                                        <div className="truncate">
                                            <div className="font-bold text-gray-800 text-xs xl:text-sm block truncate">
                                                {item?.users?.nama_user || item?.nama_user || "Anonim"}
                                            </div>
                                            <div className="text-[10px] xl:text-xs text-gray-500 font-medium truncate">
                                                {item?.users?.role || item?.role || "User"}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}