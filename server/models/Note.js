class Note {
  constructor(key, description) {
    this.setKey(key);
    this.setDescription(description);

    Object.freeze(this);
  }

  get key() {
    return this._key;
  }

  get description() {
    return this._description;
  }

  setKey(key) {
    key = parseInt(key);

    if (!Number.isInteger(key) || key <= 0) {
      throw new Error('The key parameter must be an integer value greater than or equal to 1');
    }

    this._key = key;
  }

  setDescription(description) {
    if (!description ||
        !description.trim().length) {
      throw new Error('The description parameter must have at least 1 character');
    }

    this._description = description;
  }
}

module.exports = Note;