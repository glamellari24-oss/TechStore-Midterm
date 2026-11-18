// Enkel Cani: cart state, actions, totals and browser persistence.
'use strict';
const STORAGE_KEY='techstore-midterm-cart-v1';
let cart=[];
try {
  const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
  if(Array.isArray(saved)){
    for(const item of saved){
      if(item && products.some(p=>p.id===item.id) && Number.isInteger(item.quantity) && item.quantity>0 && !cart.some(p=>p.id===item.id)){
        cart.push({id:item.id,quantity:Math.min(item.quantity,99)});
      }
    }
  }
} catch { cart=[]; } // The demo still works if storage is blocked or invalid.
let toastTimer;
function notify(message){
  const status=document.querySelector('#status');
  status.textContent=message;status.classList.add('visible');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>status.classList.remove('visible'),2200);
}
function renderCart(){
  let total=0,count=0;
  document.querySelector('#cart-items').innerHTML=cart.length?cart.map(item=>{
    const p=products.find(p=>p.id===item.id);
    total+=p.price*item.quantity;count+=item.quantity;
    return `<div class="cart-row"><div><h3>${p.name}</h3><p>${money(p.price)} each · ${money(p.price*item.quantity)}</p><button type="button" class="remove" data-remove="${p.id}" aria-label="Remove ${p.name}">Remove</button></div><div class="quantity"><button type="button" data-change="-1" data-id="${p.id}" aria-label="Decrease ${p.name} quantity">−</button><span>${item.quantity}</span><button type="button" data-change="1" data-id="${p.id}" aria-label="Increase ${p.name} quantity" ${item.quantity>=99?'disabled':''}>+</button></div></div>`;
  }).join(''):'<p class="empty">Your cart is empty. Find something you love above.</p>';
  document.querySelector('#cart-count').textContent=count;
  document.querySelector('#cart-total').textContent=money(total);
  document.querySelector('#clear-cart').disabled=cart.length===0;
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(cart));}catch{/* Cart remains usable in memory. */}
}
document.querySelector('#product-grid').addEventListener('click',event=>{
  const button=event.target.closest('[data-add]');if(!button)return;
  const id=Number(button.dataset.add),p=products.find(p=>p.id===id);if(!p)return;
  const item=cart.find(item=>item.id===id);
  if(item && item.quantity>=99){notify('Maximum quantity: 99 per product.');return;}
  if(item)item.quantity++;else cart.push({id,quantity:1});
  renderCart();notify(p.name+' added to cart');
});
document.querySelector('#cart-items').addEventListener('click',event=>{
  const remove=event.target.closest('[data-remove]');
  const change=event.target.closest('[data-change]');
  if(remove){cart=cart.filter(item=>item.id!==Number(remove.dataset.remove));renderCart();return;}
  if(change){
    const id=Number(change.dataset.id),delta=Number(change.dataset.change);
    const item=cart.find(item=>item.id===id);if(!item)return;
    item.quantity=Math.min(99,item.quantity+delta);cart=cart.filter(item=>item.quantity>0);
    renderCart();
    // Keep keyboard focus on a quantity control after the cart is redrawn.
    const next=document.querySelector(`[data-id="${id}"][data-change="${delta}"]:not(:disabled)`);
    if(next)next.focus();else document.querySelector('#clear-cart').focus();
  }
});
document.querySelector('#clear-cart').addEventListener('click',()=>{cart=[];renderCart();notify('Cart cleared');});
renderCart();
