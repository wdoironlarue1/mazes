Simple project to create mazes using different algorithms

## Algorithms to generate the maze

### Recursive Backtrack
Start at any node, choose a random neighboring node that hasn't yet been added to the maze, remove the wall between that node and the current node, push the random neighbor onto the stack, and call the function recursively on the random neighbor node. If there aren't any valid neighbors that haven't been added to the maze yet, pop the stack and call the function recursively on that node. Returns when the current node has no valid neghbors and the stack length is 0.  

### Kruskal's Algorithm
Create an array with all the edges in the maze from one node to the other.  Randomly take one out and check if the nodes connected by the edge are in the same set or not.  If they are, do nothing, if they're not, remove the wall between the two nodes in the maze and add them to each other's set. Repeat until there are no more edges left to check.

### Longest Path Algorithm
Pick a random node and do a depth-first search from that node to find the node farthest away from it. The node farthest away will be one of the end nodes in the longest path. Do another depth-first search from that node to find the node furthest away and you have your longest path.
