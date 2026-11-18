TECHSTORE
Web Development and Programming — Midterm Project

PROJECT OVERVIEW
TechStore is an electronics shop front-end prototype built with HTML,
CSS and JavaScript. The midterm version includes a responsive interface,
product browsing and a browser-based shopping cart.

GROUP RESPONSIBILITIES
Glejdis Lamellari — index.html and search.js
HTML structure, navigation, page sections, team information and live search
across product names, descriptions and categories.

Elsid Latifi — styles.css
Visual styling, product card layout and responsive design.

Daniel Cullhaj — products.js
Product data, illustrations, product card rendering, category filtering
and price sorting.

Enkel Cani — cart.js
Adding and removing items, quantity controls, calculated totals and
cart persistence using localStorage when available.

RUNNING THE PROJECT
Extract the folder and open index.html in a modern browser.
For development, open the folder in Visual Studio Code and use Live Server.
No build process or external libraries are required.

FILE CONNECTIONS
index.html loads styles.css and three deferred scripts in this order:
products.js, search.js, cart.js.
products.js defines the catalog and renderProducts function.
search.js defines matchesSearch, connects the search input and displays
the initial catalog. Category and sorting changes also call renderProducts,
so the active search and filters work together.
cart.js uses the catalog data to manage cart quantities and totals.

IMPLEMENTED FEATURES
Responsive layout; six sample products; live search; category filtering;
price sorting; cart quantity controls; item removal; automatic totals;
empty states; browser storage when available.

CURRENT LIMITATIONS AND FINAL PROJECT PLANS
Products and prices are demonstration data. Cart data stays in the user's
browser. Product detail pages, user accounts, a backend database and a
checkout workflow are planned for the final project. This prototype does
not submit real orders or process payments.
