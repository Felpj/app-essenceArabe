import { UpsellEvent, UpsellAction, UpsellContext } from "@/types/upsell";

/**
 * Tracking de eventos de upsell (localStorage)
 */

const STORAGE_KEY = "EA_UPSELL_EVENTS_V1";
const SESSION_ID_KEY = "EA_SESSION_ID";

function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

function getEvents(): UpsellEvent[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveEvents(events: UpsellEvent[]) {
  // Mantém apenas os últimos 100 eventos
  const limited = events.slice(-100);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
}

export function trackUpsellEvent(
  offerId: string,
  action: UpsellAction,
  context: UpsellContext,
  cartValue?: number,
  orderCode?: string
) {
  const event: UpsellEvent = {
    ts: new Date().toISOString(),
    sessionId: getSessionId(),
    offerId,
    action,
    context,
    cartValue,
    orderCode,
  };

  const events = getEvents();
  events.push(event);
  saveEvents(events);
}

export function getUpsellMetrics() {
  const events = getEvents();
  const impressions = events.filter((e) => e.action === "IMPRESSION");
  const accepts = events.filter((e) => e.action === "ACCEPT");

  const metrics: Record<string, { impressions: number; accepts: number; rate: number }> = {};

  impressions.forEach((imp) => {
    if (!metrics[imp.offerId]) {
      metrics[imp.offerId] = { impressions: 0, accepts: 0, rate: 0 };
    }
    metrics[imp.offerId].impressions++;
  });

  accepts.forEach((acc) => {
    if (!metrics[acc.offerId]) {
      metrics[acc.offerId] = { impressions: 0, accepts: 0, rate: 0 };
    }
    metrics[acc.offerId].accepts++;
  });

  // Calcula taxa de aceitação
  Object.keys(metrics).forEach((offerId) => {
    const m = metrics[offerId];
    m.rate = m.impressions > 0 ? m.accepts / m.impressions : 0;
  });

  return metrics;
}
