Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

import { ArrayBuffer, TextDecoder, TextEncoder, Uint8Array } from "util";

if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;
if (!global.ArrayBuffer) global.ArrayBuffer = ArrayBuffer;
if (!global.Uint8Array) global.Uint8Array = Uint8Array;