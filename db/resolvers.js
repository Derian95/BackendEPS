const UserController = require("../controllers/User");
const EmployedController = require("../controllers/Employed");
const ReportController = require("../controllers/Reports")

const Reportes = require('../models/Reports');

const resolvers={
    Query:{
        getInfoUser: (_,{},ctx)=>UserController.getInfoUser(ctx),
        getEmployedInfo: (_,{},ctx)=>EmployedController.getEmployedInfo(ctx),
        //getInfoUser: (_,{id,nombre})=>UserController.getInfoUser(id,nombre),
        //para el schema getInfoUser(id: ID, nombre: String): User
        getReports:()=>ReportController.getReports(),

        getReportUser:  (_,{},ctx) =>UserController.getReportUser(ctx),
        
        getCompletes: async ()=>ReportController.getCompletes(),
        getIncompletes: async ()=>ReportController.getIncompletes(),
        getResportLatest:async ()=>ReportController.getResportLatest(),
        getTotal:async ()=>ReportController.getTotal(),
          
    },
    Mutation:{
        //User
        registerUser: (_, {input})=> UserController.registerUser(input),
        loginUser: (_,{input})=> UserController.loginUser(input),
        
        //Employed
        registerEmployed: (_, {input})=> EmployedController.registerEmployed(input),
        loginEmployed: (_,{input})=> EmployedController.loginEmployed(input),
        //Reports
        newReport: (_,{input},ctx)=>ReportController.newReport(input,ctx),
        deleteReport: (_,{id})=>ReportController.deleteReport(id),
        changueState: (_, { id, input })=>ReportController.changueState(id,input),
/*
        //Resolver luego
        nuevoReporte: async (_,{input}, ctx)=>{
            try {
                const reporte = new Reportes(input);
                
                reporte.creador = ctx.usuario.id;
            
                const resultado = await reporte.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        actualizarReporte: async (_, {id,input}, ctx)=>{
            let reportes = await Reportes.findById(id);
            if(!reportes){
                throw new Error('Reporte no encontrado');
            }

            if(reportes.creador.toString() !== ctx.usuario.id){
                throw new Error('No tienes las credenciales');

            }

            reportes = await Reportes.findOneAndUpdate({_id:id},input,{new:true});
            return reportes;
        },
        eliminarReporte: async(_,{id}, ctx)=>{
            let reportes = await Reportes.findById(id);
            if(!reportes){
                throw new Error('Reporte no encontrado');
            }

            if(reportes.creador.toString() !== ctx.usuario.id){
                throw new Error('No tienes las credenciales');

            }
            await Reportes.findOneAndDelete({id:id});
            return 'Reporte eliminado';
        }*/
        
    }
}

module.exports =resolvers;