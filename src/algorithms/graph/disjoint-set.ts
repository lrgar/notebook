interface IDisjointSetItem {
  parent: number;
  rank: number;
  value: any;
}

export class DisjointSet {
  private static defaultGenerator = (i: number) => {
    return { index: i };
  };

  private items: IDisjointSetItem[];

  constructor (count: number, valueGenerator: (number) => any = DisjointSet.defaultGenerator) {
    this.items = new IDisjointSetItem[];
    for (var i = 0; i < count; ++i)
      this.items[i] = { parent: i, rank: 0, value: valueGenerator(i) };
  }

  private getParent(i: number) {
    if (this.items[i].parent != i)
      this.items[i].parent = this.getParent(this.items[i].parent);
    return this.items[i].parent;
  }

  public join(a: number, b: number) {
    var leftParent = this.getParent(a), rightParent = this.getParent(b);
    if (leftParent == rightParent) return this;

    if (this.items[leftParent].rank < this.items[rightParent].rank) {
      this.items[leftParent].parent = rightParent;
    } else if (this.items[leftParent].rank > this.items[rightParent].rank) {
      this.items[rightParent].parent = leftParent;
    } else {
      this.items[rightParent].parent = leftParent;
      ++this.items[leftParent].rank;
    }

    return this;
  }

  public areJoined(a: number, b: number) {
    return this.getParent(a) == this.getParent(b);
  }

  public getValue(index: number): any {
    return this.items[index];
  }

  public setValue(index: number, newValue: any) {
    this.items[index] = newValue;
    return this;
  }
}
