# Welcome

This page orients you to the Kaspi Delivery docs and how to get hands-on quickly.

## What you will find

- **Getting started** for a fast first delivery in the sandbox.
- **Authentication** to handle API keys and idempotency safely.
- **Create a delivery** for end-to-end payloads.
- **Webhooks** to wire status updates with signature verification.
- **API reference** powered by our OpenAPI spec and playground.

## Base URLs

- Sandbox: `https://sandbox.kaspi.kz/delivery`
- Production: `https://api.kaspi.kz/delivery`

Keep keys separate and rotate them regularly.

## Delivery statuses

```
created → accepted → in_transit → out_for_delivery → delivered
```

`cancelled` is returned if the delivery was voided before pickup.

## Webhooks you will receive

- `delivery.created`
- `delivery.accepted`
- `delivery.in_transit`
- `delivery.out_for_delivery`
- `delivery.delivered`
- `delivery.cancelled`

Respond with a `2xx` within 5 seconds to stop retries. Signature headers are documented in [Webhooks & callbacks](/guides/webhooks).

## Quick links

- [Getting started](/getting-started)
- [Authentication](/guides/authentication)
- [Checklist](/guides/checklist)
- [API reference](/api-reference)
- [Code samples](/api-examples)
