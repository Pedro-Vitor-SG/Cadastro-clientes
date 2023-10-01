"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () =>
  document.getElementById("modal").classList.remove("active");

document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);



//=====================================CREATE===================================

//ADICIONA MASCARA AO INPUT DE TELEFONE
function maskInputNumber() {
  document.querySelector("#number-input").addEventListener("keydown", function (event) {
    //pega o evento de precionar uma tecla
    if (event.keyCode != 46 && event.keyCode != 8) {
      //verifica se a tecla precionada nao e um backspace e delete
      var i = document.querySelector("#number-input").value.length;
      if (i === 0)
        document.querySelector("#number-input").value =
          document.querySelector("#number-input").value + "(";
      else if (i === 3)
        document.querySelector("#number-input").value =
          document.querySelector("#number-input").value + ") ";
    }
  });
}
maskInputNumber();

//VALIDAR NOVO CLIENTE
function validateNewClient() {
  let validName =
    document.querySelector("#name-input").value !== "" ? true : false;

  let validEmail;
  if (
    document.querySelector("#email-input").value.includes("@") &&
    document.querySelector("#email-input").value !== ""
  ) {
    validEmail = true;
  } else {
    validEmail = false;
  }

  let validNumber =
    document.querySelector("#number-input").value !== "" ? true : false;
  let validCity =
    document.querySelector("#city-input").value !== "" ? true : false;

  if(validName === false || validEmail === false || validNumber === false || validCity === false){
    if((validName === true && validEmail === false && validNumber === true && validCity && true)) {
      document.querySelector('.error-msg').innerHTML = ('Digite um email válido')
      return false;
    }
    document.querySelector('.error-msg').innerHTML = ('Preencha todas as infromações')
    return false;
  } else 
      return true;

}

//ARRAY DE CLIENTES
const listClientes = [];

//CONTADOR
let countID = 1;

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
  if (validateNewClient()) {
    
    //chamando função de criar novo cliente
    newClient()
    
    //fechando modal após o click
    document.getElementById("modal").classList.remove("active");
    document.querySelector("#name-input").value = ``;
    document.querySelector("#email-input").value = ``;
    document.querySelector("#number-input").value = ``;
    document.querySelector("#city-input").value = ``;
  };
});

document.querySelector("#cancel").addEventListener("click", function () {
  document.getElementById("modal").classList.remove("active");
  document.querySelector("#name-input").value = ``;
  document.querySelector("#email-input").value = ``;
  document.querySelector("#number-input").value = ``;
  document.querySelector("#city-input").value = ``;
})

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
  //funcao de click em todo o DOM
  document.addEventListener("click", function (e) {
    //todos os elementos com a classe
    let clientes = document.querySelectorAll(".client");
    //Se o elemento clicado tiver a classe
    if (e.target.classList.contains("edit-btn")) {
      //Variavel que guarda o data-id do elemento edit-btn
      let dataIdBtn = e.target.getAttribute("data-id");

      //setando o atributo e passando o valor ao edit-modal
      document.getElementById("edit-modal").setAttribute("data-id", dataIdBtn);

      //perocrre o array de clientes
      for (let i = 0; i < clientes.length; i++) {
        //Se o cliente atual tiver o id igual ao data-id do edit-btn
        if (
          clientes[i].getAttribute("id") === e.target.getAttribute("data-id")
        ) {
          //edit-name-input recebe o innerhtml do td na posicao 0 do tr do cliente
          document.querySelector("#edit-name-input").value = clientes[i]
            .closest(`tr`)
            .querySelectorAll(`td`)[0].innerHTML;

          //edit-name-input recebe o innerhtml do td na posicao 1 do tr do cliente
          document.querySelector("#edit-email-input").value = clientes[i]
            .closest(`tr`)
            .querySelectorAll(`td`)[1].innerHTML;

          //edit-name-input recebe o innerhtml do td na posicao 2 do tr do cliente
          document.querySelector("#edit-number-input").value = clientes[i]
            .closest(`tr`)
            .querySelectorAll(`td`)[2].innerHTML;

          //edit-name-input recebe o innerhtml do td na posicao 3 do tr do cliente
          document.querySelector("#edit-city-input").value = clientes[i]
            .closest(`tr`)
            .querySelectorAll(`td`)[3].innerHTML;
        }
      }

      //adicionando a classe
      document.getElementById("edit-modal").classList.add("active");

      //quando clicar no edit-save
      document
        .querySelector("#edit-save")
        .addEventListener("click", function () {
          //objeto de editar o cliente
          let editClient = {
            name: document.querySelector("#edit-name-input").value,
            email: document.querySelector("#edit-email-input").value,
            numero: document.querySelector("#edit-number-input").value,
            cidade: document.querySelector("#edit-city-input").value,
          };

          //html da tr com os valores editados
          let html = `<tr class="client" id="${dataIdBtn}">
                              <td>${editClient.name}</td>
                              <td>${editClient.email}</td>
                              <td>${editClient.numero}</td>
                              <td>${editClient.cidade}</td>
                              <td>
                                  <button type="button" class="button green edit-btn" data-id=${dataIdBtn}>editar</button>
                                  <button type="button" class="button red excluir-btn" data-id=${dataIdBtn}>excluir</button>
                              </td>
                          </tr>
                          `;

          //perocrre o array de clientes
          for (let i = 0; i < clientes.length; i++) {
            //Se o cliente atual tiver o id igual ao data-id do edit-btn EE o data-id do edit-btn for igual ao data-id do modal
            if (
              clientes[i].getAttribute("id") ===
                e.target.getAttribute("data-id") &&
              e.target.getAttribute("data-id") ===
                document.getElementById("edit-modal").getAttribute(`data-id`)
            ) {
              //cliente atual recebe o valor do html
              clientes[i].innerHTML = html;

              // console.log(  `TRUE` +  `id do client `+clientes[i].getAttribute("id"),
              //               `id do btn `+ e.target.getAttribute("data-id"),
              //               `id do modal `+ document.getElementById("edit-modal").getAttribute(`data-id`)
              //             )
            }
            // else{
            //       console.log(  `FALSO` +  `id do client `+clientes[i].getAttribute("id"),
            //                     `id do btn `+ e.target.getAttribute("data-id"),
            //                     `id do modal `+ document.getElementById("edit-modal").getAttribute(`data-id`)
            //                   )
            // }
          }

          //REMOVENDO MODAL
          document.getElementById("edit-modal").classList.remove("active");
        });
    }
  });
}

//Chamando funcao
updateClient();
