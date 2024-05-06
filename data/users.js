
 const users = [
    { id: 1, username: 'lmartin', password: 'Pwd_1231', name: 'Lucas Martin' },
    { id: 2, username: 'alopez', password: 'Pwd_1232', name: 'Ana López' },
    { id: 3, username: 'uaguado', password: 'Pwd_1233', name: 'Unai Aguado' },
    { id: 4, username: 'egarcia', password: 'Pwd_1234', name: 'Erika García' },
  ];

 function findUserByName (username, password) {
  return users.find((u) => u.username === username && u.password === password);
 }

 function findUserById (userId) {
    return users.find((u) => u.id === userId);
 }

  module.exports = { findUserByName, findUserById };
