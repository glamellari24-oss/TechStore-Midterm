// Daniel Cullhaj: product data, rendering, categories and price sorting.
'use strict';
const products = [
  {id:1,name:'Studio Laptop',category:'Laptops',price:849,description:'15.6-inch display · 16GB RAM · 512GB SSD',icon:'laptop'},
  {id:2,name:'Air Headphones',category:'Audio',price:89,description:'Wireless comfort for music and focused work.',icon:'headphones'},
  {id:3,name:'Minimal Keyboard',category:'Accessories',price:59,description:'Compact layout with comfortable, quiet keys.',icon:'keyboard'},
  {id:4,name:'Everyday Laptop',category:'Laptops',price:549,description:'14-inch display · 8GB RAM · 256GB SSD',icon:'laptop'},
  {id:5,name:'Pocket Speaker',category:'Audio',price:39,description:'Portable audio for your desk and beyond.',icon:'speaker'},
  {id:6,name:'Precision Mouse',category:'Accessories',price:29,description:'Wireless control with a comfortable grip.',icon:'mouse'}
];
// Original inline SVG illustrations: no external images or downloads required.
const drawings = {
  laptop:'<rect x="22" y="22" width="116" height="76" rx="6" fill="#284b43"/><rect x="29" y="29" width="102" height="62" rx="2" fill="#bada9a"/><path d="M10 100h140l-10 9H20z" fill="#7b9586"/><path d="m40 79 30-31 22 19 24-24" stroke="#537e61" stroke-width="5" fill="none"/>',
  headphones:'<path d="M38 72V58a42 42 0 0 1 84 0v14" fill="none" stroke="#284b43" stroke-width="14"/><rect x="26" y="58" width="26" height="48" rx="12" fill="#75966b"/><rect x="108" y="58" width="26" height="48" rx="12" fill="#75966b"/>',
  keyboard:'<rect x="8" y="35" width="144" height="62" rx="8" fill="#284b43"/>' + Array.from({length:24},(_,i)=>'<rect x="'+(17+i%8*16)+'" y="'+(44+Math.floor(i/8)*14)+'" width="11" height="8" rx="2" fill="#c6dfac"/>').join('')+'<rect x="50" y="86" width="60" height="5" rx="2" fill="#c6dfac"/>',
  speaker:'<rect x="45" y="10" width="70" height="110" rx="17" fill="#284b43"/><circle cx="80" cy="76" r="24" fill="#73936d"/><circle cx="80" cy="76" r="15" fill="#bdd89f"/><circle cx="80" cy="32" r="7" fill="#bdd89f"/>',
  mouse:'<rect x="48" y="10" width="64" height="108" rx="32" fill="#75966b"/><path d="M80 11v44M49 55h62" fill="none" stroke="#284b43" stroke-width="3"/><rect x="76" y="27" width="8" height="18" rx="4" fill="#d4edb6"/>'
};
const money = value => new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR'}).format(value);
function renderProducts(){
  const category=document.querySelector('#category').value;
  const sort=document.querySelector('#sort').value;
  const visible=products.filter(p=>(category==='All'||p.category===category)&&matchesSearch(p));
  if(sort==='low') visible.sort((a,b)=>a.price-b.price);
  if(sort==='high') visible.sort((a,b)=>b.price-a.price);
  document.querySelector('#result-count').textContent=visible.length+' products';
  document.querySelector('#product-grid').innerHTML=visible.length?visible.map(p=>`<article class="product-card"><div class="product-art"><svg viewBox="0 0 160 130" aria-hidden="true">${drawings[p.icon]}</svg></div><div class="product-info"><span class="category">${p.category}</span><h3>${p.name}</h3><p class="description">${p.description}</p><div class="product-bottom"><strong>${money(p.price)}</strong><button type="button" class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to cart">Add to cart +</button></div></div></article>`).join(''):'<p class="empty">No products found. Try another search or category.</p>';
}
document.querySelector('#category').addEventListener('change',renderProducts);
document.querySelector('#sort').addEventListener('change',renderProducts);
