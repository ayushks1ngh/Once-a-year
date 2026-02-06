/**
 * Date-based access control for Valentine Week (Feb 7-14)
 */

/**
 * Check if current date is within allowed access window (Feb 7-14)
 * Uses user's local timezone
 */
export function isWithinValentineWeek(): boolean {
  const today = new Date();
  const month = today.getMonth() + 1; // getMonth() returns 0-11
  const date = today.getDate();

  // February 7 to February 14 (inclusive)
  const isFebruary = month === 2;
  const isInRange = date >= 7 && date <= 14;

  return isFebruary && isInRange;
}

/**
 * Check if admin override is enabled via URL param
 * Override: ?admin=true
 */
export function hasAdminOverride(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get("admin") === "true";
}

/**
 * Check if user has access to the app
 * Returns true if:
 * 1. Current date is within Feb 7-14, OR
 * 2. Admin override is active
 */
export function hasAccess(): boolean {
  return isWithinValentineWeek() || hasAdminOverride();
}
