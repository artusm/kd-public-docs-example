# Authentication

Kaspi Delivery uses an API key you generate in the partner console. Send it in the `x-api-key` header on every request.

## Headers to include

| Header | Required | Description |
| --- | --- | --- |
| `x-api-key` | Yes | Your API key (sandbox or production). |
| `Idempotency-Key` | Recommended on POST/DELETE | A unique string per request so retries do not create duplicate deliveries. |
| `Content-Type` | Yes on writes | `application/json` |

## Example

```bash
curl -X GET https://sandbox.kaspi.kz/delivery/v1/deliveries/dlv_01hfz18tnb7tqw \
  -H "x-api-key: YOUR_API_KEY"
```

### Idempotency keys

- Use a stable identifier such as your order id: `Idempotency-Key: order-742`.
- Reusing the same key returns the original response with `X-Idempotent-Replay: true`.
- Keys are stored for 24 hours in sandbox and production.

### Timeouts and retries

- Client timeout: 10 seconds suggested.
- Retry on network errors and HTTP 429/5xx with exponential backoff.
- Do not retry POST/DELETE without an idempotency key.

### Error responses

| Status | When it happens | How to fix |
| --- | --- | --- |
| 401 Unauthorized | Missing/invalid API key | Verify the key and environment. |
| 403 Forbidden | Key is disabled | Rotate credentials in the console. |
| 409 Conflict | Duplicate idempotency key with different payload | Reuse the same payload or generate a new key. |
| 429 Too Many Requests | Burst exceeded | Back off and retry with jitter. |

Move on to the [Create a delivery](/guides/create-delivery) guide for a full flow.
