---
title: Kaspi Delivery platform
sidebar: false
outline: false
layout: home
---

<script setup>
import { ref, onMounted } from 'vue'
import animationData from './public/lottie/delivery-service.json'

const Vue3Lottie = ref(null)

onMounted(async () => {
  const module = await import('vue3-lottie')
  Vue3Lottie.value = module.Vue3Lottie
})
</script>

<div class="k-hero k-card">
  <div class="k-hero-grid">
    <div class="k-hero-left" style="display: grid; gap: 1rem;">
      <div class="k-badge">
        <span>Kaspi delivery network</span>
        <span>Built for partners</span>
      </div>
      <h1 style="font-size: 2.8rem; line-height: 1.05; margin: 0;">A single API to move every order in Kazakhstan</h1>
      <p style="font-size: 1.12rem; color: var(--vp-c-text-2); margin: 0;">
        Hand off fulfillment to Kaspi, get transparent pricing at checkout, and keep customers in the loop with live tracking and reliable webhooks.
      </p>
      <div style="display: flex; gap: 0.85rem; flex-wrap: wrap;">
        <a class="VPButton brand" href="/getting-started">Start with the API</a>
        <a class="VPButton alt" href="/api-reference">Open API reference</a>
        <a class="VPButton alt" href="/welcome">Read the welcome page</a>
      </div>
      <div class="k-pill-row">
        <span class="k-pill">Same-day ready</span>
        <span class="k-pill">Courier, pickup point, locker</span>
        <span class="k-pill">Replay-safe webhooks</span>
      </div>
    </div>
    <div class="k-hero-right">
      <ClientOnly height="300px" width="300px">
        <component v-if="Vue3Lottie" :is="Vue3Lottie" :animationData="animationData" :height="300" :width="300" />
      </ClientOnly>
      <div class="k-metrics">
        <div class="k-metric-card">
          <div style="font-size: 1rem; color: var(--vp-c-text-3);">API uptime</div>
          <div style="font-size: 1.9rem; font-weight: 700;">99.95%</div>
          <div class="k-highlight" style="font-size: 0.95rem;">Monitored 24/7</div>
        </div>
        <div class="k-metric-card">
          <div style="font-size: 1rem; color: var(--vp-c-text-3);">Order → pickup</div>
          <div style="font-size: 1.9rem; font-weight: 700;">4 mins</div>
          <div style="color: var(--vp-c-text-3); font-size: 0.95rem;">Optimized dispatch</div>
        </div>
        <div class="k-metric-card">
          <div style="font-size: 1rem; color: var(--vp-c-text-3);">Avg delivery SLA*</div>
          <div style="font-size: 1.9rem; font-weight: 700;">12h</div>
          <div style="color: var(--vp-c-text-3); font-size: 0.95rem;">Same-city routes</div>
        </div>
      </div>
      <p style="margin: 0; color: var(--vp-c-text-3); font-size: 0.9rem;">*Peak-aware routing with live courier capacity.</p>
    </div>
  </div>
</div>

<div class="k-section">
  <div class="k-section-title">
    <h2>Designed for modern commerce teams</h2>
    <p class="k-section-subtitle">Everything you need to quote, create, track, and notify &mdash; all via API.</p>
  </div>
  <div class="k-grid">
    <div class="k-card">
      <h3>Nationwide coverage</h3>
      <p>Courier, locker, and pickup points across Kazakhstan with smart handoff to the closest node.</p>
    </div>
    <div class="k-card">
      <h3>Transparent pricing</h3>
      <p>Quotes per city and weight band so you can show costs at checkout without manual lookups.</p>
    </div>
    <div class="k-card">
      <h3>Status you can trust</h3>
      <p>Webhooks for created, accepted, picked up, out for delivery, delivered, and cancelled events.</p>
    </div>
    <div class="k-card">
      <h3>Developer-grade reliability</h3>
      <p>Idempotent writes, replay-safe webhooks, and a sandbox that mirrors production behavior.</p>
    </div>
  </div>
</div>

<div class="k-section">
  <div class="k-section-title">
    <h2>How it works</h2>
    <p class="k-section-subtitle">Four simple steps to move your first parcel.</p>
  </div>
  <div class="k-steps">
    <div class="k-step">
      <div class="k-badge" style="margin-bottom: 0.6rem;">Step 1</div>
      <h3>Create your API key</h3>
      <p>Generate a sandbox key in the partner console. Add it as <code>x-api-key</code> on every request.</p>
    </div>
    <div class="k-step">
      <div class="k-badge" style="margin-bottom: 0.6rem;">Step 2</div>
      <h3>Create the delivery</h3>
      <p>Send <code>POST /v1/deliveries</code> with pickup, drop-off, and parcel meta. Track via <code>deliveryId</code>.</p>
    </div>
    <div class="k-step">
      <div class="k-badge" style="margin-bottom: 0.6rem;">Step 3</div>
      <h3>Subscribe to webhooks</h3>
      <p>Receive milestones with signature headers. Confirm with 2xx to stop retries.</p>
    </div>
    <div class="k-step">
      <div class="k-badge" style="margin-bottom: 0.6rem;">Step 4</div>
      <h3>Go live</h3>
      <p>Swap the base URL to <code>https://api.kaspi.kz/delivery</code>, rotate keys, and keep idempotency keys consistent.</p>
    </div>
  </div>
</div>

<div class="k-section">
  <div class="k-section-title">
    <h2>Developer kit</h2>
    <p class="k-section-subtitle">Prebuilt resources to move fast and avoid surprises.</p>
  </div>
  <div class="k-grid">
    <div class="k-card k-gradient-card">
      <h3>OpenAPI explorer</h3>
      <p>Interactive reference with a live playground. Download the YAML to import into your gateway.</p>
      <a class="VPButton alt" href="/api-reference">Open the explorer</a>
    </div>
    <div class="k-card">
      <h3>Code samples</h3>
      <p>Copy-paste snippets for curl, Node.js, and Python to create deliveries and validate signatures.</p>
      <a class="VPButton alt" href="/api-examples">See examples</a>
    </div>
    <div class="k-card">
      <h3>Guided setup</h3>
      <p>Follow the checklist, authentication guide, and webhook playbook to reach production safely.</p>
      <div class="k-pill-row">
        <a class="k-pill" href="/welcome">Welcome</a>
        <a class="k-pill" href="/guides/checklist">Checklist</a>
        <a class="k-pill" href="/guides/webhooks">Webhooks</a>
      </div>
    </div>
  </div>
</div>

<div class="k-cta-banner">
  <div style="display: grid; gap: 0.35rem;">
    <strong style="font-size: 1.2rem;">Ready to ship your first delivery?</strong>
    <span style="color: var(--vp-c-text-2);">Spin up in the sandbox, then swap to production when you are confident in payloads and webhooks.</span>
  </div>
  <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
    <a class="VPButton brand" href="/getting-started">Start building</a>
    <a class="VPButton alt" href="/api-reference">API reference</a>
  </div>
</div>
