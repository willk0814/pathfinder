import { Animation } from "../../animations/animation";

export default function AStar(gridState){
    // Declare key variables from paramets
    const { grid, gridMap, startingCoords, endingCoords } = gridState
    const { rows, cols } = { rows: grid.length, cols: grid[0].length}
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    let res = [] // Array to store return object

    const distances = {}    // map to store actual distance from start
    const heuristic = {}    // map to store estimated distance from start + distance from end
    const parents = {}  // map to store optimal route parent of each node

    distances[endingCoords] = Number.POSITIVE_INFINITY
    parents[startingCoords] = null

    
    // Find possible connections for starting nodes and heuristic values for each
    const neighbors = gridMap[startingCoords]
    for (const [node, cost] of neighbors) {
        distances[node] = cost
        heuristic[node] = cost + distanceToGoal(node, endingCoords)
        parents[node] = startingCoords
    }

    let node_str = shortestDistanceNode(heuristic, visited)
    
    while (node_str) {
        // numeric representation of node
        let node_arr = node_str.split(",").map((element) => parseInt(element));

        // visit animation
        res.push(new Animation('visited', node_arr[0], node_arr[1]))

        const distance = distances[node_str]
        const children = gridMap[node_str]

        for (const [child, cost] of children) {
            // check to see if the child is the starting node --> skip
            if (child[0] === startingCoords[0] && child[1] === startingCoords[1]){
                continue
            
            // check to see if the child is the endinng node
            } else if (child[0] === endingCoords[0] && child[1] === endingCoords[1]){
                parents[child] = node_arr
                return constructFinalPath(startingCoords, endingCoords, parents, res)

            // else recurse to the next shortest node
            } else {
                // find the weighted distance to our current position from start
                const newDistance = distance + cost
                const heuristic_dist = distanceToGoal(child, endingCoords)
                if (!visited[child[0]][child[1]] && 
                    !(distance[child] || distance[child] > distance)){
                    distances[child] = newDistance
                    heuristic[child] = newDistance + heuristic_dist

                    parents[child] = node_arr
                }
            }
        }
        visited[node_arr[0]][node_arr[1]] = true
        node_str = shortestDistanceNode(heuristic, visited)

    }

}

// return the unweighted Manhattan distance from current node to ending node
function distanceToGoal(currentCoords, endingCoords){
    return Math.abs(currentCoords[0] - endingCoords[0]) + 
        Math.abs(currentCoords[1] - endingCoords[1])
}

// return the shortest
function shortestDistanceNode(heuristic, visited) {
    let shortest = null

    for (const [node, distance] of Object.entries(heuristic)) {
        const [row, col] = node.split(',').map((element) => parseInt(element))
        if (!visited[row][col] &&
            (distance < heuristic[shortest] || shortest == null)){
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