# Code samples

Use these snippets to connect quickly. Replace `YOUR_API_KEY` with your sandbox or production key.

## Create a delivery

```bash
curl -X POST https://sandbox.kaspi.kz/delivery/v1/deliveries \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "externalOrderId": "order-1290",
    "pickup": { "address": "12 Abai Ave, Astana", "contact": { "name": "Kaspi Hub", "phone": "+7 702 000 0000" } },
    "dropoff": { "address": "9 Mangilik El, Astana", "contact": { "name": "Dinara T.", "phone": "+7 701 999 9999" } },
    "parcel": { "description": "Accessories", "weightGrams": 550, "valueKzt": 12000 }
  }'
```

## Node.js

```js
import fetch from "node-fetch";

const baseUrl = "https://sandbox.kaspi.kz/delivery";
const apiKey = process.env.KASPI_API_KEY;

async function createDelivery() {
  const res = await fetch(`${baseUrl}/v1/deliveries`, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
      "Idempotency-Key": "order-1290",
    },
    body: JSON.stringify({
      externalOrderId: "order-1290",
      pickup: { address: "12 Abai Ave, Astana", contact: { name: "Kaspi Hub", phone: "+7 702 000 0000" } },
      dropoff: { address: "9 Mangilik El, Astana", contact: { name: "Dinara T.", phone: "+7 701 999 9999" } },
      parcel: { description: "Accessories", weightGrams: 550, valueKzt: 12000 },
    }),
  });

  if (!res.ok) throw new Error(`Kaspi responded ${res.status}`);
  return res.json();
}
```

## Python

```python
import os
import requests

BASE_URL = "https://sandbox.kaspi.kz/delivery"
API_KEY = os.environ["KASPI_API_KEY"]

resp = requests.get(
    f"{BASE_URL}/v1/deliveries/dlv_01hfz18tnb7tqw",
    headers={"x-api-key": API_KEY},
    timeout=10,
)

resp.raise_for_status()
print(resp.json())
```

## Verify webhook signatures (Node)

```js
import crypto from "node:crypto";

function verifyKaspiSignature({ rawBody, signature, timestamp, secret }) {
  const payload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
}
```

## Error handling

Retry with exponential backoff on:

- `429` Too Many Requests
- `5xx` responses
- Network errors

Do not retry POST/DELETE requests without an `Idempotency-Key`.

## Java + DTO generation

Generate Java DTOs and a lightweight client from the spec:

```bash
npx @openapitools/openapi-generator-cli generate \
  -i docs/public/openapi.yaml \
  -g java \
  -o ./generated/kaspi-java-client \
  --additional-properties=library=webclient,hideGenerationTimestamp=true
```

Example usage (WebClient):

```java
import com.kaspi.delivery.ApiClient;
import com.kaspi.delivery.api.DeliveriesApi;
import com.kaspi.delivery.model.DeliveryRequest;
import com.kaspi.delivery.model.Location;
import com.kaspi.delivery.model.Contact;
import com.kaspi.delivery.model.Parcel;

ApiClient client = new ApiClient()
    .setBasePath("https://sandbox.kaspi.kz/delivery")
    .addDefaultHeader("x-api-key", System.getenv("KASPI_API_KEY"));

DeliveriesApi deliveries = new DeliveriesApi(client);

DeliveryRequest body = new DeliveryRequest()
    .externalOrderId("order-1290")
    .pickup(new Location()
        .address("12 Abai Ave, Astana")
        .contact(new Contact().name("Kaspi Hub").phone("+7 702 000 0000")))
    .dropoff(new Location()
        .address("9 Mangilik El, Astana")
        .contact(new Contact().name("Dinara T.").phone("+7 701 999 9999")))
    .parcel(new Parcel()
        .description("Accessories")
        .weightGrams(550)
        .valueKzt(12000));

var response = deliveries.createDelivery(body)
    .addHeader("Idempotency-Key", "order-1290")
    .execute();

System.out.println(response.getBody().getDeliveryId());
```
