const cart=[];
const menuBtn=document.getElementById("menuBtn");
const header=document.querySelector(".header");
menuBtn.addEventListener("click",()=>header.classList.toggle("nav-open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>header.classList.remove("nav-open")));

function money(v){
  return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

function addToCart(name,price){
  cart.push({name,price});
  document.getElementById("cartCount").textContent=cart.length;
  renderCart();
  openCart();
}

function removeItem(index){
  cart.splice(index,1);
  document.getElementById("cartCount").textContent=cart.length;
  renderCart();
}

function renderCart(){
  const box=document.getElementById("cartItems");
  const total=document.getElementById("cartTotal");
  if(!cart.length){
    box.innerHTML='<p style="color:#777;padding:20px 0">Seu carrinho está vazio.</p>';
    total.textContent=money(0);
    return;
  }
  box.innerHTML=cart.map((item,i)=>`
    <div class="cart-line">
      <span>${item.name}</span>
      <strong>${money(item.price)} <button onclick="removeItem(${i})" style="background:none;border:0;color:#ff2630;cursor:pointer">×</button></strong>
    </div>`).join("");
  total.textContent=money(cart.reduce((sum,item)=>sum+item.price,0));
}

function openCart(){
  document.getElementById("cartModal").classList.add("open");
  renderCart();
}

function closeCart(){
  document.getElementById("cartModal").classList.remove("open");
}

function checkout(){
  if(!cart.length){
    alert("Adicione algum produto ao carrinho primeiro.");
    return;
  }
  const text=cart.map(i=>`${i.name} — ${money(i.price)}`).join("\n");
  const total=cart.reduce((s,i)=>s+i.price,0);
  const message=`Olá! Quero fazer um pedido na VORQ Automotive:\n\n${text}\n\nTotal: ${money(total)}`;
  const phone="5500000000000";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`,"_blank");
}
renderCart();
