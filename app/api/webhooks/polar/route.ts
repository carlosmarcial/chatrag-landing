import { validateEvent } from "@polar-sh/sdk/webhooks"
import { NextRequest, NextResponse } from "next/server"

// Webhook endpoint to receive Polar events and forward to Refgrow
// POST /api/webhooks/polar
export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error("POLAR_WEBHOOK_SECRET is not configured")
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      )
    }

    // Get the raw body and headers
    const body = await request.text()
    const headers = {
      "webhook-id": request.headers.get("webhook-id") || "",
      "webhook-timestamp": request.headers.get("webhook-timestamp") || "",
      "webhook-signature": request.headers.get("webhook-signature") || "",
    }

    // Validate the webhook using Polar's SDK
    let payload: ReturnType<typeof validateEvent>
    try {
      payload = validateEvent(body, headers, webhookSecret)
    } catch (error) {
      console.error("Webhook validation failed:", error)
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      )
    }

    console.log("Received Polar webhook:", payload.type)

    // Forward subscription.created and order.created events to Refgrow
    if (payload.type === "subscription.created" || payload.type === "order.created") {
      const refgrowProjectId = "490"
      const refgrowWebhookUrl = `https://refgrow.com/webhook/polar/${refgrowProjectId}`

      // Extract referral code from metadata
      let referralCode: string | undefined

      if (payload.type === "subscription.created") {
        referralCode = payload.data.subscription.metadata?.referral_code
      } else if (payload.type === "order.created") {
        referralCode = payload.data.order.metadata?.referral_code
      }

      // Only forward to Refgrow if there's a referral code
      if (referralCode) {
        console.log(`Forwarding ${payload.type} to Refgrow with referral_code:`, referralCode)

        try {
          const refgrowResponse = await fetch(refgrowWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })

          if (!refgrowResponse.ok) {
            const errorText = await refgrowResponse.text()
            console.error("Refgrow webhook failed:", {
              status: refgrowResponse.status,
              body: errorText,
            })
          } else {
            console.log("Successfully forwarded to Refgrow")
          }
        } catch (error) {
          console.error("Error forwarding to Refgrow:", error)
        }
      } else {
        console.log(`No referral_code found in ${payload.type}, skipping Refgrow notification`)
      }
    }

    // Always return 200 to Polar to acknowledge receipt
    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook processing error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
