import Modal from "./modal.js";

const modal = Modal();

const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");

const checkButtons = document.querySelectorAll(".actions a.check");

checkButtons.forEach((button) => {
    button.addEventListener("click", handleClick);
});

const deleteButtons = document.querySelectorAll(".actions a.delete");

deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => handleClick(event, false));
});

function handleClick(event, check = true) {
    event.preventDefault();
    const text = check ? "Marcar como lida" : "Excluir";
    const buttonText = check ? "Lida" : "Excluir"
    const slug = check ? "check" : "delete";
    const roomID = document.querySelector("#room-id").dataset.id;
    const questionID = event.target.dataset.id;

    const form = document.querySelector(".modal form");
    form.setAttribute("action", `/question/${roomID}/${questionID}/${slug}`);

    modalTitle.innerHTML = text;
    modalDescription.innerHTML = `Tem certeza que deseja ${text} esta pergunta ?`;
    modalButton.innerHTML = buttonText;
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red");

    modal.open();
}
