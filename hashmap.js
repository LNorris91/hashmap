export default class Hashmap {
  constructor(buckets = 16) {
    this.loadFactor = 0.75;
    this.buckets = new Array(buckets).fill(null).map(() => []);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }
    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);

    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index][i][1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);

    if (this.length() > this.buckets.length * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    let index = this.hash(key);

    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        return this.buckets[index][i][1];
      }
    }

    return null;
  }

  has(key) {
    let index = this.hash(key);

    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    let index = this.hash(key);

    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index].splice(i, 1);
        return true;
      }
    }
    return false;
  }

  length() {
    let count = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      count += this.buckets[i].length;
    }

    return count;
  }

  clear() {
    this.buckets = new Array(16).fill(null).map(() => []);
  }

  keys() {
    let keys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        keys.push(this.buckets[i][j][0]);
      }
    }
    return keys;
  }

  values() {
    let values = [];

    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        values.push(this.buckets[i][j][1]);
      }
    }
    return values;
  }

  entries() {
    let entries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        entries.push(this.buckets[i][j]);
      }
    }
    return entries;
  }

  resize() {
    const newBucketSize = this.buckets.length * 2;
    const newBuckets = new Array(newBucketSize).fill(null).map(() => []);

    this.buckets.forEach((bucket) => {
      for (let i = 0; i < bucket.length; i++) {
        let key = bucket[i][0];
        let value = bucket[i][1];
        let index = this.hash(key);

        newBuckets[index].push([key, value]);
      }
    });

    this.buckets = newBuckets;
  }
}
