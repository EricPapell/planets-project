//the PORT we can write an or conditional to say if
//process.env.PORT || 8000
//we can put this env variable in the script of package.json

//BETTER TO STRUCTURE THE SERVER AND THE EXPRESS LIKE THAT
//using the 2 and combining them where http is the father

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//CORS
//import cors to add it in the headers (whitelist)
//specify in options which sites you wnat to allow

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//models are separeted from routers and controllers cause it is datarelated that can be suse in several routers or controlles
//but controllers and routers are always very related

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//to run the package.json comands from the father file use
//--prefix folder-name-where-is-the-package.json
// "server": "npm run start --prefix server",
// "client": "npm start --prefix client",

//y luego uno para correr los dos COMANDOS a la vez
// "watch": "npm run server & npm run client",

////////////////////////////////////////////
////////////////////////////////////////////
//Serve react in the server
//we can npm run build in a way to be placed in the server folder to be connnected in the same server (direction)
//that way we can run all in the same place and it would be needed only one server
//in package.json
//build = BUILD_PATH=directory-path react-scripts build

//to run all together we add in the package.json the following script
//deploy:npm run build --prefix client && npm start --prefix server

//RUUUUN THEEE SCRIPT WIITH NOOOOODEEEE NOOOOOT NOOT WITH NODEMON

////////////////////////////////////////////
////////////////////////////////////////////
//Looging with MORGAN
//SE USA PARA OBTENER INFORMACION DE LAS REQUEST SOLICITADAS
//IMPORTANTISIMO PARA IR VIENDO COMO VA
//todas las requests que existan
//it has to be used as a middleware high up after security middleware

////////////////////////////////////////////
////////////////////////////////////////////
//Launches info
//info with objects is good but depending on the purpose, it is better to uuuuseeee
//MAAAAAAAAAPS
//arrays with key/value elements to be able to track them better

////////////////////////////////////////////
////////////////////////////////////////////
//routing with client when the server doesnt have the endpoint
//'/*'

////////////////////////////////////////////
////////////////////////////////////////////
//STRUCTURE PROJECT
//DATA TO READ AND SERVE DATA READY
//CONTROLLER TO SET THE LOGIC
//ROUTE TO MAKE THE PATH

////////////////////////////////////////////
////////////////////////////////////////////
//AAAAAALLLLWWWAAAAYSSSS VAAAALIDATEEEE INFOOORMMAAAAAATIONNN
//if()

////////////////////////////////////////////
////////////////////////////////////////////
//ALWAAAAAAAAAYS SEEEEET SAAAAME NAAAAME IN DATA FROM
//FRONT END TO BACKEND
//CAUSE OF VALIDATION
