const baseRoutes = require('./base-routes');
const notesToDoRoutes = require('./notes-to-do-routes');
const notesDoneRoutes = require('./notes-done-routes');
const notesDeletedRoutes = require('./notes-deleted-routes');

module.exports = [baseRoutes, notesToDoRoutes, notesDoneRoutes, notesDeletedRoutes];
