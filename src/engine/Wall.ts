import vec2 from "./tsm/vec2";

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

}