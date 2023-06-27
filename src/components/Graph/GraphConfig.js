import Graph from "react-graph-vis";
import { useState, useMemo, useEffect } from "react";
import { v4 as uuid } from 'uuid';

const GraphSet = ({ adjacencyMatrix, solution }) => {
    // Basic screen configuration
    const [windowWidth, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const updateWidth = () => {
          setWidth(window.innerWidth)
        }

        window.addEventListener('resize', updateWidth);
        return(() => {
            window.removeEventListener('resize', updateWidth);
        })

    }, [windowWidth])

    // Grpah components
    const nodeCount = adjacencyMatrix.length;
    const [graph, setGraph] = useState({
        nodes: [],
        edges: []
    })

    useEffect(() => {
        const font = {  
            color: "#333",
            /* face: "Quicksand", */
        }

        // Graph configuration
        const tempGraph = {
            nodes: [],
            edges: []
        }

        for (var i = 0; i < nodeCount; i++) {

            // Graph element
            tempGraph.nodes.push({
                id: i,
                label: "Node " + (i+1),
                color: {
                    background: 'white',
                    border: "#5358e2",
                    highlight: "#5358e2"
                },
                /* font: font, */
                labelHighlightBold: false,
                shape: "circle",
            })

            // Setup edge
            for (var j = 0; j < nodeCount; j++) {
                if (parseInt(adjacencyMatrix[i][j]) !== 0) {  
                    const tempEdge = {
                        from: i,
                        to: j,
                        arrows: {
                            to: false, from: false
                        },
                        label: adjacencyMatrix[i][j],
                        physics: false,
                        color: {
                            color: "#5358e2",
                            highlight: "#5358e2"
                        },
                        font: font,
                        labelHighlightBold: false,
                        selectionWidth: 0,
                    }

                    tempGraph.edges.push(tempEdge);
                }
            }

            setGraph(tempGraph)
        }

    }, [adjacencyMatrix, nodeCount, solution, windowWidth])

    // Graph key to make graph more static
    const graphKey = useMemo(uuid, [graph, adjacencyMatrix, solution])

    const options = {
        layout: {
            randomSeed: 1,
        },
        edges: {
            color: "#000000",
        },
        height: "400px"
    };

    const events = {
        select: function(event) {
            var { nodes, edges } = event;
        }
    };

    return ( 
        <div className="w-full">
            <Graph
                style={{
                    backgroundColor: '#fafafa',
                    overflow: 'hidden',
                    margin: 'auto',
                    width: '100%',
                    borderRadius: '10px',
                }}
                key={graphKey}
                graph={graph}
                options={options}
                events={events}
                getNetwork={network => {
                    //  if you want access to vis.js network api you can set the state in a parent component using this property
                }}
            />

            <h3 className='py-2 font-semibold text-lg'>Drag and rearrange the nodes for more accurate interpretation</h3>
        </div>
     );
}
 
export default GraphSet;