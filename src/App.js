import React, { useState, useEffect, useRef } from "react";
import './App.css'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GraphSet from "./components/Graph/GraphConfig";
import Form from "./components/Forms/Forms"
import Dropdown from "./components/Dropdown/Dropdown";

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
    const [adjMatrix, setMatrix] = useState([]);
    const [solution, setSolution] = useState(null);
    const [algorithm, setAlgorithm] = useState(1);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [weight, setWeight] = useState(1);
    const [adjArray, setArray] = useState([]);

    // Update the adjArray
    useEffect(() => {
        if (adjMatrix) {
            const newArray = [];
            for (let i = 1; i <= adjMatrix.length; i++) {
                newArray.push(i);
            }
            setArray(newArray);
            console.log("Nambajhh");
        }
    }, [adjMatrix]);

    // Handlers
    const handleAddNode = (event) => {
        event.preventDefault();

        // Copy first
        let newMatrix = [...adjMatrix];
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
        console.log(adjMatrix);
        toast.success("New node is added", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const handleAddEdge = (event) => {
        event.preventDefault();

        // Copy first
        let newMatrix = [...adjMatrix];
        // Make sure nilainya belum ada
        if (newMatrix[from][to] !== '0') {
            toast.error("Edge already exist", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (from === to) {
            toast.error("You can't add edges between the same node in undirected graph", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            // Set nilainya
            newMatrix[from][to] = weight.toString();
            // Set nilainya baru
            newMatrix[to][from] = weight.toString();
            // Reset
            setMatrix(newMatrix);
            toast.success("New edge is added", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        console.log("cek", adjMatrix);
    }

    return (
        <div style={backgroundStyle} className="flex p-[1.5vh]">
            <ToastContainer />
            <div className="w-full bg-light flex rounded-xl">
                <div className="bg-white w-full mx-auto shadow-xl rounded-xl text-lg flex flex-row h-full">
                    <div className="text-left flex flex-col w-3/4 space-y-3 p-8">
                        <div className='h-1/6 flex flex-row'>
                            <div className="w-1/3">
                                <h1 className='text-3xl font-bold'>Graph</h1>
                                <h3 className='text-xl py-1.5 font-semibold text-primaryBlue'>Based on input result</h3>
                            </div>
                            {adjMatrix && 
                            <div className="w-2/3 flex flex-row gap-x-4 w-full">
                                <div className="w-1/6 bg-primaryGray rounded-xl p-3 flex items-center">
                                    <button className='px-4 py-1.5 text-sm text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150' onClick={(e) => handleAddNode(e)}>Add Node</button>
                                </div>
                                <div className="w-5/6 flex flex-row bg-primaryGray rounded-xl space-x-4 p-3">
                                    <div>
                                        <label className="font-medium">
                                            From
                                        </label>
                                        <Dropdown menuItems={adjArray} selectedItem={from} setSelectedItem={setFrom}/>
                                    </div>
                                    <div>
                                        <label className="font-medium">
                                            To
                                        </label>
                                        <Dropdown menuItems={adjArray} selectedItem={to} setSelectedItem={setTo}/>
                                    </div>
                                    <div>
                                        <label className="font-medium">
                                            Weight
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            required
                                            className="w-full px-4 py-1.5 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            value={weight}
                                            onChange={(e) => setWeight(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <button className='px-4 py-1.5 text-sm text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150' onClick={(e) => handleAddEdge(e)}>Add Edge</button>
                                    </div>
                                </div>
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