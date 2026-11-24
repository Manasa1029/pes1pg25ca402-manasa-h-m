'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useCart} from './CartProvider';
import styles from '@/app/store.module.css';
export function Header(){const {count,notice}=useCart();const path=usePathname();return <><div className={styles.announcement}>Thoughtful essentials. Everyday possibilities. <span>Complimentary delivery on every order</span></div><header className={styles.header}><Link className={styles.logo} href="/products" aria-label="Forme home">forme<span>®</span></Link><nav aria-label="Main navigation"><Link className={path==='/products'?styles.active:''} href="/products">Shop all</Link><Link href="/products?category=Audio">Audio</Link><Link href="/products?category=Workspace">Workspace</Link><Link href="/products?category=Everyday">Everyday</Link></nav><Link className={styles.bag} href="/cart"><svg width="20" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg>Bag <span>{count}</span></Link></header>{notice&&<div role="status" className={styles.toast}>{notice}</div>}</>;}
