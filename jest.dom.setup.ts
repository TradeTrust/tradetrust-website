// this will allow us to extend expect which testing-library expects
// https://github.com/enzymejs/enzyme-matchers/issues/86#issuecomment-312489052
import "@testing-library/jest-dom";

// Polyfills/mocks moved from jest.setup.ts to ensure JSDOM environment is fully initialized

// Mock for window.alert
if (typeof window !== "undefined") {
  window.alert = jest.fn();
}

// Mock for window.fetch
if (typeof window !== "undefined") {
  window.fetch = jest.fn();
}

// Polyfill for document.createRange
// (https://stackoverflow.com/questions/42213522/mocking-document-createrange-for-jest)
// This needs to be here because jest.setup.ts runs before JSDOM fully initializes `document`.
if (typeof document !== "undefined" && typeof document.createRange !== "function") {
  const createRangeFunc = () =>
    ({
      setStart: jest.fn(),
      setEnd: jest.fn(),
      commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document, // `document` should be correctly defined here by JSDOM
      },
      // Adding minimal implementations for common Range methods to make the mock more robust
      getBoundingClientRect: jest.fn(() => ({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        toJSON: jest.fn(),
      })),
      getClientRects: jest.fn(() => []),
    } as unknown as Range);
  document.createRange = createRangeFunc;
}
