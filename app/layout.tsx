import type {Metadata} from 'next';
import {CartProvider} from '@/components/CartProvider';
import {Header} from '@/components/Header';
import './globals.css';
import styles from './store.module.css';
export const metadata:Metadata={title:'Forme | Thoughtful everyday essentials',description:'A student e-commerce store with a searchable catalog, product details and a working shopping bag.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><CartProvider><Header/>{children}<footer className={styles.footer}><div><span className={styles.logo}>forme<span>®</span></span><p>Good things, thoughtfully chosen.</p></div><p>E-Commerce Store · WAF-II Unit 4<br/>MANASA H M · PES1PG25CA402</p><p>Student demonstration<br/>Synthetic products · No real payments</p></footer></CartProvider></body></html>;}
