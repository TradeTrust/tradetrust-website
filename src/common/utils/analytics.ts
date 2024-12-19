export const validateGtag = function () {
  const isInit = typeof gtag === "function";
  if (!isInit) console.warn("gtag is not initialised");
  return isInit;
};
export interface GAEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

export const validatePageViewEvent = function (gaEvent: GAEvent) {
  const action = gaEvent.action;
  if (!action) console.error("Action is required");
  if (action && typeof action !== "string") console.error("Action must be a string");
};
export const gaPageView = function (gaEvent: GAEvent, gaId: string) {
  if (!validateGtag()) return;
  validatePageViewEvent(gaEvent);
  const action: string = gaEvent.action;
  gtag("event", action, {
    send_to: gaId,
  });
};
export const validateGaEvent = function (gaEvent: GAEvent) {
  const action = gaEvent.action,
    category = gaEvent.category,
    label = gaEvent.label,
    value = gaEvent.value;
  if (!category) console.error("Category is required");
  if (!action) console.error("Action is required");
  if (label && typeof label !== "string") console.error("Label must be a string");
  if (value && typeof value !== "number") console.error("Value must be a number");
};
export const gaEvent = function (eventData: GAEvent) {
  if (!validateGtag()) return;
  validateGaEvent(eventData);
  const action = eventData.action,
    category = eventData.category,
    label = eventData.label,
    value = eventData.value;
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
