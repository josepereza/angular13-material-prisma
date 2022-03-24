var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const createError = require('http-errors');
const prisma = new PrismaClient()
const fs = require('fs');


router.get('/', async (req, res, next) => {
  const allPosts = await prisma.post.findMany()
  res.send(allPosts)
});

router.post('/singup',  async (req, res) => {
  console.log('post')
  const { name, email, password } = req.body;
  console.log(name,email,password)
  usuario = {
    name,
    email, password
  }
  var file = req.files;
  file2=file.map(dato=>
    dato.originalname
  )
  usuario.image_name=file2.toString();
  console.log(file2)
  // file
  //   ? (usuario.image_name = `http://localhost:3000/images/${req.file.originalname}`)
  //   : (usuario.image_name = null);
  usuario.password = bcrypt.hashSync(password, 8)
  let user = await prisma.user.create({ data: usuario });
  res.json(usuario)
})

router.post('/crear', verifyToken, async (req, res, next) => {
  const { title,content,authorid } = req.body;
post={
  title,
  content,
  authorid
}
  const responsePost = await prisma.post.create({
    data: post })
  

  
 
  res.json({responsePost})


})

router.get('/listado', verifyToken, async (req, res) => {
  const allUsers = await prisma.user.findMany();
  console.log(req.data)
  res.send(allUsers)
})

function verifyToken(req, res, next) {
  if (!req.headers.authorization) return res.status(400).json('no autorizado')
  const token = req.headers.authorization.substr(7);
  if (token !== '') {
    const content = jwt.verify(token, 'palabrasecreta');
    req.data = content;
    next()
  }
}
module.exports = router;
