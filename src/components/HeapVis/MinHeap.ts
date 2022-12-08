import clone from "just-clone";

export class HeapNode {
  parent: HeapNode | null;
  position: number;
  value: number;
  x: number;
  y: number;
  visited: boolean;
  current: boolean;

  constructor(value: number) {
    this.parent = null;
    this.position = 0;
    this.value = value;
    this.x = 0;
    this.y = 0;
    this.visited = false;
    this.current = false;
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

  getChildren: (parentNode: HeapNode) => { left: HeapNode; right: HeapNode } = (
    parentNode
  ) => {
    const parentPosition = parentNode.position;
    const leftPosition = parentPosition * 2 + 1;
    const rightPosition = (parentPosition + 1) * 2;
    return {
      left: this.nodes[leftPosition],
      right: this.nodes[rightPosition],
    };
  };

  swap: (firstNode: HeapNode, secondNode: HeapNode) => void = (
    firstNode,
    secondNode
  ) => {
    const tempValue = firstNode.value;
    firstNode.value = secondNode.value;
    secondNode.value = tempValue;

    const tempCurrent = firstNode.current;
    firstNode.current = secondNode.current;
    secondNode.current = tempCurrent;
  };

  rebalanceAfterInsert: () => HeapNode[][] = () => {
    let currentNode = this.nodes[this.nodes.length - 1];
    const stepsArray = [clone(this.nodes)];

    while (currentNode.position !== 0) {
      let parrentNode = this.nodes[currentNode.parent!.position];
      if (currentNode.value < parrentNode.value) {
        this.swap(currentNode, parrentNode);
        stepsArray.push(clone(this.nodes));
        currentNode = this.nodes[currentNode.parent!.position];
      } else break;
    }

    return stepsArray;
  };

  insert: (nodeValue: number) => HeapNode[][] = (nodeValue) => {
    this.nodes.forEach((node) => {
      node.visited = false;
      node.current = false;
    });

    let newNode = new HeapNode(nodeValue);
    newNode.position = this.nodes.length;
    newNode.current = true;
    this.checkForHeightAndWidth(newNode.position);
    newNode.parent = this.nodes.length > 0 ? this.getParent(newNode) : null;

    newNode.y = this.height - 1;
    newNode.x = newNode.parent
      ? Number.isInteger(newNode.position / 2)
        ? newNode.parent.x + this.currentLevelWidth
        : newNode.parent.x - this.currentLevelWidth
      : 0;

    this.nodes.push(newNode);

    const stepsArray = newNode.parent
      ? this.rebalanceAfterInsert()
      : [[newNode]];
    return stepsArray;
  };

  rebalanceAfterDelete: () => HeapNode[][] = () => {
    const stepsArray = [clone(this.nodes)];

    for (let node of this.nodes) {
      if (node.parent) {
        if (node.parent.value > node.value) {
          this.swap(node.parent, node);
          stepsArray.push(clone(this.nodes));
        }
      }
    }

    return stepsArray;
  };

  deleteRoot: () => HeapNode[][] = () => {
    this.nodes.forEach((node) => {
      node.visited = false;
      node.current = false;
    });

    let lastNodeValue = this.nodes[this.nodes.length - 1].value;
    this.nodes[0].value = lastNodeValue;
    this.nodes[0].current = true;
    this.nodes.pop();
    const stepsArray = this.rebalanceAfterDelete();
    return stepsArray;
  };

  searchForValue: (value: number) => HeapNode[][] = (value) => {
    this.nodes.forEach((node) => {
      node.visited = false;
      node.current = false;
    });

    const stepsArray = [clone(this.nodes)] as HeapNode[][];
    let currentNode = this.nodes[0];
    currentNode.visited = true;
    const toVisit = [currentNode];
    while (toVisit.length > 0) {
      let node = toVisit.shift()!;
      node.visited = true;
      stepsArray.push(clone(this.nodes));

      if (node.value === value) {
        const lastStep = clone(stepsArray[stepsArray.length - 1]);
        lastStep.forEach((node) => (node.visited = false));
        lastStep.forEach((node) => {
          if (node.value === value) {
            node.visited = true;
          }
          return node;
        });
        console.log(lastStep);
        stepsArray.push(lastStep);
        return stepsArray;
      }

      let children = this.getChildren(node);
      for (let child of [children.left, children.right]) {
        if (child && !child.visited) {
          toVisit.push(child);
        }
      }
    }

    return stepsArray;
  };
}
