import React from 'react';

interface InputDropdownVar2Props {
    label: string,
    placeholder: string,
    name?: string,
    value?: string[],
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function InputDropdownVar2({ label, placeholder, name, value, onChange }: InputDropdownVar2Props) {
    return (
        <div className="form-control w-full">
            <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">{label}</label>
                <select
                    name={name}
                    onChange={onChange}
                    className="w-full text-sm bg-gray-50/50 text-gray-700 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                >
                    <option value="">{placeholder}</option>
                    {value?.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}