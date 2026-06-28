import { HTTPError } from "h3";

export default function dvError(
  message: string,
  code: string,
  statusCode: number = 500,
) {
  return new HTTPError(message, { statusCode, data: { code } });
}
