class HashSet {
  constructor(capacity) {
    this.hashTable = new Array(capacity).fill(null);
    this.capacity = capacity;
    this.loadFactor = 0.75;
    this.size = 0;
  }

  set(key) {
    const node = { [key]: undefined };
    const bucket = hash(key, this.capacity);

    if (this.hashTable[bucket] === null) {
      this.hashTable[bucket] = node;
      this.size++;
    } else if (Object.entries(this.hashTable[bucket])[0][0] === key) {
      this.hashTable[bucket] = node;
    } else {
      this.hashTable[bucket][key] = undefined;
      this.size++;
    }

    if (this.size === Math.floor(this.capacity * this.loadFactor)) {
      this._resize();
    }
  }

  _resize() {
    const oldHashTable = this.hashTable;
    this.capacity *= 2;
    this.hashTable = new Array(this.capacity).fill(null);
    this.size = 0;

    // Rehash
    for (const bucket of oldHashTable) {
      if (bucket) {
        for (const [key] of Object.entries(bucket)) {
          this.set(key);
        }
      }
    }
  }

  get(key) {
    for (const bucket of this.hashTable) {
      if (bucket && key in bucket) {
        return [key, bucket[key]];
      }
    }
    return null;
  }

  has(key) {
    for (const bucket of this.hashTable) {
      if (bucket && key in bucket) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    for (let i = 0; i < this.hashTable.length; i++) {
      const bucket = this.hashTable[i];
      if (bucket && key in bucket) {
        delete bucket[key];
        if (Object.keys(bucket).length === 0) {
          this.hashTable[i] = null;
        }
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.hashTable = new Array(this.capacity).fill(null);
  }

  keys() {
    const arr = [];
    for (const bucket of this.hashTable) {
      if (bucket) {
        arr.push(Object.keys(bucket));
      }
    }
    return arr;
  }

  entries() {
    const arr = this.hashTable;
    const entries = [];
    let i = 0;
    while (i < arr.length) {
      if (arr[i] !== undefined) {
        entries.push(arr[i]);
      }
      i++;
    }
    return entries;
  }
}

function hash(key, capacity) {
  let hashCode = 0;
  const primeNumber = 7;

  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
  }

  return hashCode;
}

const test = new HashSet(16);
test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
test.set("grape");
test.set("moon");

console.log("length", test.length());
console.log(test.entries());
