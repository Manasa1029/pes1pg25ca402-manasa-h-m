import {Suspense} from 'react';
import {Catalog} from './Catalog';
export default function ProductsPage(){return <Suspense fallback={<main style={{padding:80}}>Loading the collection...</main>}><Catalog/></Suspense>;}
