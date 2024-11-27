const express = require('express');
const app = express();

// Utilizar JSON no body das requisições
app.use(express.json());

// Array de objetos para armazenar as pessoas (id e nome)
let pessoas = [
  { id: 1, nome: 'Samuel' },
  { id: 2, nome: 'Laiany' },
  { id: 3, nome: 'Ceci' }
];

// Rota GET para retornar todas as pessoas
app.get('/pessoa', (req, res) => {
  res.json(pessoas);
});

// Rota GET para retornar uma pessoa pelo id
app.get('/pessoa/:id', (req, res) => {
  const { id } = req.params;
  const pessoa = pessoas.find(p => p.id == id);
  if (pessoa) {
    res.json(pessoa);
  } else {
    res.status(404).json({ message: 'Pessoa não encontrada' });
  }
});

// Rota POST para adicionar uma nova pessoa
app.post('/pessoa', (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ message: 'Nome é obrigatório' });
  }

  // Cria um novo id baseado no maior id existente + 1
  const novoId = pessoas.length > 0 ? Math.max(...pessoas.map(p => p.id)) + 1 : 1;
  const novaPessoa = { id: novoId, nome };
  
  pessoas.push(novaPessoa);
  res.status(201).json(novaPessoa);
});

// Rota PUT para atualizar uma pessoa existente
app.put('/pessoa/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const pessoaIndex = pessoas.findIndex(p => p.id == id);
  if (pessoaIndex === -1) {
    return res.status(404).json({ message: 'Pessoa não encontrada' });
  }

  if (!nome) {
    return res.status(400).json({ message: 'Nome é obrigatório' });
  }

  pessoas[pessoaIndex].nome = nome;
  res.json(pessoas[pessoaIndex]);
});

// Rota DELETE para remover uma pessoa
app.delete('/pessoa/:id', (req, res) => {
  const { id } = req.params;

  const pessoaIndex = pessoas.findIndex(p => p.id == id);
  if (pessoaIndex === -1) {
    return res.status(404).json({ message: 'Pessoa não encontrada' });
  }

  pessoas.splice(pessoaIndex, 1);
  res.status(204).send();
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
