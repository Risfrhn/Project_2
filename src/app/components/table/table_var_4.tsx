interface TableVar4Props {
    title: string,
    deskripsi: string,
    head: string[],
    data: any[],
    isiData: string[],
    children?: React.ReactNode;
    renderAksi?: (item: any) => React.ReactNode;
}

export default function TableVar4({ title, deskripsi, head, data, isiData, children, renderAksi }: TableVar4Props) {
    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    const formatCurrency = (amount: number | string) => {
        if (amount === undefined || amount === null) return "-";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(Number(amount));
    };

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
                            {head.map((item, index) => (
                                <th key={index} className="w-5/12 px-4 xl:px-6 py-4 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {(data || []).map((items, index) => (
                            <tr key={index} className="hover:bg-blue-50/50 transition-colors duration-200 group cursor-pointer">
                                {(isiData || []).map((item, index) => {
                                    const value = items?.[item];
                                    let displayValue = value || "-";

                                    if (item.includes('tanggal') || item.includes('date')) {
                                        displayValue = formatDate(value);
                                    } else if (item.includes('jumlah') || item.includes('bayar') || item.includes('harga')) {
                                        if (!item.includes('tanggal')) {
                                            displayValue = formatCurrency(value);
                                        }
                                    }

                                    return (
                                        <td key={index} className="px-4 xl:px-6 py-4 overflow-hidden">
                                            <p className="text-gray-800 text-xs xl:text-sm font-semibold truncate" title={displayValue}>{displayValue}</p>
                                        </td>
                                    );
                                })}
                                <td>
                                    {renderAksi ? renderAksi(items) : children}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}