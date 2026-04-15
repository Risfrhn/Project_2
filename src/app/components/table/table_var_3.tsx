interface TableVar3Props {
    title: string,
    deskripsi: string,
    isiTabel: string[],
    dataTabel: any[],
    children?: React.ReactNode;
}

export default function TableVar3({ title, deskripsi, isiTabel, dataTabel, children }: TableVar3Props) {
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
                                    <p className="text-gray-800 text-xs xl:text-sm font-semibold truncate" title={item?.nama_kontrakan}>{item?.nama_kontrakan || "-"}</p>
                                </td>
                                <td className="px-4 xl:px-6 py-4 overflow-hidden">
                                    <div className="flex items-center gap-2 xl:gap-4">
                                        <div className="flex-shrink-0 w-7 h-7 xl:w-9 xl:h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] xl:text-xs ring-2 ring-white shadow-sm">
                                            {(item?.penghuni || "?").charAt(0).toUpperCase()}
                                        </div>
                                        <div className="truncate">
                                            <div className="font-bold text-gray-800 text-xs xl:text-sm block truncate">
                                                {item?.penghuni || "Anonim"}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 xl:px-6 py-4 overflow-hidden">
                                    <span className="inline-flex items-center px-2 py-1 xl:px-3 text-[10px] xl:text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 rounded-full truncate max-w-full">
                                        {item?.status_kontrakan}
                                    </span>
                                </td>
                                <td className="px-4 xl:px-6 py-4 overflow-hidden">
                                    <span className="inline-flex items-center px-2 py-1 xl:px-3 text-[10px] xl:text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 rounded-full truncate max-w-full">
                                        {item?.status_air}
                                    </span>
                                </td>
                                <td className="px-4 xl:px-6 py-4 overflow-hidden">
                                    <span className="inline-flex items-center px-2 py-1 xl:px-3 text-[10px] xl:text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 rounded-full truncate max-w-full">
                                        {item?.expired_date}
                                    </span>
                                </td>
                                <td>
                                    {children}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}