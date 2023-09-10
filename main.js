"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () =>
  document.getElementById("modal").classList.remove("active");

document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

//ARRAY DE CLIENTES
const listClientes = [];

//CONTADOR
let countID = 1;

//=====================================CREATE===================================
//FUNÇÃO QUE CRIA UM NOVO CLIENTE
const newClient = () => {
  //OBJETO COM OS ATRIBUTOS DO CLIENTE

  let client = {
    name: document.querySelector("#name-input").value,
    email: document.querySelector("#email-input").value,
    numero: document.querySelector("#number-input").value,
    cidade: document.querySelector("#city-input").value,
  };

  readClient(client);

  //ADICONANDO O NOVO CLIENTE NO ARRAY DE CLIENTES
  listClientes.push(client);
  // console.log(listClientes);
};

//ATRIBUINDO O EVENTO DE CLICK AO ELEMNTO DE ID save
document.querySelector("#save").addEventListener("click", function () {
  //fechando modal após o click
  document.getElementById("modal").classList.remove("active");
  //chamando função de criar novo cliente
  newClient();
});
//=====================================CREATE===================================

//=====================================READ===================================
function readClient(client) {
  //INSERINDO NOVO ELEMENTO HTML DENTRO DO TBODY
  let html = `<tr class="client" id="${countID}">
                    <td>${client.name}</td>
                    <td>${client.email}</td>
                    <td>${client.numero}</td>
                    <td>${client.cidade}</td>
                    <td>
                        <button type="button" class="button green edit-btn" data-id=${countID}>editar</button>
                        <button type="button" class="button red excluir-btn" data-id=${countID}>excluir</button>
                    </td>
                </tr>
                `;
  countID++;

  document.querySelector(".records tbody").innerHTML += html;
  //INSERINDO NOVO ELEMENTO HTML DENTRO DO TBODY
}
//=====================================READ===================================

//====================================DELETE====================================
function removeClient() {
  //EVENTO DE CLICK NO DOCUMENTO TODO
  document.addEventListener("click", function (e) {
    //TODOS OS ELEMTNOS COM ESSA CLASSE
    let clientes = document.querySelectorAll(".client");

    //SE O ELEMENTO CLICADO TIVER A CLASSE
    if (e.target.classList.contains("excluir-btn")) {
      // LOOP PARA PEGAR TODOS OS ELEMTNOS SEPARADAMENTE
      for (let i = 0; i < clientes.length; i++) {
        //SE O CLICENTE ATUAL TIVER O ID IGUAL AO DATA-ID DO BOTÃO EXCLUIR
        if (
          clientes[i].getAttribute("id") === e.target.getAttribute("data-id")
        ) {
          console.log(clientes[i], e.target);
          //REMOVA O ELEMENTO ATUAL
          clientes[i].remove();
        }
      }
    }
  });
}

//CHAMANDO FUNÇÃO
removeClient();
//====================================DELETE====================================

function updateClient() {
  //EVENTO DE CLICK NO DOCUMENTO TODO
  document.addEventListener("click", function (e) {
    //TODOS MEUS ELEMNTOS COM ESSA CLASSE
    let clientes = document.querySelectorAll(".client");

    //SE O ELEMENTO CLICADO TIVER A CLASSE
    if (e.target.classList.contains("edit-btn")) {
      // LOOP PARA PEGAR TODOS OS ELEMTNOS SEPARADAMENTE
      for (let i = 0; i < clientes.length; i++) {
        //SE O CLICENTE ATUAL TIVER O ID IGUAL AO DATA-ID DO BOTÃO DE EDITAR
        if (
          clientes[i].getAttribute("id") === e.target.getAttribute("data-id")
        ) {
          //ABRIR MODAL DE EDITAR
          document.getElementById("edit-modal").classList.add("active");

          //EVENTO DE CLICK NO ELEMNTO
          document
            .querySelector("#edit-save")
            .addEventListener("click", function () {
              //NOVA VARIAVEL PARA O ID E DATAID
              let newId = i + 1;

              //OBJETO COM OS ATRIBUTOS DO CLIENTE COM O VALOR DO MODAL DE EDITAR
              let editClient = {
                name: document.querySelector("#edit-name-input").value,
                email: document.querySelector("#edit-email-input").value,
                numero: document.querySelector("#edit-number-input").value,
                cidade: document.querySelector("#edit-city-input").value,
              };

              //EDITANDO  O ELEMENTO HTML 
              let html = `<tr class="client" id="${newId}">
                              <td>${editClient.name}</td>
                              <td>${editClient.email}</td>
                              <td>${editClient.numero}</td>
                              <td>${editClient.cidade}</td>
                              <td>
                                  <button type="button" class="button green edit-btn" data-id=${newId}>editar</button>
                                  <button type="button" class="button red excluir-btn" data-id=${newId}>excluir</button>
                              </td>
                          </tr>
                          `;

              //ATRIUINDO O OS VALORES EDITADOS
              clientes[i].innerHTML = html;

              //REMOVENDO MODAL
              document.getElementById("edit-modal").classList.remove("active");
            });
        }
      }
    }
  });
}

//CHAMANDO FUNCAO
updateClient();
