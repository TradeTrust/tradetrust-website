---
title: The role of blockchain and Ethereum in TradeTrust
date: 2020-01-02T16:00:00.000Z
---

The reason that a blockchain is used in TradeTrust is to eliminate the problem of "whose database should we use", especially in situations of multipartite sovereign nation involvement or even competitive industry giants. The responsibilities behind the operation and custody of this database includes maintaining ownership records of title document and ensuring the correctness of ownership transitions, providing the necessary infrastructure that all parties can access, and so on. One of the key design principles of TradeTrust is that no central authority should be managing these transaction records. Instead of solving the no-win scenario of agreeing on the party who should be entrusted with these responsibilities, we have shifted this responsibility to the neutral and impartial consensus mechanism that is innate to blockchains.

Since blockchains are capable of providing immutable records of transactions and the current state, they can be used to provide a rail for keeping records for Electronic Transferable Records (ETRs).

TradeTrust requires the underlying technology to support the 2 categories of trade documents:

1. **Transferable documents:** Trade documents that entitle the holder to claim the performance of an obligation or ownership (e.g. bills of lading, bills of exchange, etc.) and the selected blockchain needs to be able to track and transfer ownership of the trade document.
2. **Normal documents/Verifiable documents:** Other non-transferable trade documents that do not confer ownership (e.g. invoices, packing list, certificate of origin, etc.). These trade documents can be verified for its authenticity, integrity and provenance.

The current implementation of TradeTrust is using the Ethereum blockchain whereby the ERC-721 provides a widely-used smart contract API used on non-fungible tokens to allow transfer of ownership whilst providing assurance of integrity, singularity and control.
