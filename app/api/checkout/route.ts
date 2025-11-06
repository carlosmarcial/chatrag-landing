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
    const url = new URL(request.url)
    const origin = `${url.protocol}//${url.host}`

    const searchParams = request.nextUrl.searchParams
    const productsParam = searchParams.get('products')

    if (!productsParam) {
      return NextResponse.json({ error: 'Products parameter is required' }, { status: 400 })
    }

    const productIds = productsParam.split(',')
    const cookieStore = await cookies()

    const checkout = await polar.checkouts.create({
      products: productIds,
      // Use the current origin to ensure success URL always matches the domain the user is on (e.g. www vs apex)
      successUrl: `${origin}/success`,
      metadata: {
        datafast_visitor_id: cookieStore.get('datafast_visitor_id')?.value || '',
        datafast_session_id: cookieStore.get('datafast_session_id')?.value || '',
      },
    })

    // If this endpoint was navigated to directly (e.g. <a href>), redirect.
    // If it was fetched via XHR/fetch, return JSON so client can navigate.
    const accept = request.headers.get('accept') || ''
    if (accept.includes('text/html')) {
      return NextResponse.redirect(checkout.url, 302)
    }

    return NextResponse.json({ url: checkout.url })
  } catch (error) {
    console.error('Checkout creation error:', error)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
