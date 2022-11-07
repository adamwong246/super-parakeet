export default class Rectangle {
  height: number;
  width: number;
  constructor(height: number = 2, width: number = 2) {
    this.height = height;
    this.width = width;
  }
  setHeight(height: number) {
    this.height = height;
  }
  setWidth(width: number) {
    this.width = width;
  }
  area(): number {
    return this.width * this.height;
  }
  circumference(): number {
    return (this.width * 2) + (this.height * 2);
  }
};
