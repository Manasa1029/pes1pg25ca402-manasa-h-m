# Forme - E-Commerce Store

MANASA H M | PES1PG25CA402 | UQ25CA752A - WAF-II Unit 4

A Next.js App Router and TypeScript implementation of Project 7. The six products, illustrations and product specifications are synthetic demonstration content. No real payment, customer address, authentication or database is needed for the assessed scope.

## Run on Windows

Install Node.js 20.9 or later (Node.js 24 is used for this submission). Open this folder in a terminal:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run start
```

Open http://localhost:3000/products. After the first installation, double-click `Start-Store.cmd` to build if necessary, start the store and open a browser. Keep that terminal open while using the store. Stop it with Ctrl+C. For development, use `npm.cmd run dev`.

If a trusted Windows certificate is required by your network, Node 24 supports `$env:NODE_USE_SYSTEM_CA='1'`. TLS verification remains enabled.

## Required features and paths

| Requirement | Implementation |
| --- | --- |
| Product catalog, search, category filter, sort | `app/products/page.tsx`, `app/products/Catalog.tsx` |
| Dynamic detail page and unknown-product fallback | `app/products/[id]/page.tsx`, `app/not-found.tsx` |
| Shared cart, add, remove, quantity, immediate totals | `components/CartProvider.tsx`, `app/cart/page.tsx` |
| Product cards | `components/ProductCard.tsx` |
| Local mock product API and server validation | `app/api/products/route.ts` |
| Typed synthetic data | `lib/products.ts` |
| Checkout matching cart items and totals | `app/checkout/page.tsx` |
| Responsive scoped styling | `app/store.module.css` |

## Three assessed concepts

1. **Dynamic Routes:** `[id]` resolves a matching product from the local catalog. The server awaits route parameters and uses `notFound()` for unknown IDs.
2. **State Management:** React Context provides the same cart to the header, cards, product details, cart and checkout. Functional immutable updates merge duplicate additions, bound quantities to 1-99 and recalculate count and subtotal. Browser storage is read after mount and stores only IDs and quantities; prices come from trusted local data. Persistence is a supporting convenience.
3. **API Integration:** The client fetches `/api/products`, checks HTTP success and response shape, and renders loading, error, retry and empty states. The Route Handler supports `q`, `category` and `id`; invalid input returns 400 and an unknown ID returns 404.

CSS Modules, TypeScript, accessibility and responsive layout support these three concepts. There is no payment processing or order-persistence claim. Demo confirmation is UI state only. Delivery is free and prices include taxes, so total equals subtotal.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd run build
# With the production server running:
npm.cmd run test:api
```

`evidence/api-tests.json` records actual HTTP test results. Browser evidence and screenshots are supplied alongside the submission PDF. Manual checks: add the same product twice, change quantity, add a second product, remove it, verify totals and checkout, reload for persistence, search with no matches, reset filters, test every direct route and mobile width.

To reproduce a real service failure without adding a demo control to the storefront, stop the server, set `$env:PRODUCT_API_FAILURE='1'`, and start it again. The API returns HTTP 503. Open the catalog to verify the error and Try again button. Stop the server, remove the variable with `Remove-Item Env:PRODUCT_API_FAILURE`, restart, then click Try again to recover. Never set this variable in a normal deployment.

## GitHub and Vercel

Required repository name: `pes1pg25ca402-manasa-h-m`. Source excludes `.env*`, `node_modules`, `.next`, `.vercel` and logs. The application requires no production secrets or database.

Push the source to the student's GitHub repository, import that repository in Vercel, choose the Next.js preset and keep default build settings. Deploy. Test `/products`, a direct `/products/1` visit, `/api/products`, unknown IDs, search, cart and checkout on the actual production URL. Record the verified GitHub and production links in the submission PDF. A local production build alone is not proof of Vercel deployment.

## Reference

Assignment: WAF-II-EL-4.pdf, Project 7, page 9; submission package page 1; deployment procedure page 13. Framework references: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes and https://nextjs.org/docs/app/getting-started/route-handlers.
