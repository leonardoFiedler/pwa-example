(function() {
  'use strict';

  //Define um app com algumas confirgurações
  var app = {
    selectedContatos: [],
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container')
  };

  //Mostra a dialog de criacao de contato
  document.getElementById('butAdd').addEventListener('click', function() {
    document.getElementById('nomeToAdd').value = "";
    document.getElementById('telefoneToAdd').value = "";
    document.getElementById('descricaoToAdd').value = "";
    document.getElementById('selectGenderToAdd').selectedIndex = 0;
    app.toggleAddDialog(true);
  });

  //Evento ao pressionar o botão de adicionar contato da dialog
  document.getElementById('butAddContato').addEventListener('click', function() {
    var nome = document.getElementById('nomeToAdd').value;
    var telefone = document.getElementById('telefoneToAdd').value;
    var descricao = document.getElementById('descricaoToAdd').value;

    var select = document.getElementById('selectGenderToAdd');
    var selected = select.options[select.selectedIndex];
    var genero = selected.value;
    
    //print das informações no console
    console.log("Nome ", nome);
    console.log("Telefone ", telefone);
    console.log("Descricao ", descricao);
    console.log("Genero ", genero);

    if (!app.selectedContatos) {
      app.selectedContatos = [];
    }

    //Instancia um contato
    var contato = {
      nome: nome, 
      telefone : telefone, 
      genero: genero,
      descricao: descricao
    };

    //Salva e adiciona o contato na lista
    app.selectedContatos.push(contato);
    app.saveSelectedContatos();
    app.addCadastradoToView(contato);
    app.toggleAddDialog(false);
  });

  //Evento do botão de cancelar
  document.getElementById('butAddCancelar').addEventListener('click', function() {
    app.toggleAddDialog(false);
  });

  //Método que exibe ou esconde a dialog
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  //Método que salva os contatos, basicamente, é feito um parser para JSON da lista de contatos
  //E atribuido para a localStorage.selectedContatos.
  //LocalStorage é uma variável de acesso ao armazenamento do browser.
  //Pode ser visualizada no Chrome em:
  //Abra o console do navegador: botão direito - inspecionar
  //Procure pela tab Aplicação ou Application
  //na lateral aparecerá algo escrito como: Local Storage
  //E ao selecioná-lo, aparecerá o seu site.
  app.saveSelectedContatos = function() {
    var selectedContatos = JSON.stringify(app.selectedContatos);
    localStorage.selectedContatos = selectedContatos;
  };

  //Popula a view com os valores já cadastrados na local storage
  app.populaViewCadastrados = function() {
    if (app.selectedContatos) {
      app.selectedContatos.forEach(function(contato) {
        var card = app.cardTemplate.cloneNode(true);
        card.classList.remove('cardTemplate');
        card.querySelector('.nome-key').textContent = "Nome: " + contato.nome;
        card.querySelector('.genero-key').textContent = "Gênero: " + contato.genero;
        card.querySelector('.telefone-key').textContent = "Telefone: " + contato.telefone;
        card.querySelector('.descricao-key').textContent = "Descrição: " + contato.descricao;
        card.removeAttribute('hidden');
        app.container.appendChild(card);
      });
    }
  }

  //Passa um novo contato para ser adicionado na tela
  app.addCadastradoToView = function(contato) {
    var card = app.cardTemplate.cloneNode(true);
    card.classList.remove('cardTemplate');
    card.querySelector('.nome-key').textContent = "Nome: " + contato.nome;
    card.querySelector('.genero-key').textContent = "Gênero: " + contato.genero;
    card.querySelector('.telefone-key').textContent = "Telefone: " + contato.telefone;
    card.querySelector('.descricao-key').textContent = "Descrição: " + contato.descricao;
    card.removeAttribute('hidden');
    app.container.appendChild(card);
  }

  /**
   * Esta chamada é a inicial, o programa executará isto aqui primeiro
   */
  app.selectedContatos = localStorage.selectedContatos;
  if (app.selectedContatos) {
    app.selectedContatos = JSON.parse(app.selectedContatos);
  }
  app.populaViewCadastrados();

  /*
  * Carregando o Service Worker
  */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker está registrado'); });
  }
})();
