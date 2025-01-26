import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { formatToCurrency } from '@/utils/format-currency'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1 Hour
    },
  })
  const products = await response.json()
  return products
}
export default async function Home() {
  const [highLightedProducts, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLightedProducts.slug}`}
        className="col-span-6 relative group row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          className="group-hover:scale-105 transition-transform duration-500"
          src={highLightedProducts.image}
          width={920}
          height={920}
          quality={100}
          alt=""
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highLightedProducts.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {formatToCurrency(highLightedProducts.price)}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="col-span-3 relative group row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            className="group-hover:scale-105 transition-transform duration-500"
            src={product.image}
            width={920}
            height={920}
            quality={100}
            alt=""
          />

          <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{product.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {formatToCurrency(product.price)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
