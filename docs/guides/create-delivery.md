# Create a delivery

This guide walks through the full flow: quote, create, poll, and cancel a delivery.

Use the sandbox base URL while testing: `https://sandbox.kaspi.kz/delivery`.

## 1) Create a delivery

```bash
curl -X POST https://sandbox.kaspi.kz/delivery/v1/deliveries \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Idempotency-Key: order-2024-0191" \
  -H "Content-Type: application/json" \
  -d '{
    "externalOrderId": "order-2024-0191",
    "pickup": {
      "address": "21 Zhibek Zholy, Almaty",
      "contact": {
        "name": "Kaspi Warehouse",
        "phone": "+7 727 111 0000"
      }
    },
    "dropoff": {
      "address": "17 Abylay Khan Ave, Almaty",
      "contact": {
        "name": "Dana K.",
        "phone": "+7 701 111 1111"
      },
      "notes": "Entrance B, floor 6"
    },
    "parcel": {
      "description": "Electronics, insured",
      "weightGrams": 1200,
      "valueKzt": 85000
    }
  }'
```

**Response**

```json
{
  "deliveryId": "dlv_01hfz18tnb7tqw",
  "status": "created",
  "trackingUrl": "https://track.kaspi.kz/dlv_01hfz18tnb7tqw",
  "eta": {
    "pickupBy": "2024-06-12T08:20:54Z",
    "deliveryBy": "2024-06-12T18:20:54Z"
  }
}
```

## 2) Track status

Poll when building or rely on webhooks in production.

```bash
curl -X GET https://sandbox.kaspi.kz/delivery/v1/deliveries/dlv_01hfz18tnb7tqw \
  -H "x-api-key: YOUR_API_KEY"
```

Possible statuses: `created`, `accepted`, `in_transit`, `out_for_delivery`, `delivered`, `cancelled`.

## 3) React to webhooks

Example payload:

```json
{
  "eventId": "wh_3e0a",
  "type": "delivery.out_for_delivery",
  "attempt": 2,
  "data": {
    "deliveryId": "dlv_01hfz18tnb7tqw",
    "externalOrderId": "order-2024-0191",
    "status": "out_for_delivery",
    "timestamp": "2024-06-12T11:05:22Z"
  }
}
```

Respond with a `2xx` within 5 seconds to stop retries. Retries use exponential backoff for up to 24 hours.

## 4) Cancel if needed

You can cancel before pickup completes.

```bash
curl -X POST https://sandbox.kaspi.kz/delivery/v1/deliveries/dlv_01hfz18tnb7tqw/cancel \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Idempotency-Key: order-2024-0191-cancel" \
  -d '{"reason": "Customer changed address"}'
```

Response codes:

- `200 OK`: Cancel accepted.
- `409 Conflict`: Delivery already in transit.

Next, wire up signatures and retries in [Webhooks](/guides/webhooks), then explore every endpoint in the [API reference](/api-reference).
