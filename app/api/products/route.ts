import { products } from '@/lib/products';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  if (process.env.PRODUCT_API_FAILURE === '1') return Response.json({error:'Product service temporarily unavailable.'},{status:503});
  const params = new URL(request.url).searchParams;
  const q = params.get('q') ?? '';
  if (q.length > 100) return Response.json({error:'Search must be 100 characters or fewer.'},{status:400});
  const id = params.get('id');
  if (id !== null) {
    const product = products.find(p => p.id === id);
    return product ? Response.json(product) : Response.json({error:'Product not found.'},{status:404});
  }
  const category = params.get('category');
  const categories = ['Audio','Everyday','Wearables','Workspace'];
  if (category && !categories.includes(category)) return Response.json({error:'Unknown category.'},{status:400});
  return Response.json(products.filter(p => (!category || p.category === category) && `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q.trim().toLowerCase())));
}
