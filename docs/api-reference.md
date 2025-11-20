---
layout: doc
aside: false
---

# API reference

<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue'
import { useTheme, generateCodeSample } from 'vitepress-openapi/client'
import openapiUrl from './public/openapi.yaml?url'

onBeforeMount(() => {
   useTheme({
    codeSamples: {
      langs: [ ...useTheme().getCodeSamplesLangs(), 'java',],
      availableLanguages: [
        
        ...useTheme().getCodeSamplesAvailableLanguages(),
        { lang: 'java', label: 'Java (DTO generator)', highlighter: 'java' },
      ],
      defaultLang: 'java',
      generator: async (lang, request) => {
        if (lang === 'java') return generateJavaSample(request)
        return generateCodeSample(lang, request)
      },
    },
  })
})

onBeforeUnmount(() => {
  useTheme().reset()
})

function generateJavaSample(request) {
  const { url, headers = {}, body, query = {} } = request
  const queryString =
    query && Object.keys(query).length
      ? `?${new URLSearchParams(query).toString()}`
      : ''

  const idempotency = headers['Idempotency-Key'] || headers['idempotency-key']
  const apiKey = headers['x-api-key'] || headers['X-API-KEY'] || 'YOUR_API_KEY'
  const method = (request.method || 'POST').toUpperCase()
  const bodyJson =
    body && Object.keys(body).length
      ? JSON.stringify(body, null, 2).replace(/`/g, '\\`')
      : null

  return `// Generate DTOs:
// npx @openapitools/openapi-generator-cli generate \\
//   -i ./docs/public/openapi.yaml \\
//   -g java \\
//   -o ./generated/kaspi-java-client \\
//   --additional-properties=library=webclient,hideGenerationTimestamp=true

import com.kaspi.delivery.ApiClient;
import com.kaspi.delivery.api.DeliveriesApi;
import com.kaspi.delivery.model.DeliveryRequest;
import com.kaspi.delivery.model.Location;
import com.kaspi.delivery.model.Contact;
import com.kaspi.delivery.model.Parcel;
import org.springframework.http.HttpMethod;
import org.springframework.web.reactive.function.client.WebClient;

ApiClient client = new ApiClient()
  .setBasePath("https://sandbox.kaspi.kz/delivery")
  .addDefaultHeader("x-api-key", "${apiKey}");

DeliveriesApi deliveries = new DeliveriesApi(client);

// Use generated DTOs above or fall back to raw JSON with WebClient.
WebClient webClient = WebClient.builder()
  .baseUrl("https://sandbox.kaspi.kz/delivery")
  .defaultHeader("x-api-key", "${apiKey}")
  .build();

${bodyJson ? `String jsonBody = """\n${bodyJson}\n""";\n` : ''}
String response = webClient
  .method(HttpMethod.${method})
  .uri("${url}${queryString}")
  ${idempotency ? `.header("Idempotency-Key", "${idempotency}")\n  ` : ''}${bodyJson ? '.bodyValue(jsonBody)\n  ' : ''}.retrieve()
  .bodyToMono(String.class)
  .block();

System.out.println(response);`
}
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
