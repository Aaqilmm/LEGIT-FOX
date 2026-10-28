/**
 * Generates demo-stable IDs for mock data
 */

export function generateCaseId(prefix: string = 'CASE'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
}

export function generateInstitutionId(): string {
  const random = Math.random().toString(36).substring(2, 10);
  return `INST-${random}`.toUpperCase();
}

export function generateRequestId(): string {
  const random = Math.random().toString(36).substring(2, 10);
  return `REQ-${random}`.toUpperCase();
}
