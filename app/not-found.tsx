import Link from 'next/link';
import styles from './store.module.css';
export default function NotFound(){return <main className={styles.empty}><p className={styles.eyebrow}>404 / SOMETHING IS MISSING</p><h1>This product isn’t on the shelf.</h1><p>The product or page you’re looking for could not be found.</p><Link className={styles.primary} href="/products">Browse the collection</Link></main>;}
