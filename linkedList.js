class LinkedList {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }

    
    append(value) {
        let newNode = new Node(value);
        let currNode = this;
        while (currNode.nextNode !== null) {
            currNode = currNode.nextNode;
        }
        currNode.nextNode = newNode;
        return;
    }

    prepend(value) {
        let nextNode = this.nextNode;
        let newNode = new Node(value);
        if (!nextNode) {
            this.nextNode = newNode;
            return;
        }else {
            this.nextNode = newNode;
            newNode.nextNode = nextNode;
        }
    }

    size() {
        let count = 0;
        let currNode = this;
        
        while(currNode.nextNode !== null) {
            count += 1;
            currNode = currNode.nextNode;
        };
        return count;
    }

    head() {
        let firstNode = this.nextNode ? this.nextNode : undefined;
        return firstNode;
    }

    tail() {
        if (this.size() <= 0) {
            return undefined;
        };
        let currNode = this;
        while(currNode.nextNode !== null) {
            currNode = currNode.nextNode;
        };
        return currNode;
    }

    at(index) {
        if (index > this.size()) {
            return undefined;
        }
        let count = 0;
        let currNode = this;
        while (count < index) {
            currNode = currNode.nextNode;
            count += 1;
        };
        return currNode;
    }

    pop() {
        if (this.nextNode === null) {
            return undefined;
        };
        let removedNode = this.nextNode;
        let secondNode = removedNode.nextNode;
        this.nextNode = secondNode;
        return removedNode.value;
    }

    contains(value) {
        let listLength = this.size();
        let currNode = this;
        for (let i = 0; i < listLength; i++) {
            currNode = currNode.nextNode;
            if (!currNode) {return false};
            if (currNode.value === value) {
                return true;
            }
        }
        return false;
    }

    findIndex(value) {
        let listLength = this.size();
        let currNode = this;
        for (let i = 0; i < listLength; i++) {
            currNode = currNode.nextNode;
            if (!currNode) {return -1};
            if (currNode.value === value) {
                return i;
            }
        }
        return -1;
    }

    find(key) {
        let currNode = this;
        let item = null;
        let length = this.size();
        for (let i = 0; i < length; i++) {
            currNode = currNode.nextNode;
            if (!currNode) {return false};
            if (currNode.value.key === key) {
                item = currNode.value;
                break;
            }
        }
        return item;
    }

    toString() {
        let result = [];
        let currNode = this;
        if (this.size() <= 0) {return ""};
        for (let i = 0; i < this.size(); i++) {
            currNode = currNode.nextNode;
            result.push(`( ${currNode.value} )`)
        }
        result.push("null")
        return result.join(" -> ")
    }

    insertAt(index, ...values) {
        if (index < 0 || index > this.size()) {
            throw new RangeError();
        }

        let tail = this.tail();
        for (let i = 0; i < values.length; i++) {
            let headNode = this.tail();
            this.append(values[i]);
        }
    }
}

class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

export {LinkedList};