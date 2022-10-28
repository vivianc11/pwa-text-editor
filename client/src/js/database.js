import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// PUT FUNCTION
export const putDb = async (id, value) => {
  console.log('Updating the jateDB');

  // connect to DB and version
  const jateDb = await openDB('jate', 1);

  // make new transaction and specifying the DB (jate) and the data privileges (readwrite). 
  const text = jateDb.transaction('jate', 'readwrite');

  // open the object store
  const objStore = text.objectStore('jate');

  // use the .add() method to pass in content
  const req = objStore.add({ id: id, value: value })

  // confirm the data was added
  const res = await req;
  console.log('data saved to the jateDB', res);
}

// GET FUNCTION
export const getDb = async () => {
  console.log('Getting data from the jateDB');

  // connect to DB and version
  const jateDb = await openDB('jate', 1);

  // make new transaction and specifying the DB (jate) and the data privileges (readwrite). 
  const text = jateDb.transaction('jate', 'readwrite');

  // open the object store
  const objStore = text.objectStore('jate');

  // use the .getAll() method to grab all the content in the DB
  const req = objStore.getAll()
  
  // confirm the data was fetched
  const res = await req;
  console.log('data saved to the jateDB', res);
};

initdb();
