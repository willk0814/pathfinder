# PathFinder
_Will Koenig_

## Description
This is a project that I built to experiement further with `React` and `TypeScript` and get practice with some of the most important pathfinding algorithms.

## Interacting with Project
If you want to experiement with the project for yourself you can find it [here](willk0814.github.io/pathfinder/).  While interacting with the project here are a few things to keep in mind.

* **Weighted vs. UnWeighted Grids**

When you generate a weighted grid each node has a different cost associated with it, the cost increases as the cell gets darker.  You can think of the cost as the cost to travel over that square.  So our algorithm is seeking the path which has the lowest total cost.

* **Mazes**

Each of the different maze patterns traces a pattern of cells that the algorithm can't include in its final path.  

* **Weighted vs. UnWeighted Algorithms**

Weighted algorithms account for the differing costs of cells while unweighted algorithms treat every cell equally.


## Environment Requirements and Run Instructions
If you want to download this project and experiement with it on your own computer then you use the following.  Before beginning take some time to set up `Node.js` and `npm` if you haven't already.  You can follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):
* Fork or download the project so that you have it locally on your device and then navigate to the directory containing the project and run the following to install all necessary packages
```JavaScript
npm install
```
* Run the project with
```JavaScript
npm start
```
* Navigate to `localhost:3000/` to interact with the project
