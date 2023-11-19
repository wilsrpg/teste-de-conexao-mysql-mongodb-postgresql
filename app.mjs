import express from 'express'
//import cors from 'cors'
import mysql from 'mysql2'
//import { config as dotenvConfig } from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb'

//dotenvConfig();

const servidor = express();
servidor.use(express.json());
//servidor.use(cors({
	//origin: 'http://meudominio.com'
//}));
servidor.use(express.urlencoded({extended: false}));
//servidor.use(express.static('.'));

servidor.get('/', async (req, res)=>{
  res.sendFile('index.html', {root: '.'});
  //fetch("https://wilsrpg.cyclic.app", {
  //  "headers": {
  //    "Authorization": `Basic ${btoa('wilsrpg@cyclic:BoraCyclic')}`,
  //  },
  //  "method": "GET"
  //}
  //)
  //.then(resp=>{
  //  console.log(resp);
    //return res.json({teste: 'ok'});
  //})
  //.catch(erro=>{
  //  console.log(erro);
  //  return res.json({teste: 'erro'});
  //});
});

servidor.get('/sucesso', async (req, res)=>{
  res.sendFile('sucesso.html', {root: '.'});
});

servidor.get('/erro', async (req, res)=>{
  res.sendFile('erro.html', {root: '.'});
});

servidor.get('/googlec36f80c6f63a5f05.html', async (req, res)=>{
  res.sendFile('googlec36f80c6f63a5f05.html', {root: '.'});
});

servidor.post('/mysql', async (req, res) => {
  const con = mysql.createConnection({
    host: req.body.servidor.slice(0,req.body.servidor.search(':')),
    port: req.body.servidor.slice(req.body.servidor.search(':')),
    database: req.body.database,
    user: req.body.usuario,
    password: req.body.senha
  });
  //console.log(con.config.host+':'+con.config.port);
  //console.log(con.config.database);
  //console.log(con.config.user);

  const desconectado = await new Promise(resolve=>{
    con.ping(erro=>resolve(erro));
  });
  console.log(desconectado);
  if(desconectado)
    //return resp.sendFile('erro.html', {root: '.'});
    return res.json({mysql: 'erro'});
  
  //con.connect(async (erro) => {
  //  if (erro)
  //    throw erro;
  //  con.query('SELECT * FROM `teste`;', (e,resultado,campos)=>{
  //    //console.log(resultado);
  //    return resolve(resultado[0].usuario);
  //  });
  //});
  //console.log(usuario);

  //resp.sendFile('sucesso.html', {root: '.'});
  return res.json({mysql: 'ok'});
});

servidor.post('/mongodb', async (req, res) => {
  const uri = 'mongodb+srv://'+req.body.usuario+':'+req.body.senha+'@'+req.body.servidor+'/?retryWrites=true&w=majority';
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    //console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // Ensures that the client will close when you finish/error
    await client.close();
    return res.json({mongodb: 'ok'});
  } catch(erro) {
    console.log('Erro na conexão com o database: '+erro);
    // Ensures that the client will close when you finish/error
    await client.close();
    //return resp.sendFile('erro.html', {root: '.'});
    return res.json({mongodb: 'erro'});
  }
  //resp.sendFile('sucesso.html', {root: '.'});
});

servidor.get('/usuarios', async (req, res)=>{
  res.json({usuarios: [{nome: 'Nome1'},{nome: 'Nome2'},{nome: 'Nome3'}]});
});

servidor.listen(3333, ()=>console.log('iniciou server, ouvindo porta 3333'));