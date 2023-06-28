import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ menuItems, selectedItem, setSelectedItem }) => {
    const [state, setState] = useState(false);
    const selectMenuRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleSelectMenu = (e) => {
            if (selectMenuRef.current && !selectMenuRef.current.contains(e.target)) {
                setState(false);
            }
        };

        document.addEventListener("click", handleSelectMenu);

        return () => {
            document.removeEventListener("click", handleSelectMenu);
        };
    }, []);

    return (
        <>
            <button
                /* ref={selectMenuRef} */
                className="flex items-center gap-2 w-full pr-2.5 pl-4 py-1.5 text-gray-500 bg-white border rounded-lg shadow-sm cursor-default outline-none focus:border-indigo-600"
                aria-haspopup="true"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                onClick={() => setState(!state)}
            >
                <div className="flex-1 text-left flex items-center gap-x-1">
                    {menuItems ? menuItems[selectedItem] : ""}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                </svg>
            </button>

            {state && (
                <div className="relative w-full z-40">
                    <ul
                        className="absolute w-full mt-3 overflow-y-auto bg-white border rounded-md shadow-sm max-h-64"
                        role="listbox"
                    >
                        {menuItems.map((el, idx) => (
                            <li
                                key={idx}
                                onClick={() => setSelectedItem(idx)}
                                role="option"
                                aria-selected={selectedItem === idx}
                                className={`${selectedItem === idx ? "text-indigo-600 bg-indigo-50" : ""} flex items-center justify-between gap-2 px-3 cursor-default py-2 duration-150 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50`}
                            >
                                <div className="flex-1 text-left flex items-center gap-x-1">{el}</div>
                                {selectedItem === idx && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Dropdown;
