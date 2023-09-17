const items = [
  { category: "Weapons" },
  { name: "Crossbow", price: 500 },
  { name: "Wall Guns", price: 1000 },
  { name: "Handguns", price: 500 },
  { name: "Tier 4 Guns", price: 2000 },
  { category: "Optics & Attachments", price: 500 },
  { name: "Boxes of ammo", price: 500 },
  { name: "Magazines", price: 1000 },
  { name: "Arrows", price: 200 },
  { category: "Clothing" },
  { name: "Field & Hunting Clothing", price: 200 },
  { name: "All other tops/pants", price: 100 },
  { name: "Shoes", price: 50 },
  { name: "Helmet/Hats", price: 200 },
  { category: "Misc" },
  { name: "Weapon Cleaning Kit", price: 500 },
  { name: "Sewing Kit", price: 100 },
  { name: "Medical Items", price: 200 },
  { name: "9v Battery", price: 100 },
  { name: "GPS", price: 200 },
  { name: "Food", price: 50 },
  { name: "Soda", price: 50 },
  { name: "Water Bottle", price: 200 },
  { name: "Gloves/Belts", price: 200 },
  { name: "Knife", price: 200 },
  { name: "Nails", price: 1000 },
  { name: "Code Locks", price: 1000 },
  { name: "Misc. Building Supplies", price: 500 },
  { category: "Storage" },
  { name: "Canopy Tent", price: 500 },
  { name: "Barrel", price: 600 },
  { name: "Medium Tent", price: 600 },
  { name: "Large Tent", price: 800 },
  { name: "Car Tent", price: 1000 },
  { category: "Vehicles" },
  { name: "Car", price: 2000 },
  { name: "MS3 Truck", price: 5000 },
  { name: "Humvee", price: 7000 },
  { name: "Spare Wheels", price: 500 },
  { name: "Radiator", price: 200 },
  { name: "Battery", price: 200 },
  { name: "Spark Plug", price: 200 },
  { name: "Jerry Can", price: 100 },
  { category: "Vests" },
  { name: "Press Vest", price: 500 },
  { name: "Tactical Vest", price: 200 },
  { name: "Plate Carrier", price: 1500 },
];

const blackMarketItems = [
  { category: "Guns" },
  { name: "Gun", price: 1500 },
  { name: "Attachment", price: 500 },
  { name: "Plate Carrier", price: 1000 },
  { category: "Black Clothing" },
  { name: "BMD Top", price: 100 },
  { name: "BMD Pants", price: 100 },
  { name: "BMD Shoes", price: 50 },
  { name: "BMD Helmet", price: 100 },
  { name: "Ghillie Suits", price: 500 },
  { name: "NBC Suit pieces", price: 200 },
  { name: "Ammo", price: 100 },
  { name: "Medical Items", price: 50 },
  { name: "M79", price: 10000 },
];

const sellableItems = [
  { category: "Cigarettes" },
  { name: "Cigs: Blue", price: -500 },
  { name: "Cigs: M20", price: -200 },
  { name: "Cigs: Partyanka Woman", price: -100 },
  { category: "Teddy Bears" },
  { name: "Pink Teddy", price: -500 },
  { name: "Other Teddy", price: -100 },
  { category: "Predator Pelts" },
  { name: "Bear Pelt", price: -250 },
  { name: "Wolf Pelt", price: -100 },
  { category: "Contraband" },
  { name: "Vodka", price: -100 },
  { name: "Weed", price: -10 },
  { name: "Faction Armband", price: -100 },
  { name: "Merc Armband", price: -50 },
  { category: "Guns & Plate Carrier" },
  { name: "T4 Guns", price: -250 },
  { name: "Plate Carrier", price: -200 },
];

const itemSelect = document.getElementById("itemSelect");
const sellableItemSelect = document.getElementById("sellableItemSelect");
const blackMarketItemSelect = document.getElementById("blackMarketItemSelect");
const quantityInput = document.getElementById("quantityInput");
const addToCartButton = document.getElementById("addToCartButton");
const addToSellableCartButton = document.getElementById("addToSellableCartButton");
const cartList = document.getElementById("cartList");
const totalPriceDisplay = document.getElementById("totalPrice");
const notification = document.getElementById("notification");
const closeNotificationButton = document.getElementById("closeNotification");
const cart = [];
const sellableCart = [];
const blackMarketCart = [];

// Populate the dropdown with item names
for (const item of items) {
  if (item.name) {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;
    itemSelect.appendChild(option);
  }
}

// Populate the dropdown with item names for Sellables
for (const item of sellableItems) {
  if (item.name) {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;
    sellableItemSelect.appendChild(option);
  }
}

  // Populate the dropdown with item names for Black Market
  for (const item of blackMarketItems) {
    if (item.name) {
      const option = document.createElement("option");
      option.value = item.name;
      option.textContent = item.name;
      blackMarketItemSelect.appendChild(option);
    }
  }

// add items to the normal trader cart
addToCartButton.addEventListener("click", () => {
  const selectedItemName = itemSelect.value;
  const selectedItem = items.find((item) => item.name === selectedItemName);
  const quantity = parseInt(quantityInput.value);
  const cartItem = { ...selectedItem, quantity };

  if (selectedItem && quantity > 0) {
    // Find an existing item in the cart by name
    const existingCartItem = cart.find(
      (item) => item.name === selectedItemName
    );
    if (existingCartItem) {
      // If the item is already in the cart, check its quantity
      existingCartItem.quantity = quantity + existingCartItem.quantity;
    } else {
      const cartItem = { ...selectedItem, quantity: quantity };
      cart.push(cartItem);
    }
    updateCartDisplay();
  }
});

// Handle adding items to the "Sellables" section
addToSellableCartButton.addEventListener("click", () => {
  const selectedItemName = sellableItemSelect.value;
  const selectedItem = sellableItems.find(
    (item) => item.name === selectedItemName
  );
  const quantity = parseInt(sellableQuantityInput.value);

  if (selectedItem && quantity > 0) {
    // Find an existing item in the cart by name
    const existingCartItem = cart.find(
      (item) => item.name === selectedItemName
    );
    if (existingCartItem) {
      existingCartItem.quantity =
        parseInt(sellableQuantityInput.value) + existingCartItem.quantity;
    } else {
      // If the item is not in the cart, add it (use the same cartItem structure)
      const cartItem = { ...selectedItem, quantity: quantity };
      cart.push(cartItem);
    }
    updateCartDisplay();
  }
});

// Handle adding items to the "Black Market" section
addToBlackMarketCartButton.addEventListener("click", () => {
  const selectedItemName = blackMarketItemSelect.value;
  const selectedItem = blackMarketItems.find(
    (item) => item.name === selectedItemName
  );
  const quantity = parseInt(blackMarketQuantityInput.value);
  if (selectedItem && quantity > 0) {
    // Find an existing item in the cart by name
    const existingCartItem = cart.find(
      (item) => item.name === selectedItemName
    );
    if (existingCartItem) {
      existingCartItem.quantity = quantity + existingCartItem.quantity;
    } else {
      const cartItem = { ...selectedItem, quantity: quantity };
      cart.push(cartItem);
    }
    updateCartDisplay();
  }
});

function updateCartDisplay() {
  cartList.innerHTML = "";
  let total = 0;

  // Display normal trader cart items
  for (const [index, cartItem] of cart.entries()) {
    const li = document.createElement("li");
    li.textContent = `${cartItem.name} x${cartItem.quantity} - $${
      cartItem.price * cartItem.quantity
    }`;

    // Create a "Remove" button with a material icon(Or just "delete" cuz that looks better)
    const removeButton = document.createElement("button");
    removeButton.classList.add("custom-remove-button");
    removeButton.innerHTML =
      '<span class="material-symbols-sharp">Delete</span>';
    removeButton.style = "width: 3.5rem; height: 1.75rem;";
    removeButton.addEventListener("click", () => removeItemFromCart(index));
    li.appendChild(removeButton);

    cartList.appendChild(li);
    total += cartItem.price * cartItem.quantity;
  }

  // Display sellables cart items in a separate section
  if (sellableCart.length > 0) {
    const sellablesSection = document.createElement("li");
    sellablesSection.textContent = "Sellables:";
    cartList.appendChild(sellablesSection);

    for (const sellableItem of sellableCart) {
      const li = document.createElement("li");
      li.textContent = `${sellableItem.name} x${sellableItem.quantity} - $${
        sellableItem.price * sellableItem.quantity
      }`;

      const removeButton = document.createElement("button");
      removeButton.classList.add("custom-remove-button");
      removeButton.innerHTML =
        '<span class="material-symbols-sharp">Delete</span>';
      removeButton.style = "width: 3.5rem; height: 1.75rem;";
      removeButton.addEventListener("click", () =>
        removeSellableItemFromCart(sellableItem)
      );
      li.appendChild(removeButton);

      cartList.appendChild(li);
      total += sellableItem.price * sellableItem.quantity;
    }
  }

  // Display black market cart items in a separate section
  if (blackMarketCart.length > 0) {
    const blackMarketSection = document.createElement("li");
    blackMarketSection.textContent = "Black Market Items:";
    cartList.appendChild(blackMarketSection);

    for (const blackMarketItem of blackMarketCart) {
      const li = document.createElement("li");
      li.textContent = `${blackMarketItem.name} x${
        blackMarketItem.quantity
      } - $${blackMarketItem.price * blackMarketItem.quantity}`;

      const removeButton = document.createElement("button");
      removeButton.classList.add("custom-remove-button");
      removeButton.innerHTML =
        '<span class="material-symbols-sharp">Delete</span>';
      removeButton.style = "width: 3.5rem; height: 1.75rem;";
      removeButton.addEventListener("click", () =>
        removeBlackMarketItemFromCart(blackMarketItem)
      );
      li.appendChild(removeButton);

      cartList.appendChild(li);
      total += blackMarketItem.price * blackMarketItem.quantity;
    }
  }

  totalPriceDisplay.textContent = `Total Price: $${total}`;
}

// remove item from cart
function removeItemFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1); // Remove the item from the cart array
    updateCartDisplay(); // Update the cart display
  }
}
// remove sellable from cart
function removeSellableItemFromCart(item) {
  const index = sellableCart.findIndex((cartItem) => cartItem === item);
  if (index !== -1) {
    sellableCart.splice(index, 1);
    updateCartDisplay();
  }
}
// remove BMD item from cart
function removeBlackMarketItemFromCart(item) {
  const index = blackMarketCart.findIndex((cartItem) => cartItem === item);
  if (index !== -1) {
    blackMarketCart.splice(index, 1);
    updateCartDisplay();
  }
}


//Calculate the total of the sellables
function calculateSellablesTotal() {
  var total = 0;
  for (const item of sellableCart) {
    if (item.price) {
      total += item.price * item.quantity;
    }
  }
  return total;
}

//calculate the total of the items in  the cart
function calculateTotal() {
  let total = 0;
  for (const item of cart) {
    if (item.price) {
      total += item.price * item.quantity;
    }
  }
  for (const item of blackMarketCart) {
    if (item.price) {
      total += item.price * item.quantity;
    }
  }
  return total;
}