import express from "express";
import contatos from './data/contatos.mjs'

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.send(`<h1 style='color: blue;'> hands-On Docker: Backend </h1> <p>olá mundo - DevOps</p>`);
});

app.get('/contatos/:id', (req, res) => {
    const id = req.params.id;
    const contato = contatos.find((contato) => contato.id == id);
  
    if (!contato) {
      return res.status(404).json({
        error: true,
        message: "Contato não encontrado!"
      });
    }
  
    res.status(200).json({
      error: false,
      contato
    });
  });
  
  app.get('/contatos',(req, res) => {
    res.status(200).json({
        error: false,
        contatos
    })
});

//post feitos

app.post('/contatos', (req, res) => {
    const { nome, genero, telefone, email } = req.body;
    if (!nome || !genero || !telefone || !email) {
      return res.status(400).json({
        error: true,
        message: "Entrada inválida!"
      });
    }
    if (contatos.find((contato) => contato.email === email)) {
      return res.status(400).json({
        error: true,
        message: "Email já cadastrado!"
      });
    }
    id = (contatos.length == 0) ? 1 : contatos[contatos.length-1].id + 1;
    const contato = { id, nome, genero, telefone, email };
    contatos.push(contato);
    res.status(201).json({
      error: false,
      contato
    });
  });
  
 //editar 

  app.put('/contatos/:id', (req, res) => {
    const id = req.params.id;
    const contato = contatos.find((contato) => contato.id == id);
  
    if (!contato) {
      return res.status(404).json({
        error: true,
        message: "Contato não encontrado!"
      });
    }
  
    const { nome, genero, telefone, email } = req.body;
  
    if (email) {
      if (contatos.find((contato) => contato.email === email)) {
        return res.status(400).json({
          error: true,
          message: "Email já cadastrado!"
        });
      }
      contato.email = email;
    }
  
    if (nome) contato.nome = nome;
    if (genero) contato.genero = genero;
    if (telefone) contato.telefone = telefone;
  
    return res.status(200).json({
      error: false,
      message: "Contato atualizado com sucesso!"
    });
  });
  
//delete 

app.delete('/contatos/:id', (req, res) => {
    const id = req.params.id;
    const index = contatos.findIndex((contato) => contato.id == id);
  
    if (index == -1) {
      return res.status(404).json({
        error: true,
        message: "Contato não encontrado!"
      });
    }
  
    contatos.splice(index, 1);
    return res.status(200).json({
      error: false,
      message: "Contato deletado com sucesso!"
    });
  });
  

app.listen(3000, () => {
    console.log("server iniciado na porta 3000!")
});