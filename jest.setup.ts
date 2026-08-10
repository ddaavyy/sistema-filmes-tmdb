import { TextDecoder, TextEncoder } from "node:util";

// jsdom doesn't inherit Node globals; react-router reads TextEncoder at module load.
global.TextEncoder ??= TextEncoder;
// @ts-expect-error - Node's TextDecoder type is slightly stricter than lib.dom's
global.TextDecoder ??= TextDecoder;
