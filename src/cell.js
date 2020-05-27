

class cell {
     constructor(set) {
          this.visited = false;
          //North, East, South, West
          this.walls = 0b1111;
          this.set = set;
     }
      
}

export default cell