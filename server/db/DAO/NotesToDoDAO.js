class NotesToDoDAO {

  constructor(connection) {
    this._connection = connection;
  }

  add(note) { 
    return new Promise((resolve, reject) => {
      this._connection.query('INSERT INTO `notesToDo` VALUES (?, ?)',
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

  update(note) {
    return new Promise((resolve, reject) => {
      this._connection.query('UPDATE `notesToDo` SET `description` = ? WHERE `key` = ?', 
        [
          note.description, 
          note.key
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
      this._connection.query("DELETE FROM `notesToDo` WHERE `key` = ?", 
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
      this._connection.query('SELECT * FROM `notesToDo`', 
        (error, results) => {
          if (error) reject(error);

          resolve(results);
        }
      );
    });
  }

  searchByKey(key) {
    return new Promise((resolve, reject) => {
      this._connection.query("SELECT * FROM notesToDo WHERE `key` = ?", 
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
      this._connection.query("SELECT * FROM notesToDo WHERE UPPER(`description`) like ?", 
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

module.exports = NotesToDoDAO;