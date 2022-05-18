const {  gql }= require('apollo-server');

const typeDefs=gql`
 
type User{
    id:ID
    nombre:String
    apellidos:String
    direccion:String
    dni:String
    password:String
    email:String
}

type Token{
    token: String
}

input UserInput{
    nombre: String!
    apellidos: String!
    direccion: String!
    dni: String!
    password: String!
    email: String!
}

input LoginUserInput{
    email:String!
    password:String!
}

type Report{
    id:ID
    titulo:String
    descripcion:String
    latitud:String
    longitud:String
    estado:stateReport
    creador:ID
    foto:String
}

input ReportInput{
    titulo:String!
    descripcion:String!
    latitud:String!
    longitud:String!
    foto:String
    estado:stateReport
}
enum stateReport{
    PENDIENTE
    CANCELADO
    COMPLETADO
  }
type Query{
    getUser(token:String!) : User
}


type Query{
    getInfoUser:User
    getReports:[Report]
    getReportUser:[Report]

    #Estadisticas
    getCompletes:String
    getIncompletes:String
    getResportLatest:[Report]
    getTotal:Int
}
type Mutation{
    #User
    registerUser(input: UserInput): String
    loginUser(input: LoginUserInput):Token
 

    #Reports
    newReport(input:ReportInput):Report
    deleteReport(id:ID!):String
    changueState(id:ID!,input:ReportInput):Report


    


 

}
`;

module.exports=typeDefs;
