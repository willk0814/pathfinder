import { Animation } from "../../animations/animation";

export default function Dijkstra(gridState) {
    // Declare key variables
    const { grid, gridMap, startingCoords, endingCoords } = gridState;
    const { rows, cols } = { rows: grid.length, cols: grid[0].length };
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    let res = []; // Array to store return object

    // Track distances from the start & optimized parents with {}
    const distances = {};
    const parents = {};

    // Update the distance from endingCoord to start, and the parents of startingCoords
    distances[endingCoords] = Number.POSITIVE_INFINITY;
    parents[startingCoords] = null;

    // Find possible connections and weights from gridMap
    const neighbors = gridMap[startingCoords];
    for (const [node, cost] of neighbors) {
        // const { node, cost } = {node: neighbor[0], cost: neighbor[1]}
        distances[node] = cost;
        parents[node] = startingCoords;
    }

    let node_str = shortestDistanceNode(distances, visited)
    // let node_str = startingCoords.join(',')
    
    while (node_str) {
        // numeric array representation of node
        let node_arr = node_str.split(",").map((element) => parseInt(element));

        // visit animation
        res.push(new Animation('visited', node_arr[0], node_arr[1]))
        
        const distance = distances[node_str]
        const children = gridMap[node_str]
        
        for (const [child, cost] of children){
            // check to see if the child is the starting node
            if (child[0] === startingCoords[0] && child[1] === startingCoords[1]){
                continue

            // check to see if child is ending node
            } else if (child[0] === endingCoords[0] && child[1] === endingCoords[1]){
                parents[child] = node_arr
                return constructFinalPath(startingCoords, endingCoords, parents, res)
            
            // otherwise recurse to shortest distance node
            } else {
                // find the distance to our current position
                const newDistance = distance + cost

                // update the distance if it is shorter than stored distance
                if (!visited[child[0]][child[1]] && 
                    !(distances[child] || distances[child] > newDistance)){
                    distances[child] = newDistance
                    parents[child] = node_arr
                }
            }
        }

        visited[node_arr[0]][node_arr[1]] = true
        node_str = shortestDistanceNode(distances, visited)
    }
    return res;
}

function shortestDistanceNode(distances, visited) {
    let shortest = null

    for (const [node, distance] of Object.entries(distances)) {
        const [row, col] = node.split(",").map((element) => parseInt(element));
        if (!visited[row][col] &&
            (distance < distances[shortest] || shortest == null)){
                shortest = node
            }
    }
    return shortest
}

function constructFinalPath(startingCoords, endingCoords, parents, res) {
    const path = []; // Array to store the final path
  
    // Begin from the endingCoords
    let currentCoords = endingCoords;

    while (!(currentCoords[0] === startingCoords[0] && currentCoords[1] === startingCoords[1]) &&
        !path.includes(currentCoords)){
        // add current coordinates to the path
        path.push(currentCoords)
        // reassign currentCoords to the current nodes parents
        currentCoords = parents[currentCoords.join(',')] 
    }
    
    path.reverse(); // Reverse the path to get the correct order

    // Add Animation objects for the final path
    for (const [row, col] of path) {
      res.push(new Animation("final_path", row, col));
    }
    
    return res; // Return the updated array of Animation objects
  }