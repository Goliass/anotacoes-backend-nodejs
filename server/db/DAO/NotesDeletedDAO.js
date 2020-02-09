class NotesDeletedDAO {

  constructor(connection) {
    this._connection = connection;
  }

  add(note) { 
    return new Promise((resolve, reject) => {
      this._connection.query('INSERT INTO `notesDeleted` VALUES (?, ?)',
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
      this._connection.query("DELETE FROM `notesDeleted` WHERE `key` = ?", 
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
      this._connection.query('SELECT * FROM `notesDeleted`', 
        (error, results) => {
          if (error) reject(error);

          resolve(results);
        }
      );
    });
  }

  searchByKey(key) {
    return new Promise((resolve, reject) => {
      this._connection.query("SELECT * FROM notesDeleted WHERE `key` = ?", 
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
      this._connection.query("SELECT * FROM notesDeleted WHERE UPPER(`description`) like ?", 
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

module.exports = NotesDeletedDAO;