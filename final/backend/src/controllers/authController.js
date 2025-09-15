const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log(req.body.email)
    if (!email || !password) return res.status(400).json({ status:400, message:'Email e senha são obrigatórios', httpCat:'https://http.cat/400' });

    const user = await authService.createUser(email, password);
    return res.status(201).json({
      status:201,
      message:'Usuário criado',
      httpCat:'https://http.cat/201',
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    // Violação de unique do Prisma
    if (err.code === 'P2002') {
      return res.status(409).json({ status:409, message:'Email já cadastrado', httpCat:'https://http.cat/409' });
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status:400, message:'Email e senha são obrigatórios', httpCat:'https://http.cat/400' });

    const { token, user } = await authService.login(email, password);
    return res.status(200).json({
      status:200,
      message:'Login efetuado',
      httpCat:'https://http.cat/200',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    if (err.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ status:401, message:'Credenciais inválidas', httpCat:'https://http.cat/401' });
    }
    next(err);
  }
}

module.exports = { register, login };
