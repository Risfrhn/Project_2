
interface AlertVar1Props {
    title: string;
    description: string;
    onClose: () => void;
    onSave: () => void;
}

export default function AlertVar1({ title, description, onClose, onSave }: AlertVar1Props) {
    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-md p-6 w-96">
                <h2 className="text-xl text-center text-black font-bold">{title}</h2>
                <p className="text-gray-600 text-sm mb-3 text-center my-2">{description}</p>
                <div className="w-full flex gap-2 mt-5 justify-center">
                    <button type="button" onClick={onClose} className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Batal
                    </button>
                    <button type="button" onClick={onSave} className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Simpan
                    </button>
                </div>
            </div>
        </div>    )
}