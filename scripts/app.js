(function() {
  'use strict';

  var app = {
    isLoading: true,
    visibleCards: {},
    selectedContatos: [],
    spinner: document.querySelector('.loader'),
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

  document.getElementById('butAddContato').addEventListener('click', function() {
    var nome = document.getElementById('nomeToAdd').value;
    var telefone = document.getElementById('telefoneToAdd').value;
    var descricao = document.getElementById('descricaoToAdd').value;

    var select = document.getElementById('selectGenderToAdd');
    var selected = select.options[select.selectedIndex];
    var genero = selected.value;
    
    console.log("Nome ", nome);
    console.log("Telefone ", telefone);
    console.log("Descricao ", descricao);
    console.log("Genero ", genero);

    if (!app.selectedContatos) {
      app.selectedContatos = [];
    }

    var contato = {
      nome: nome, 
      telefone : telefone, 
      genero: genero,
      descricao: descricao};

    app.selectedContatos.push(contato);
    app.saveSelectedContatos();
    app.addCadastradoToView(contato);
    app.toggleAddDialog(false);
  });

  document.getElementById('butAddCancelar').addEventListener('click', function() {
    app.toggleAddDialog(false);
  });

  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  //localStorage é uma variável disponível para salvar dados no browser.
  app.saveSelectedContatos = function() {
    var selectedContatos = JSON.stringify(app.selectedContatos);
    localStorage.selectedContatos = selectedContatos;
  };

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
