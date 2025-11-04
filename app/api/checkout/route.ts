import { Checkout } from "@polar-sh/nextjs"
import { cookies } from 'next/headers'

// Next.js App Router route handler
// GET /api/checkout?products=<PRODUCT_ID>[,PRODUCT_ID2]
const server =
  process.env.POLAR_SERVER === "sandbox"
    ? "sandbox"
    : process.env.POLAR_SERVER === "production"
    ? "production"
    : undefined

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.SUCCESS_URL,
  server,
  // Optional theme override. Remove to use system theme.
  // theme: "dark",
  customData: async () => {
    const cookieStore = await cookies()
    return {
      datafast_visitor_id: cookieStore.get('datafast_visitor_id')?.value,
      datafast_session_id: cookieStore.get('datafast_session_id')?.value,
    }
  },
})
