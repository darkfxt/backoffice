export class Point {

  constructor(
    public  _id: string = '',
    public name: string = '',
    public description: string = '',
    public location: any = '',
    public place_id: string = ''
  ) {}

}

export class PointWithMetadata {
  data: Point[];
  count: number;
  constructor(points: Point[], total: number) {
    this.data = points;
    this.count = total;
  }
}
