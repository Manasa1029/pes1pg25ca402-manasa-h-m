'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { products, type Product } from '@/lib/products';
type CartItem = { product: Product; quantity: number };
type Cart = { items: CartItem[]; ready: boolean; count: number; subtotal: number; add:(product:Product)=>void; update:(id:string, quantity:number)=>void; remove:(id:string)=>void; clear:()=>void; notice:string };
const Context = createContext<Cart | null>(null);
export function CartProvider({children}:{children:ReactNode}) {
  const [items,setItems] = useState<CartItem[]>([]);
  const [ready,setReady] = useState(false);
  const [notice,setNotice] = useState('');
  useEffect(()=>{try {const saved: unknown = JSON.parse(localStorage.getItem('forme-cart-v1') || '[]'); if(Array.isArray(saved)) setItems(saved.flatMap(row=>{const p=products.find(p=>p.id===row?.id); return p && Number.isInteger(row?.quantity) && row.quantity>0 && row.quantity<=99 ? [{product:p, quantity:row.quantity}] : [];}));}catch{} setReady(true);},[]);
  useEffect(()=>{if(ready) try{localStorage.setItem('forme-cart-v1',JSON.stringify(items.map(i=>({id:i.product.id,quantity:i.quantity}))));}catch{}},[items,ready]);
  useEffect(()=>{if(!notice)return; const timer=setTimeout(()=>setNotice(''),2600);return ()=>clearTimeout(timer);},[notice]);
  function add(product:Product) {setItems(old=>{const exists=old.some(i=>i.product.id===product.id);return exists?old.map(i=>i.product.id===product.id?{...i,quantity:Math.min(99,i.quantity+1)}:i):[...old,{product,quantity:1}];});setNotice(`${product.name} added to your bag`);}
  function update(id:string,quantity:number) {if(!Number.isInteger(quantity)||quantity<1||quantity>99)return;setItems(old=>old.map(i=>i.product.id===id?{...i,quantity}:i));}
  return <Context.Provider value={{items,ready,count:items.reduce((s,i)=>s+i.quantity,0),subtotal:items.reduce((s,i)=>s+i.product.price*i.quantity,0),add,update,remove:id=>setItems(old=>old.filter(i=>i.product.id!==id)),clear:()=>setItems([]),notice}}>{children}</Context.Provider>;
}
export function useCart(){const cart=useContext(Context);if(!cart)throw new Error('CartProvider is required');return cart;}
