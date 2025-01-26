import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { formatToCurrency } from '@/utils/format-currency'
import Image from 'next/image'

interface ProductProps {
  params: {
    slug: string
  }
}
async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 Hour
    },
  })
  const product = await response.json()
  return product
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.slug)

  return (
    <div className="relative mx-auto grid max-w-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-6 2xl:px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block px-5 py-2.5 font-semibold rounded-full bg-violet-500">
            {formatToCurrency(product.price)}
          </span>
          <span className="text-sm text-zinc-400">
            em 12x s/juros de {formatToCurrency(product.price / 12, true)}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 text-sm font-semibold items-center justify-center rounded-full border border-zinc-700 bg-zinc-800"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 text-sm font-semibold items-center justify-center rounded-full border border-zinc-700 bg-zinc-800"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 text-sm font-semibold items-center justify-center rounded-full border border-zinc-700 bg-zinc-800"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 text-sm font-semibold items-center justify-center rounded-full border border-zinc-700 bg-zinc-800"
            >
              GG
            </button>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}
