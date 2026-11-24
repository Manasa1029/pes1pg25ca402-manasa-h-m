'use client';
import {useCart} from './CartProvider';
import type {Product} from '@/lib/products';
import styles from '@/app/store.module.css';
export function AddToCart({product}:{product:Product}){const {add,ready}=useCart();return <button className={styles.primary} disabled={!ready} onClick={()=>add(product)}>Add to bag</button>;}
