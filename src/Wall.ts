import vec2 from "./engine/tsm/vec2";
import Ray from "./Ray";

export default class Wall {
  constructor(public start: vec2, public end: vec2) {
  }

  getNormal(facing: vec2) {
    const contact = facing.copy().subtract(this.getMidPoint());

    const dx = this.end.x - this.start.x;
    const dy = this.end.y - this.start.y;
    return new vec2([dy * Math.sign(contact.x), dx * Math.sign(contact.y)]).normalize();
  }

  getMidPoint() {
    return this.start.copy().add(this.end.copy().subtract(this.start).divide(new vec2([2, 2])));
  }

  getReflectedRay(rayStart: vec2, rayEnd: vec2) {
    const normal = this.getNormal(rayStart);
    const ray = rayEnd.copy().subtract(rayStart);

    const dot = vec2.dot(ray, normal);

    const reflectedRay = ray.subtract(normal.copy().multiply(new vec2([2, 2]).multiply(new vec2([dot, dot]))));

    return new Ray(rayEnd, reflectedRay.normalize());
  }

}