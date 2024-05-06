const express = require('express');
const router = express.Router();
const config = require('../crypto/config.js');

const users = require('../data/users.js');
const auth = require('../middlewares/authMiddleware.js');

router.get('/', (req, res) => {

    const loginForm = `
    <h1>BIENVENIDOS A MI PRIMERA PÁGINA JWT</h1>
    <hr><br>
    <form action="/login" method="post">
      <label for="username">Usuario:</label>
      <input type="text" id="username" name="username" required><br><br>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required><br><br>
      <button type="submit">Iniciar sesión</button>
    </form>
    <hr>
    <a href="/dashboard ">Dashboard</a>
    `;
  
    res.send(loginForm);
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.findUserByName(username, password);

    if (user) {
         //   console.log(req.session.usuarioId  );
       if (req.session && req.session.usuarioId === user.id) {
            // El usuario está logado, continuar con la solicitud
            res.send(`
            <h1>${user.name} ya estás logado!</h1>
            <hr>
            <a href="/dashboard ">Dashboard</a>
            <br>
            <br>
            <form action="/logout" method="post">
            <button type="submit">Cerrar Sesión</button>
            </form>
          `);
        } 
        else {
            const token = auth.generatorToken(user);
            req.session.token = token;
            res.redirect('/dashboard');
        }
    } 
    else {
      res.status(401).send(`<h3>ERROR</h3>
      <p>Credenciales incorrectas!</p> 
      <hr>
      <a href="/">Home</a>`);
    }
  });
  
  router.get('/dashboard', auth.verifyToken, (req, res) => {
    const userId = req.user;
    //console.log(userId);
    const user = users.findUserById(userId);

    if (user) {
      res.send(`
        <h1>Bienvenido, ${user.name}</h1>
        <hr>
        <p><b>ID:</b> ${user.id}</p>
        <p><b>UserName:</b> ${user.username} </p>
        <hr>
        <a href="/">Home</a>
        <br>
        <br>
        <form action="/logout" method="post">
        <button type="submit">Cerrar Sesión</button>
        </form>
      `);
    } 
    else {
      res.status(401).json(`<h3>ERROR</h3>
      <p>Usuario no encontrado!</p> 
      <hr>
      <a href="/">Home</a>`);
    }
  });

  
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
  

module.exports = router;