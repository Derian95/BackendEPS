const Reports = require("../models/Reports");
const User = require("../models/User");

//Creacion de nuevo reporte -Caso de uso 06 ,Julio Oliver Mejia Rodriguez, 20/03/2022

/*********************************************************************
Fecha de creacion : 20/03/2022
Referencia: CU-006 Registrar reporte RF-03
Funcionalidad: Agregar un nuevo reporte al sistema
Autor:Julio Oliver Mejia Rodriguez
Sintanxis: Funcion asincrona que sera exportada hacia los resolvers
en donde sera utilizada por el sistema, DEVOLVERA un error o un string.
**********************************************************************/
async function newReport(input, ctx) {
  console.log(ctx);
  const { email } = input;
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("Usario ya registrado");
  }

  const newReport = new Reports(input);
  newReport.creador = ctx.user.id;
  try {
    const result = await newReport.save();

    return result;
  } catch (error) {
    console.log(error);
  }
}
/*********************************************************************
Fecha de creacion : 20/03/2022
Referencia: CU-008 Anular reporte - RF-009
Funcionalidad: Agregar un nuevo reporte al sistema
Autor:Derian Francisco Herrera Amezquita
Sintanxis: Funcion asincrona que sera exportada hacia los resolvers
en donde sera utilizada por el sistema, esta devolvera un string.
**********************************************************************/
async function deleteReport(id) {
  let report = await Reports.findById(id);
  if (!report) {
    throw new Error("Reporte no encontrado");
  }
  await Reports.findOneAndDelete({ _id: id });
  return "Reporte eliminado";
}
/*********************************************************************
Fecha de creacion : 20/03/2022
Referencia: CU-003 Cambiar estado de reporte - RF-009
Funcionalidad: Cambiar el estado de un reporte
Autor:Derian Francisco Herrera Amezquita
Sintanxis: Funcion asincrona que sera exportada hacia los resolvers
en donde sera utilizada por el sistema, esta devolvera un string.
**********************************************************************/
async function changueState(id, input) {
  //verificar si el reporte existe
  const existePedido = await Reports.findById(id);
  if (!existePedido) {
    throw new Error("El reporte no existe");
  }

  //guardar pedido
  const resul = await Reports.findOneAndUpdate({ _id: id }, input, {
    new: true,
  });
  return resul;
}

async function getReport() {}

async function getReports() {
  try {
    const report = await Reports.find({});
    return report;
  } catch (error) {
    console.log(error);
  }
}

async function getCompletes(){
  const completes =await Reports.find({estado:"COMPLETADO"}).count();
 
  return completes;
}
async function getIncompletes(){
  const pending =await Reports.find({estado:"PENDIENTE"}).count();
 
  return pending;
}

async function getResportLatest(){
 lastest=await Reports.find().sort({_id:-1}).limit(10);
 return lastest;
}
module.exports = {
  newReport,
  deleteReport,
  changueState,
  getReports,
  getCompletes,
  getIncompletes,
  getResportLatest,
};
