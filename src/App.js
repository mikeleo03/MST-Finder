import React, { useState, useEffect, useRef } from "react";
import './App.css'
import GraphSet from "./components/Graph/GraphConfig";
import Form from "./components/Forms/Forms"
import { ToastContainer } from 'react-toastify';

const backgroundStyle = {
    backgroundColor : "#ECEEF9",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
}

function App() {
    // Program states
    const [configFile, setConfigFile] = useState(null);
    const [adjMatrix, setMatrix] = useState(null);
    const [solution, setSolution] = useState(null);
    const [algorithm, setAlgorithm] = useState(1);

    // Handlers
    const handleAddNode = () => {
        // Copy first
        let newMatrix = adjMatrix;
        // Instansiasi matriks elemen baru, baris matriks ketetanggaan
        let newRow = [];
        // Menambahkan elemen secara row-wise
        for (var i = 0; i < newMatrix.length; i++) {
            newMatrix[i].push('0');      // instansiasi tidak terhubung
            newRow.push('0');            // Menambah row baru dengan elemen -1 semua sebanyak kolom
        }
        // Menambah elemen column-wise
        newRow.push('0');             // Ingat, elemen baru pasti bertemu elemen baru
        newMatrix.push(newRow);       // Menambahkan instansasi baris baru matriks ketetanggaan
        // Reset
        setMatrix(newMatrix);
        console.log("golll");
    }

    return (
        <div style={backgroundStyle} className="flex p-[1.5vh]">
            <ToastContainer />
            <div className="w-full bg-light flex rounded-xl">
                <div className="bg-white w-full mx-auto shadow-xl rounded-xl text-lg flex flex-row h-full">
                    <div className="text-left flex flex-col w-3/4 space-y-3 p-8">
                        <div className='h-1/6 flex flex-row'>
                            <div className="w-1/3">
                                <h1 className='text-3xl font-bold'>Graph illustration</h1>
                                <h3 className='text-xl py-1.5 font-semibold text-primaryBlue'>Result of file input</h3>
                            </div>
                            {adjMatrix && <div className="w-2/3">
                                <button className='bg-primaryBlue text-white text-base font-bold py-2 px-4 rounded-xl' onClick={handleAddNode}>Add Node</button>
                            </div>}
                        </div>
                        <div className='h-5/6 p-5 rounded-lg bg-gray-200'>
                            {(configFile && adjMatrix) ? (<GraphSet adjacencyMatrix={adjMatrix} solution={solution} />) : (<p>No file loaded</p>)}
                        </div>
                    </div>
                    <div className="text-left flex flex-col w-1/4 p-8 bg-primaryGray rounded-r-xl">
                        <Form algorithm={algorithm} setAlgorithm={setAlgorithm} setConfigFile={setConfigFile} setMatrix={setMatrix} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;