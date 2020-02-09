class NotesDoneDAO {

  constructor(connection) {
    this._connection = connection;
  }

  add(note) { 
    return new Promise((resolve, reject) => {
      this._connection.query('INSERT INTO `notesDone` VALUES (?, ?)',
        [
          note.key, 
          note.description
        ], 
        (error, results) => {
          if (error) reject(error);

          resolve(results);
        }
      );
    });
  }

  delete(note) {
    return new Promise((resolve, reject) => {
      this._connection.query("DELETE FROM `notesDone` WHERE `key` = ?", 
        [
          note.key
        ], 
        (error, results) => {
          if (error) reject(error);

          resolve(results);
        }
      );
    });
  }
  
  load() {
    return new Promise((resolve, reject) => {
      this._connection.query('SELECT * FROM `notesDone`', 
        (error, results) => {
          if (error) reject(error);

          resolve(results);
        }
      );
    });
  }

  searchByKey(key) {
    return new Promise((resolve, reject) => {
      this._connection.query("SELECT * FROM notesDone WHERE `key` = ?", 
        [ 
          key
        ], 
        (error, results) => {
          if (error) reject(error);

          resolve(results);
        }
      );
    });
  }

  searchByDescription(description) {
    return new Promise((resolve, reject) => {
      this._connection.query("SELECT * FROM notesDone WHERE UPPER(`description`) like ?", 
        [
          `%${description.toUpperCase()}%`
        ], 
        (error, results) => {
          if (error) reject(error);

          resolve(results);
        }
      );
    });
  }
}

module.exports = NotesDoneDAO;