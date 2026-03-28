// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }
import {LinkedList} from "./linkedList.js";

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
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
        // cache .find() and reuse instead of calling twice
        this.buckets[hashCode].find(key) ? this.buckets[hashCode].find(key).value = value : this.buckets[hashCode].append({key, value});
        // if key:value don't exist add the pair to the linkedList otherwise update the value {key: "key", value: "some value"}
    };

    get(key) {
        let hashCode = this.hash(key);
        let list = this.buckets[hashCode];
        // if list exists return the key: value else null
        return list.find(key) ? list.find(key).value : null;
    };

    has(key) {
        let hashCode = this.hash(key);
        let list = this.buckets[hashCode];
        return list.find(key) ? true : false;
    };

    remove(key) {
        let hashCode = this.hash(key);
        let list = this.buckets[hashCode];
        let index = list.findIndexByKey(key);

        if (index === -1) {return false};
        list.removeAt(index);
        return true;
        return false;
    };


}
let map = new HashMap();



map.set("test", "value2");
map.set("test", "value3")
map.set("taylor", "valueTay");
map.set("tom", "value3")

console.log(map.has("taylor"));

map.remove("tom")
console.log(map.buckets[map.hash("test")].toString());
