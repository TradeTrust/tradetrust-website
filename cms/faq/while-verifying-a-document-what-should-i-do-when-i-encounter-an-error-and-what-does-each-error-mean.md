---
title: While verifying a document, what should I do when I encounter an error,
  and what does each error mean?
date: 2023-08-07T08:58:44.716Z
type: Product
---
There are mainly three types of errors that can occur when verifying a document:

1. **Document not issued:** TradeTrust checks that the document has been issued and that its issuance status is in good standing. This error occurs if the issuer revokes the document or if the document has not been issued.
2. **Document issuer identity is invalid:** TradeTrust validates and returns the identity of the issuer. This error occurs if the document was issued by an invalid user.
3. **Document has been tampered with:** TradeTrust ensures that the content of the document remains unchanged since its creation, except for data removed using the built-in obfuscation mechanism. This error occurs if the document's content has been modified.

If you encounter any of these errors, please contact the document issuer for assistance.