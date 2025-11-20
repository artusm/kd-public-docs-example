---
layout: doc
aside: false
---

# API reference

<script setup>
import openapiUrl from './public/openapi.yaml?url'
</script>

Our OpenAPI spec is embedded below. You can filter operations, try sample payloads, and download the spec for your tooling.

- **Base URL**: `https://api.kaspi.kz/delivery`
- **Auth**: `x-api-key` header
- **Sandbox**: `https://sandbox.kaspi.kz/delivery`

<ClientOnly>
  <OASpec :spec-url="openapiUrl" :hide-branding="true" />
</ClientOnly>

### Tips

- Use the sandbox server to experiment without touching production.
- The playground supports sending requests directly from the docs—add your sandbox API key to try it.
- Download the spec from the toolbar to plug into Postman or your internal gateway.
