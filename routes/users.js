var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
var jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const prisma = new PrismaClient()
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/images/');
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});
const upload = multer({ storage:storage })
/* GET users listing. */
router.get('/', async (req, res, next) => {
  const allUsers = await prisma.user.findMany()
  res.send(allUsers)
});

router.post('/singup', upload.array('image',12),  async (req, res) => {
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

router.post('/singin', async (req, res, next) => {
  const { email, password } = req.body;
try {
  const user = await prisma.user.findMany({
    where: { email }
  })

  if (!user) {
   
    res.json('error:')
  }
  // Una forma de hacerlo sin password encriptado
  // const user=await prisma.user.findMany({
  //   where:{AND: [{email:{equals:email}},{password:{equals:password}}]} 
  // });

  // Otra forma de hacerlo sin password encriptado
  // const user=await prisma.user.findMany({
  //   where:{AND: [{email},{password}]} 
  // });
  const checkPassword = await bcrypt.compareSync(password, user[0].password)
  if (!checkPassword) {
    return next(createError(401, 'Please login to view this page.'))
  }
  delete user[0].password


  
  const token = jwt.sign(user[0], 'palabrasecreta');
  
  res.json({user:user[0],token})

}catch(err){
  return res.send(err)
}
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
