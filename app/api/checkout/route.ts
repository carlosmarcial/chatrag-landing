import { Polar } from "@polar-sh/sdk"
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Next.js App Router route handler
// GET /api/checkout?products=<PRODUCT_ID>[,PRODUCT_ID2]

// Map known Product IDs -> pre-generated Checkout Links as a safety net
// Note: These NEXT_PUBLIC_* envs are safe to expose since they're only URLs
const CHECKOUT_LINKS: Record<string, string | undefined> = {
  // ChatRAG Complete (PRO)
  'c9cb30b2-3c43-44fc-9070-19c9cc02a24d':
    process.env.NEXT_PUBLIC_POLAR_CHECKOUT_PRO ||
    'https://buy.polar.sh/polar_cl_lvSS3wcGkuvr9eGbpntB8lpW9ZvkI6mQXpl7C4choiG',
  // ChatRAG Starter
  '1fccb238-c09e-41fd-9875-d7eba1167467':
    process.env.NEXT_PUBLIC_POLAR_CHECKOUT_STARTER ||
    'https://buy.polar.sh/polar_cl_xdoxgTeLqJ9s5T7dO6yZ8nyYhKK62oYmTynyv2DtBMH',
}

const polar = new Polar({
  // If POLAR_ACCESS_TOKEN is missing we will fall back to static checkout links below
  accessToken: process.env.POLAR_ACCESS_TOKEN ?? "",
  // Force production server; no sandbox usage in this project
  server: 'production',
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

    // If we don't have a server-side access token, use the static checkout link as a resilient fallback
    const missingToken = !process.env.POLAR_ACCESS_TOKEN
    if (missingToken && productIds.length === 1) {
      const fallback = CHECKOUT_LINKS[productIds[0]]
      if (fallback) {
        // Prefer redirect for direct navigations, otherwise return JSON
        const accept = request.headers.get('accept') || ''
        if (accept.includes('text/html')) {
          return NextResponse.redirect(fallback, 302)
        }
        return NextResponse.json({ url: fallback })
      }
    }

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
  } catch (error: any) {
    // Try to surface Polar API error details if available
    const message = typeof error?.message === 'string' ? error.message : 'Unknown error'
    const status = typeof error?.status === 'number' ? error.status : 500
    console.error('Checkout creation error:', message, error)

    // Final fallback: if we know the product and have a static link, use it so customers can still pay
    try {
      const url = new URL(request.url)
      const productsParam = new URL(url).searchParams.get('products')
      const productId = productsParam?.split(',')[0]
      const fallback = productId ? CHECKOUT_LINKS[productId] : undefined
      if (fallback) {
        const accept = request.headers.get('accept') || ''
        if (accept.includes('text/html')) {
          return NextResponse.redirect(fallback, 302)
        }
        return NextResponse.json({ url: fallback, warning: 'Fell back to static checkout link' })
      }
    } catch {}

    return NextResponse.json({ error: 'Failed to create checkout' }, { status })
  }
}
