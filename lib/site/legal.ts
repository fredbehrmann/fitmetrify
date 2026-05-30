export const LEGAL = {
  brandName: "FitMetrify",
  contactEmail: "contato@fitmetrify.com.br",
  privacyEmail: "contato@fitmetrify.com.br",
  policyVersion: "1.0",
  policyEffectiveDate: "2026-05-29",
} as const;

export function getContactDestinationEmail(): string {
  return process.env.CONTACT_DESTINATION_EMAIL ?? LEGAL.contactEmail;
}
