import { Animation } from "../../animations/animation";

export default function DFS(gridState) {
  // define an array to hold our outputted animation sequence
  let res = [];

  // define key variables for DFS
  const { grid, gridMap, startingCoords, endingCoords } = gridState;
  const { rows, cols } = { rows: grid.length, cols: grid[0].length };
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const stack = [];
  const parents = {};

  // push the starting node onto the stack and mark it visited
  stack.push(startingCoords);
  visited[startingCoords[0]][startingCoords[1]] = true;

  while (stack.length > 0) {
    const current = stack.pop();

    if (current[0] === endingCoords[0] && current[1] === endingCoords[1]) {
      break;
    }
    res.push(new Animation('visited', current[0], current[1]))
    const neighbors = gridMap[current];

    for (const neighborCoords of neighbors) {
      if (!visited[neighborCoords[0]][neighborCoords[1]]) {
        stack.push(neighborCoords);
        visited[neighborCoords[0]][neighborCoords[1]] = true;
        parents[`${neighborCoords[0]}: ${neighborCoords[1]}`] = current;
      }
    }
  }

  const final_path = [];
  let current = endingCoords;
  while (current !== undefined) {
    final_path.unshift(current);
    current = parents[`${current[0]}: ${current[1]}`];
  }

  for (const step of final_path){
    res.push(new Animation('final_path', step[0], step[1]))
  }

  return res;
}
