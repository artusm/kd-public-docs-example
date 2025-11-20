# Integration checklist

Run through this checklist before pointing real orders at Kaspi Delivery.

## Credentials and security

- [ ] Sandbox API key created and stored securely.
- [ ] Production API key ready but not committed to source control.
- [ ] `x-api-key` header added to every request, including retries.
- [ ] Idempotency keys generated for create/cancel requests.

## Connectivity

- [ ] Outbound HTTPS to `sandbox.kaspi.kz` and `api.kaspi.kz` is allowed.
- [ ] Webhook receiver exposed on HTTPS and returns a 2xx in under 5 seconds.
- [ ] Logging in place for webhook signature validation and retries.

## Payloads

- [ ] Every delivery has a unique `externalOrderId`.
- [ ] Pickup and drop-off contacts include name and phone.
- [ ] Parcel weight, description, and value are set for insurance.
- [ ] Optional `notes` tested for couriers (e.g., building entry details).

## Observability

- [ ] Alerting on HTTP 4xx/5xx spikes from the Delivery API.
- [ ] Dashboard for delivery status transitions and cancellation reasons.
- [ ] Webhook retry counts monitored; dead-letter queue for failed events.

When all items are checked, move to [Create a delivery](/guides/create-delivery) to run a full flow.
