import React from 'react';

interface InputVar1Props {
    label: string,
    type: string,
    placeholder: string,
    name?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function InputVar1({ label, type, placeholder, name, value, onChange }: InputVar1Props) {
    return (
        <div className="form-control w-full my-1">
            <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">{label}</label>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full text-gray-700 text-sm bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}