document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inventory-form");
    const tableBody = document.querySelector("#inventory-table tbody");
  
    // Array to store inventory items
    let inventory = [];
  
    // Add Item to Inventory
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const itemName = document.getElementById("item-name").value.trim();
      const itemQuantity = parseInt(document.getElementById("item-quantity").value.trim(), 10);
  
      if (itemName && itemQuantity > 0) {
        inventory.push({ name: itemName, quantity: itemQuantity });
        updateTable();
        form.reset();
      }
    });
  
    // Update Inventory Table
    function updateTable() {
      tableBody.innerHTML = ""; // Clear the table
      inventory.forEach((item, index) => {
        const row = document.createElement("tr");
  
        // Item Name
        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);
  
        // Quantity
        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);
  
        // Actions
        const actionsCell = document.createElement("td");
        actionsCell.classList.add("actions");
  
        // Edit Button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");
        editButton.addEventListener("click", () => editItem(index));
        actionsCell.appendChild(editButton);
  
        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => deleteItem(index));
        actionsCell.appendChild(deleteButton);
  
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
      });
    }
  
    // Edit Item
    function editItem(index) {
      const item = inventory[index];
      const newName = prompt("Enter new name:", item.name);
      const newQuantity = parseInt(prompt("Enter new quantity:", item.quantity), 10);
  
      if (newName && newQuantity > 0) {
        inventory[index] = { name: newName, quantity: newQuantity };
        updateTable();
      }
    }
  
    // Delete Item
    function deleteItem(index) {
      inventory.splice(index, 1);
      updateTable();
    }
  });
  