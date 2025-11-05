import { Polar } from "@polar-sh/sdk"
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Next.js App Router route handler
// GET /api/checkout?products=<PRODUCT_ID>[,PRODUCT_ID2]
const server =
  process.env.POLAR_SERVER === "sandbox"
    ? "sandbox"
    : process.env.POLAR_SERVER === "production"
    ? "production"
    : undefined

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server,
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productsParam = searchParams.get('products')

    if (!productsParam) {
      return NextResponse.json({ error: 'Products parameter is required' }, { status: 400 })
    }

    const productIds = productsParam.split(',')
    const cookieStore = await cookies()

    const checkout = await polar.checkouts.create({
      products: productIds,
      successUrl: process.env.SUCCESS_URL!,
      metadata: {
        datafast_visitor_id: cookieStore.get('datafast_visitor_id')?.value || '',
        datafast_session_id: cookieStore.get('datafast_session_id')?.value || '',
      },
    })

    // Return JSON with checkout URL for client-side redirect (works better on mobile)
    return NextResponse.json({ url: checkout.url })
  } catch (error) {
    console.error('Checkout creation error:', error)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
