const User = require("../models/User");
const Report = require("../models/Reports");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

//Autentificacion del sistema ,Caso de uso 01,Derian Herrera , 25/03/2022
function createToken(user, secret, expiresIn) {
  const { id, email, nombre, apellidos, direccion, dni } = user;
  console.log(user);

  const payload = {
    id,
    email,
    nombre,
    apellidos,
    direccion,
    dni,
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
async function registerUser(input) {
  const { email, password, dni } = input;
  const exitsUserDni = await User.findOne({ dni });
  const existsUserEmail = await User.findOne({ email });

  if (exitsUserDni || existsUserEmail) {
    throw new Error("El usuario ya esta registrado");
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    input.password = await bcryptjs.hash(password, salt);

    console.log(input);

    const newUser = new User(input);
    console.log(newUser);

    newUser.save();
    return "Usuario creado";
  } catch (error) {
    console.log(error);
  }
}

//Login de usuario , Caso de uso 01,Derian Herrera Amezquita, 25/03/2022
async function loginUser(input) {
  const { email, password } = input;

  //Verificar usuario
  const existsUserEmail = await User.findOne({ email });

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
async function getInfoUser(ctx) { //id,nombre
  console.log(ctx);
  return ctx.user;

 /* let user = null;
  if (id) user = await User.findById(id);
  if (nombre) user = await User.findOne({ nombre });
  if (!user) throw new Error("El usuario no existe");

  return user;*/
  
}
async function getReportUser(ctx){
  try {
    const report = await Report.find({
      creador: ctx.user.id.toString(),
    });
    console.log(report)
    return report;
  } catch (error) {
    console.log(error);
  }

}

async function getUsers() {
  try {
    const user = await User.find({});
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
  getInfoUser,
  getReportUser,
  getUsers
};
