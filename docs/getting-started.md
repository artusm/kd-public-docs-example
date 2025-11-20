# Getting started

Welcome to the Kaspi Delivery API. This page walks you through the fastest way to create a delivery, monitor its status, and move from sandbox to production.

## Base URLs

- Sandbox: `https://sandbox.kaspi.kz/delivery`
- Production: `https://api.kaspi.kz/delivery`

All examples below use the sandbox base URL. Swap it for production when you are ready.

## Prerequisites

- A partner API key created in the Kaspi console. Send it in the `x-api-key` header.
- A server endpoint that can receive webhook events (HTTPS recommended).
- A unique idempotency key if you need to safely retry delivery creation requests.

## Create your first delivery

**Request**

```bash
curl -X POST https://sandbox.kaspi.kz/delivery/v1/deliveries \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Idempotency-Key: order-742" \
  -H "Content-Type: application/json" \
  -d '{
    "externalOrderId": "order-742",
    "pickup": {
      "address": "42 Dostyk Ave, Almaty",
      "contact": { "name": "Kaspi Pickup Hub", "phone": "+7 727 000 0000" }
    },
    "dropoff": {
      "address": "89 Satpayev St, Almaty",
      "contact": { "name": "Aigerim K.", "phone": "+7 701 000 0000" },
      "notes": "Call when outside"
    },
    "parcel": {
      "description": "Shoes, box",
      "weightGrams": 800,
      "valueKzt": 18000
    }
  }'
```

**Response (201)**

```json
{
  "deliveryId": "dlv_01hfz18tnb7tqw",
  "status": "created",
  "trackingUrl": "https://track.kaspi.kz/dlv_01hfz18tnb7tqw",
  "eta": { "pickupBy": "2024-06-11T10:10:54Z", "deliveryBy": "2024-06-11T18:10:54Z" }
}
```

## Observe status

Use `GET /v1/deliveries/{deliveryId}` to check the live status. Statuses follow this sequence:

```
created → accepted → in_transit → out_for_delivery → delivered
```

`cancelled` is returned if the delivery was voided before pickup.

## Subscribe to webhooks

Set your webhook URL in the partner console, then listen for events such as:

- `delivery.created`
- `delivery.accepted`
- `delivery.out_for_delivery`
- `delivery.delivered`
- `delivery.cancelled`

Each event includes the delivery id, external order id, status, and a retry counter. Respond with HTTP 2xx to stop retries.

## Move to production

1. Swap the base URL to `https://api.kaspi.kz/delivery`.
2. Rotate your API key and keep sandbox keys in a separate vault entry.
3. Ensure your webhook URL is reachable from the public internet and returns quickly (under 5 seconds).
4. Monitor idempotency keys—reusing a key returns the original delivery payload.

Next up: set up authentication details in [Authentication](/guides/authentication) and follow the end-to-end flow in [Create a delivery](/guides/create-delivery).
