
// Define your models and their properties
const BookSchema = {
  name: 'Book',
  primaryKey: 'id',
  properties: {
    id:  'string',
    name: 'string',
    ord: 'string',
    version: 'string',
    chapters: 'Chapter[]'
  }
};
const ChapterSchema = {
  name: 'Chapter',
  primaryKey: 'id',
  properties: {
    id:     'string',
    data: 'string',
    bookId: 'string'
    // birthday: 'date',
    // cars:     'Car[]',
    // picture:  'data?' // optional property
  }
};

module.exports =  {
  BookSchema,
  ChapterSchema
}

