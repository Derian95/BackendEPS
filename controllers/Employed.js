const Employed = require("../models/Employed");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

//Autentificacion del sistema ,Caso de uso 01,Derian Herrera , 25/03/2022
function createToken(employed, secret, expiresIn) {
  const { id, email, nombre, apellidos,unidad,codigo,zona,password } = employed;
  console.log(employed);

  const payload = {
    id,
    nombre,
    apellidos,
    unidad,
    codigo,
    zona,
    password,
    email,
  };
  return jwt.sign(payload, secret, { expiresIn });
}

/*********************************************************************
Fecha de creacion : 25/03/2022
Referencia: CU-001 Registrarse en la aplicacion RF-01
Funcion principal para registrar usuario al sistema
Autoh:Derian Herrera Amezquita
Sintanxis: Funcion asincrona que sera exportada hacia los resolvers
en donde sera utilizada por el sistema.
**********************************************************************/
async function registerEmployed(input) {
  const { email, password } = input;
  const existsUserEmail = await Employed.findOne({ email });

  if ( existsUserEmail) {
    throw new Error("El usuario ya esta registrado");
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    input.password = await bcryptjs.hash(password, salt);

    console.log(input);

    const newUser = new Employed(input);
    console.log(newUser);

    newUser.save();
    return "Usuario creado";
  } catch (error) {
    console.log(error);
  }
}

//Login de usuario , Caso de uso 01,Derian Herrera Amezquita, 25/03/2022
async function loginEmployed(input) {
  const { email, password } = input;

  //Verificar usuario
  const existsUserEmail = await Employed.findOne({ email });

  if (!existsUserEmail) {
    throw new Error("El usuario no existe");
  }
  //Verificar password
  const passwordCorrect = await bcryptjs.compare(
    password,
    existsUserEmail.password
  );
  if (!passwordCorrect) {
    throw new Error("El usuario no existe");
  }
  //Acceso
  return {
    token: createToken(existsUserEmail, process.env.SECRETA, "24h"),
  };
}

//Mostrar informacion personal ,Caso de uso -, Julio Mejia Rodriguez, 25/03/2022
async function getEmployedInfo(ctx) { //id,nombre
  console.log(ctx);
  return ctx.user;

  
}


module.exports = {
    registerEmployed,
    loginEmployed,
    getEmployedInfo,
};
