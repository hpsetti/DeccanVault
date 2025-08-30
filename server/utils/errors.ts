// Contains the base function for the errors

import { createError } from "h3";

/**
 * DeccanVault error factory
 * Wraps Nitro's createError with custom codes
 */

export const dvError = (
  message: string,
  code = "InternalError",
  statusCode = 500
) => {
  return createError({
    statusCode,
    statusMessage: message,
    data: {
      code,
    },
  });
};
