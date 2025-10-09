/**
 * Utility functions for validating attachment data
 */

/**
 * Validates if a string is valid base64 format
 * @param str - The string to validate
 * @returns boolean indicating if the string is valid base64
 */
const isValidBase64 = (str: string): boolean => {
  try {
    // Check if string contains only valid base64 characters
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(str)) {
      return false;
    }

    // Try to decode and re-encode to verify validity
    const decoded = atob(str);
    const reencoded = btoa(decoded);
    return reencoded === str;
  } catch {
    return false;
  }
};

/**
 * Validates attachment data based on base64 format and file type-specific validation
 * @param str - The base64 encoded attachment data
 * @param mimeType - Optional MIME type for file-specific validation
 * @returns boolean indicating if the attachment data is valid
 */
export const isValidAttachmentData = (str: string, mimeType?: string): boolean => {
  try {
    // First check if it's valid base64
    if (!isValidBase64(str)) {
      return false;
    }

    // For PDF files, validate PDF structure
    if (mimeType === "application/pdf") {
      try {
        const binaryString = atob(str);

        // Check for PDF header (should start with %PDF-)
        if (!binaryString.startsWith("%PDF-")) {
          return false;
        }

        // Check minimum PDF length (a valid PDF should be at least a few hundred bytes)
        if (binaryString.length < 100) {
          return false;
        }

        // Check for some basic PDF structure markers
        const hasXref = binaryString.includes("xref") || binaryString.includes("/Root");
        const hasTrailer = binaryString.includes("trailer") || binaryString.includes("startxref");

        if (!hasXref && !hasTrailer) {
          return false;
        }

        return true;
      } catch (error) {
        console.warn("PDF validation failed:", error);
        return false;
      }
    }

    // For non-PDF files, just validate base64 format
    return true;
  } catch {
    return false;
  }
};
