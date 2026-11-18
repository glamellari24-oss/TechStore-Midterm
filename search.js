// Glejdis Lamellari: live product search.
'use strict';

// Read the search field and check whether a product matches its text.
function matchesSearch(product) {
  const query = document.querySelector('#search').value.trim().toLowerCase();
  const text = product.name + ' ' + product.description + ' ' + product.category;
  return text.toLowerCase().includes(query);
}

// Refresh the product list whenever the user types or deletes text.
document.querySelector('#search').addEventListener('input', renderProducts);

// Display the initial product list after the search function is available.
renderProducts();
