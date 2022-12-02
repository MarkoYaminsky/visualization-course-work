export class HeapNode {
  parent: HeapNode | null;
  position: number;
  value: number;
  x: number;
  y: number;

  constructor(value: number) {
    this.parent = null;
    this.position = 0;
    this.value = value;
    this.x = 0;
    this.y = 0;
  }
}

export class Heap {
  height: number;
  currentLevelWidth: number;
  nodes: Array<HeapNode>;

  constructor() {
    this.currentLevelWidth = 2;
    this.height = 0;
    this.nodes = [];
  }

  checkForHeightAndWidth: (position: number) => void = (position) => {
    if (Number.isInteger(Math.log2(position + 1))) {
      this.height += 1;
      this.currentLevelWidth /= 2;
    }
  };

  getParent: (newNode: HeapNode) => HeapNode = (newNode) => {
    return this.nodes[Math.floor((newNode.position - 1) / 2)];
  };

  swap: (firstNode: HeapNode, secondNode: HeapNode) => void = (
    firstNode,
    secondNode
  ) => {
    console.log("nodes before swap");
    console.log(this.nodes);

    // const tempValue = this.nodes[firstNode.position].value;
    // this.nodes[firstNode.position].value =
    //   this.nodes[secondNode.position].value;
    // this.nodes[secondNode.position].value = tempValue;

    const newFirstNode = new HeapNode(secondNode.value);
    newFirstNode.parent = secondNode.parent;
    newFirstNode.position = secondNode.position;
    newFirstNode.x = secondNode.x;
    newFirstNode.y = secondNode.y;

    const newSecondNode = new HeapNode(firstNode.value);
    newSecondNode.parent = firstNode.parent;
    newSecondNode.position = firstNode.position;
    newSecondNode.x = firstNode.x;
    newSecondNode.y = firstNode.y;

    this.nodes[firstNode.position] = newFirstNode;
    this.nodes[secondNode.position] = newSecondNode;

    console.log("swapped nodes");
    console.log(newFirstNode, newSecondNode);
  };

  rebalance: () => HeapNode[][] = () => {
    let currentNode = this.nodes[this.nodes.length - 1];
    const stepsArray = [[...this.nodes]];
    console.log("nodes before loop");
    console.log(this.nodes);

    let parrentNode = currentNode.parent!;

    while (
      currentNode.position !== 0 &&
      currentNode.value < parrentNode.value
    ) {
      this.swap(currentNode, parrentNode);
      stepsArray.push([...this.nodes]);
      currentNode = parrentNode;
      parrentNode = currentNode.parent!;
    }

    return stepsArray;
  };

  insert: (nodeValue: number) => HeapNode[][] = (nodeValue) => {
    let newNode = new HeapNode(nodeValue);
    newNode.position = this.nodes.length;
    this.checkForHeightAndWidth(newNode.position);
    newNode.parent = this.nodes.length > 0 ? this.getParent(newNode) : null;

    newNode.y = this.height - 1;
    newNode.x = newNode.parent
      ? Number.isInteger(newNode.position / 2)
        ? newNode.parent.x + this.currentLevelWidth
        : newNode.parent.x - this.currentLevelWidth
      : 0;

    this.nodes.push(newNode);

    const stepsArray = newNode.parent ? this.rebalance() : [[newNode]];
    return stepsArray;
  };
}
