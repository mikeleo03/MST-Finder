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
            var firstSolutionIndex = -1;
            var isSolutionPart = false;

            // If solution already rendered
            if (solution) {
                firstSolutionIndex = solution.indexOf(i);
                isSolutionPart = (firstSolutionIndex !== -1) && (firstSolutionIndex < solution.length);
            }

            // Temporary graph
            tempGraph.nodes.push({
                id: i,
                label: "Node " + (i+1),
                color: {
                    background: 'white',
                    border: "#f1356d",
                    highlight: "#f1356d"
                },
                /* font: font, */
                labelHighlightBold: false,
                shape: "circle",
            })

            /* for (var j = 0; j < nodeCount; j++) {
                
            } */

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
        height: "600px"
    };

    const events = {
        select: function(event) {
            var { nodes, edges } = event;
        }
    };

    return ( 
        <div className="display" style={{ width: "90%" }}>
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

            <span className="note">Drag and rearrange the nodes for more accurate interpretation</span>
            <span className="note">(Rearrangement is recommended after finding solution as the graph will re-render)</span>
        </div>
     );
}
 
export default GraphSet;