import { NextResponse } from 'next/server'
import { Polar } from '@polar-sh/sdk'

export const dynamic = 'force-dynamic'

export async function GET() {
  const hasToken = !!process.env.POLAR_ACCESS_TOKEN
  const polar = new Polar({ accessToken: process.env.POLAR_ACCESS_TOKEN ?? '', server: 'production' })

  try {
    // Sanity call: fetch known product (pro)
    const proId = 'c9cb30b2-3c43-44fc-9070-19c9cc02a24d'
    const product = await polar.products.get({ id: proId })
    return NextResponse.json({ ok: true, hasToken, server: 'production', product: { id: product.id, name: (product as any).name ?? null } })
  } catch (error: any) {
    const status = typeof error?.status === 'number' ? error.status : 500
    const message = typeof error?.message === 'string' ? error.message : 'Unknown error'
    // Some SDK errors include a body with details
    const details = error?.body ?? null
    return NextResponse.json({ ok: false, hasToken, server: 'production', status, message, details }, { status: 200 })
  }
}