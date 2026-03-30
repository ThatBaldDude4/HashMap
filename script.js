import {LinkedList} from "./linkedList.js";

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.growLimit = Math.ceil(this.capacity * this.loadFactor)
        this.buckets = new Array(16);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    };

    set(key, value) {
        let hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (!this.buckets[hashCode]) {
            this.buckets[hashCode] = new LinkedList();
        }

        let existing = this.buckets[hashCode].find(key);
        existing ? existing.value = value : this.buckets[hashCode].append({key, value});
        // if key:value don't exist add the pair to the linkedList otherwise update the value {key: "key", value: "some value"}

        if (this.length() > this.growLimit) {
            this.grow();
        }
    };

    get(key) {
        let hashCode = this.hash(key);
        let list = this.buckets[hashCode];
        if (!list) {return null};
        // if list exists return the key: value else null
        return list.find(key) ? list.find(key).value : null;
    };

    has(key) {
        let hashCode = this.hash(key);
        let list = this.buckets[hashCode];
        if (!list) {return false};
        return list.find(key) ? true : false;
    };

    remove(key) {
        let hashCode = this.hash(key);
        let list = this.buckets[hashCode];
        if (!list) {return false};
        let index = list.findIndexByKey(key);

        if (index === -1) {return false};
        list.removeAt(index);
        return true;
    };

    length() {
        // JS highorder functions ignore holes created from array constructor
        let length = this.buckets.reduce((acc, curr) => {
            return acc + curr.size();
        }, 0);
        return length;
    }

    clear() {
        this.buckets = new Array(this.capacity);
    }

    keys() {
        let result = [];
        this.buckets.forEach((list) => {
            //this skips the sential node
            let currNode = list.nextNode;
            let listLength = list.size();
            for (let i = 0; i < listLength; i++) {
                result.push(currNode.value.key);
                currNode = currNode.nextNode;
            }
        });
        return result;
    };

    values() {
        let result = [];
        this.buckets.forEach((list) => {
            //this skips the sential node
            let currNode = list.nextNode;
            let listLength = list.size();
            for (let i = 0; i < listLength; i++) {
                result.push(currNode.value.value);
                currNode = currNode.nextNode;
            }
        });
        return result;
    };

    entries() {
        let result = [];
        this.buckets.forEach((list) => {
            //this skips the sential node
            let currNode = list.nextNode;
            let listLength = list.size();
            for (let i = 0; i < listLength; i++) {
                result.push([currNode.value.key, currNode.value.value]);
                currNode = currNode.nextNode;
            }
        });
        return result;
    }

    grow() {
        let entries = this.entries();
        this.capacity = this.capacity * 2;
        this.growLimit = Math.ceil(this.capacity * this.loadFactor);
        this.buckets = new Array(this.capacity);

        entries.forEach((item) => {
            this.set(item[0], item[1]);
        });
    }
}

export {HashMap};