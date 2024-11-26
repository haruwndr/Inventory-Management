document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inventory-form");
  const tableBody = document.querySelector("#inventory-table tbody");
  let inventory = [];
  const updateTable = () => {
    tableBody.innerHTML = inventory
      .map((item, index) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>
            <button class="edit" onclick="editItem(${index})">Edit</button>
            <button class="delete" onclick="deleteItem(${index})">Delete</button>
          </td>
        </tr>
      `)
      .join("");
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form["item-name"].value.trim();
    const quantity = parseInt(form["item-quantity"].value.trim(), 10);
    if (name && quantity > 0) {
      inventory.push({ name, quantity });
      updateTable();
      form.reset();
    }
  });
  window.editItem = (index) => {
    const item = inventory[index];
    const newName = prompt("Enter new name:", item.name);
    const newQuantity = parseInt(prompt("Enter new quantity:", item.quantity), 10);
    if (newName && newQuantity > 0) {
      inventory[index] = { name: newName, quantity: newQuantity };
      updateTable();
    }
  };
  window.deleteItem = (index) => {
    inventory.splice(index, 1);
    updateTable();
  };
});
