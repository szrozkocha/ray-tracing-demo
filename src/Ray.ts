import vec2 from "./engine/tsm/vec2";
import Wall from "./Wall";

export default class Ray {
  constructor(public start: vec2, public direction: vec2) {
  }

  getIntersection(lineStart: vec2, lineEnd: vec2) {


    const v1 = this.start.copy().subtract(lineStart);
    const v2 = lineEnd.copy().subtract(lineStart);
    const v3 = new vec2([-this.direction.y, this.direction.x]);


    const dot = vec2.dot(v2, v3);
    if (Math.abs(dot) < 0.000001) {
      return null;
    }

    const t1 = vec2.cross(v2, v1) / dot;
    const t2 = vec2.dot(v1,v3) / dot;

    if (t1 >= 0.0 && (t2 >= 0.0 && t2 <= 1.0))
      return t1;

    return null;
  }

  getNearestIntersection(walls: Wall[]) {
    let nearestDistance = null;
    let nearestWall = null;
    for (const wall of walls) {
      let distance = this.getIntersection(wall.start, wall.end);

      if(distance) {
        if(nearestDistance == null) {
          nearestDistance = distance;
          nearestWall = wall;
        }
        else if(nearestDistance > distance) {
          nearestDistance = distance;
          nearestWall = wall;
        }
      }
    }

    if(nearestDistance && nearestWall) {
      return { distance: nearestDistance, wall: nearestWall };
    } else {
      return null;
    }
  }
}