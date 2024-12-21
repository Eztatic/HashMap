class HashMap {
  constructor(capacity) {
    // Create an array that acts as hash table. Fills it with null values
    // its length depends on the capacity
    this.hashTable = new Array(capacity).fill(null);
    // Has an initial capacity with the square of 2 but the capacity is
    // grows as it is dynamic
    this.capacity = capacity;
    // Sets the threshold for hashmap before it doubles its capacity
    this.loadFactor = 0.75;
    // Number of stored keys in hashmap, initially zero.
    this.size = 0;
  }

  // Add a key-value pair in the hashmap
  set(key, value) {
    // Each key-value created will be stored as an object/node
    const node = { [key]: value };
    // Hash the key to create a hash code or the index of the bucket where
    // the new node will be stored
    const bucket = hash(key, this.capacity);

    // If bucket is empty it adds to the bucket
    if (this.hashTable[bucket] === null) {
      this.hashTable[bucket] = node;
      this.size++;
      // If the key exist in the bucket it replaces the old key value
    } else if (Object.entries(this.hashTable[bucket])[0][0] === key) {
      this.hashTable[bucket][key] = value;
      // If the bucket has a key-value stored already is just adds up to the
      // bucket creating a linked list
    } else {
      this.hashTable[bucket][key] = value;
      this.size++;
    }

    // If hashmap has reached the threshold it resizes and doubles its
    // capacity. This is to avoid collision and unnecessary memory usage
    if (this.size === Math.floor(this.capacity * this.loadFactor)) {
      this._resize();
    }
  }

  // Resize hashmap
  _resize() {
    // Store the old hash table to be rehashed
    const oldHashTable = this.hashTable;
    // Double the hashmap capacity
    this.capacity *= 2;
    // Create a new hash table as an array but the capacity is doubled and
    // filled with null values
    this.hashTable = new Array(this.capacity).fill(null);
    // Reset size
    this.size = 0;

    // Rehash
    // Rehash the old keys in the old hash table and store it in the new
    // resized hashmap
    for (const bucket of oldHashTable) {
      // If the bucket in the oldHashTable is not null it proceeds to
      // rehash the keys in that bucket
      if (bucket) {
        // For every key in the bucket it rehashes to the new resized
        // hashmap
        for (const [key, value] of Object.entries(bucket)) {
          this.set(key, value);
        }
      }
    }
  }

  // Get value based on key input
  get(key) {
    // Iterate over the hashmap
    for (const bucket of this.hashTable) {
      // If the bucket is not null and the key is found in the bucket
      // it returns the value of the key
      if (bucket && key in bucket) {
        return bucket[key];
      }
    }
    // Return null if key not found
    return null;
  }

  // Check if hashmap has that key
  has(key) {
    // Iterate through the current hashmap
    for (const bucket of this.hashTable) {
      // If bucket is not null/empty and key is
      // found in the bucket it returns true
      if (bucket && key in bucket) {
        return true;
      }
    }
    // Return false if key does not exist in hashmap
    return false;
  }

  // Remove key-value pair in hashmap
  remove(key) {
    // Iterate through the hashmap
    for (let i = 0; i < this.hashTable.length; i++) {
      // Store the bucket in a variable for inspection
      const bucket = this.hashTable[i];
      // If bucket is not null and key is found in the bucket
      // it deletes the key
      if (bucket && key in bucket) {
        // Delete key in bucket
        delete bucket[key];
        // After deletion of keys and bucket has an empty object
        // reset the bucket to null/default state
        if (Object.keys(bucket).length === 0) {
          this.hashTable[i] = null;
        }
        // Decrease the length of hashmap as key-value gets deleted
        this.size--;
        // Returns true when successful deletion
        return true;
      }
    }
    // Return false if deletion of key was not successful or key
    // does not exist in hashmap
    return false;
  }

  // Get the length of hashmap
  length() {
    // Return the length of hashmap
    return this.size;
  }

  // Clear the values of the hashmap
  clear() {
    // Reset the hashmap but keeps the current capacity
    this.hashTable = new Array(this.capacity).fill(null);
    // Reset size
    this.size = 0;
  }

  // Get all keys stored in the hashmap
  keys() {
    // Create an array to store keys
    const keys = [];
    // Traverse on hashmap
    for (const bucket of this.hashTable) {
      // If bucket is not empty it gets all keys stored
      // and push to the array
      if (bucket) {
        keys.push(Object.keys(bucket));
      }
    }
    // Return all keys found in hashmap as an array
    return keys;
  }

  // Get all values stored in the hashmap
  values() {
    // Create an array to store values
    const values = [];
    // Traverse in the hashmap
    for (const bucket of this.hashTable) {
      // If bucket is not empty it gets all values of its keys
      // and push to the array
      if (bucket) {
        values.push(Object.values(bucket));
      }
    }
    // Return all values found in the hashmap
    return values;
  }

  // Returns the key-value found in the hashmap in
  // customized format
  entries() {
    const arr = this.hashTable;
    const entries = [];
    let i = 0;
    // If bucket is not empty it pushes its key-value
    // pairs to the array
    while (i < arr.length) {
      if (arr[i] !== undefined) {
        entries.push(arr[i]);
      }
      i++;
    }
    return entries;
  }
}

// Hash function
// Takes a key to be hashed and to be divided by the capacity of the
// hashmap to fit in the hashmap's capacity
function hash(key, capacity) {
  let hashCode = 0;
  const primeNumber = 7;

  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
  }

  return hashCode;
}

// TEST
const test = new HashMap(8);
console.log(test.capacity);
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("grape", "violet");
test.set("moon", "silver");

// console.log("length", test.length());
test.clear();
// console.log("length", test.length());
console.log(test.entries());
