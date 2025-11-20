# Webhooks & callbacks

Kaspi Delivery sends webhooks for every status change so your systems can update customers in real time.

## Configure

1. Set your webhook URL in the partner console (HTTPS recommended).
2. Copy the webhook signing secret and store it securely.
3. Allow inbound requests from Kaspi IPs or leave the endpoint open with signature verification.

## Events you will receive

- `delivery.created`
- `delivery.accepted`
- `delivery.in_transit`
- `delivery.out_for_delivery`
- `delivery.delivered`
- `delivery.cancelled`

## Payload shape

```json
{
  "eventId": "wh_3e0a",
  "type": "delivery.delivered",
  "attempt": 1,
  "data": {
    "deliveryId": "dlv_01hfz18tnb7tqw",
    "externalOrderId": "order-2024-0191",
    "status": "delivered",
    "timestamp": "2024-06-12T18:32:14Z"
  }
}
```

Headers:

- `X-Kaspi-Signature`: HMAC SHA256 using your webhook secret over the raw request body.
- `X-Kaspi-Timestamp`: Unix timestamp used in the signature.

## Verify signatures

```js
import crypto from "node:crypto";

export function isKaspiSignatureValid({ body, signature, timestamp, secret }) {
  const payload = `${timestamp}.${body}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expected, "hex")
  );
}
```

Reject if the timestamp is older than 5 minutes or the signature does not match.

## Retries

- Retries start at 1 minute, then exponential backoff up to 24 hours.
- Respond with any `2xx` status to stop retries.
- Include tracing headers or request ids in your logs to debug failures.

If you need to re-send a webhook for a delivery, contact the Kaspi support team with the `eventId` and `deliveryId`.
