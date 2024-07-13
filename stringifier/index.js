function stringifier(input) {
  if (typeof input === 'number') {
    return isFinite(input) ? input.toString() : 'null';
  }
  if (typeof input === 'boolean') {
    return input ? 'true' : 'false';
  }
  if (typeof input === 'string') {
    return `"${input}"`;
  }
  if (input === null) {
    return 'null';
  }
  if (typeof input === 'undefined' || typeof input === 'function') {
    return undefined;
  }
  if (Array.isArray(input)) {
    let newArray = input.map(element => {
      let value = stringifier(element);
      return value === undefined ? 'null' : value;
    });
    return `[${newArray.join(',')}]`;
  }
  if (typeof input === 'object') {
    let keyValuePairs = [];
    for (let [key, value] of Object.entries(input)) {
      let stringValue = stringifier(value);
      if (stringValue !== undefined) {
        keyValuePairs.push(`"${key}":${stringValue}`);
      }
    }
    return `{${keyValuePairs.join(',')}}`;
  }
}

// Export the stringifier function for use in tests and other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = stringifier;
}