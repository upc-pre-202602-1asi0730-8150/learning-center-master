/**
 * @summary Error raised when the requested participants exceed the available capacity of a sports center.
 * @author Roberto Gonzales Ayala
 */
export class CapacityExceededError extends Error {
  constructor(readonly availableCapacity: number) {
    super(`The participants exceed the available capacity (${availableCapacity}).`);
    this.name = 'CapacityExceededError';
  }
}
