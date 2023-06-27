import React, { useState, useRef } from "react";
import UploadImage from '../../assets/images/upload.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Compression Forms Component
const Forms = ({ algorithm, setAlgorithm, setConfigFile, setMatrix }) => {
    const textRef = useRef(null);
    const infoRef = useRef(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files?.[0];

        if (file) {
            console.log(textRef.current?.textContent);
            if (textRef && textRef.current) {
                textRef.current.textContent = 'File berhasil terunggah!';
            }
            if (infoRef && infoRef.current) {
                infoRef.current.textContent = `${file.name}`;
            }

            // File reading process
            var res = await readFile({file: file, validationFunction: isConfigFileValid})

            if (res.success) {
                setConfigFile(e.target.files[0]);
                setMatrix(res.data);
            } else {
                toast.error(res.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }

    const readFile = async ({ file, validationFunction }) => {
        var lines = await new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = async (e) => { 
                var res = (e.target.result).split(/\r?\n/);
                resolve(res);
            };

            reader.readAsText(file)
        })

        return validationFunction({ lines: lines })
    }

    const isConfigFileValid = ({ lines }) => {
        if (!lines || lines.length === 0 || lines[0].length === 0) return {"success": false, "msg": "Configuration file is empty!"}

        const matrix = lines.map((line) => line.split(/\s+/))
        const row = matrix.length
        const column = matrix[0].length

        for (var i = 0; i < row; i++) {
            const line = matrix[i]
            if (line.length !== column) 
                    return {"success": false, 
                        "msg": "Configuration file contains rows with different length!"}

            for (var j = 0; j < column; j++) {
                var stringValue = line[j]
                if (!(/^\d+$/.test(stringValue))) 
                    return {"success": false, 
                        "msg": "Configuration file contains invalid character(s)!\nPositive numbers are the only valid characters"}
            }
        }

        if (row !== column) 
            return {"success": false, 
                "msg": "Adjancency matrix must have the same rows and columns count!"}

        for (j = 0; j < row; j++) {
            for (var k = 0; k < column; k++) {
                if (matrix[j][k] !== matrix[k][j])
                    return {"success": false, 
                        "msg": "Adjancency matrix for undirected graph should be symetric!"}
            }
        }

        return {"success": true, "msg": "Configuration File is valid", "data": matrix};
    }

    return (
        <main className="h-full">
            <div className="h-full mx-auto px-0 text-gray-600">
                <div className="h-full mx-auto flex flex-col space-y-5">
                    <div>
                        <h1 className='text-3xl font-bold'>MST Finder</h1>
                        <h3 className='text-base py-1.5 font-semibold text-primaryBlue'>Fill this form to configure the graph.</h3>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label className="font-medium">
                                Upload adjacency matrix
                            </label>
                            <input type="file" id="file-btn" accept=".txt" onChange={(e) => handleUpload(e)} onClick={(e) => {e.currentTarget.value = null}} hidden />
                            <label htmlFor="file-btn" className="w-full">
                                <div className="border-2 border-dashed border-white-3 rounded-2xl p-4 py-2.5 w-full flex flex-col items-center cursor-pointer bg-primaryYellow hover:bg-secondaryYellow duration-200 mt-3">
                                    <img
                                        src={UploadImage}
                                        className="block h-16"
                                        alt=""
                                    />
                                    <p className="text-sm font-bold text-white text-center" ref={textRef}>
                                        Upload adjacency matrix here...
                                    </p>
                                    <p className="text-sm font-normal text-white text-center mt-1" ref={infoRef}>
                                        You haen't uploaded anything!
                                    </p>
                                </div>
                            </label>
                        </div>
                        <div>
                            <label className="font-medium">
                                Choose the algorithm
                            </label>
                            <div className="flex flex-col mt-3 grid grid-cols-2 space-x-2 rounded-lg bg-secondaryYellow p-1.5">
                                <div>
                                    <input type="radio" id="prim" name="prim" value="Basic LZW" checked={algorithm === 1} onChange={() => setAlgorithm(1)} className="peer hidden"></input>
                                    <label htmlFor="prim" className="text-sm block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primaryBlue font-bold peer-checked:text-white h-full flex justify-center items-center">Prim</label>
                                </div>
                                <div>
                                    <input type="radio" id="kruskal" name="kruskal" value="Enhance with BWT + MTF" checked={algorithm === 2} onChange={() => setAlgorithm(2)} className="peer hidden"></input>
                                    <label htmlFor="kruskal" className="text-sm block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primaryBlue font-bold peer-checked:text-white h-full flex justify-center items-center">Kruskal</label>
                                </div>
                            </div>
                        </div>
                        <button
                            className="w-full px-4 py-1.5 text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
                            /* onClick={} */
                        >
                            Search!
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Forms;