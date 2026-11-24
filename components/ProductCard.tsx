'use client';
import Link from 'next/link';
import {type Product,money} from '@/lib/products';
import {useCart} from './CartProvider';
import styles from '@/app/store.module.css';
export function ProductCard({product:p}:{product:Product}){const {add,ready}=useCart();return <article className={styles.card}><Link href={`/products/${p.id}`} className={styles.productImage}><span className={styles.tag}>{p.tag}</span><img src={p.image} alt={`${p.name} in ${p.color}`} width="400" height="300"/></Link><div className={styles.cardInfo}><div><p className={styles.eyebrow}>{p.category}</p><Link href={`/products/${p.id}`}><h3>{p.name}</h3></Link><p className={styles.muted}>{p.color}</p></div><strong>{money(p.price)}</strong></div><button className={styles.addButton} disabled={!ready} onClick={()=>add(p)} aria-label={`Add ${p.name} to bag`}>Add to bag <span aria-hidden="true">+</span></button></article>;}
