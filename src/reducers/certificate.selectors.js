export function getCertificate(store) {
  return store.certificate.rawModified;
}

export function getVerifying(store) {
  return get(store, "certificate.verificationPending");
}

export function getVerificationStatus(store) {
  return store.certificate.verificationStatus;
}

export function getEmailSendingState(store) {
  return store.certificate.emailState;
}

export function getActiveTemplateTab(store) {
  return store.certificate.activeTemplateTab;
}

export function getTemplates(store) {
  return store.certificate.templates;
}
