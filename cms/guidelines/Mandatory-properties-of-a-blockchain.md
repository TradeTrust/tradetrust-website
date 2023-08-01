---
title: Mandatory properties of a blockchain
date: 2020-01-04T16:00:00.000Z
---
One of the most frequently asked questions posted to the team is whether TradeTrust is able to use alternative blockchains in addition to the Ethereum blockchain. This article seeks to provide a set of guidelines on the properties and features that an alternative blockchain must have in order to align to the TradeTrust framework.

**Here is a list of mandatory properties:**

**1. Public**

The blockchain shall be safe, accessible, and auditable for all participants.
Selecting a public blockchain prevents fragmentation of the network by discouraging solution providers to use a private network which locks their end user into a small ecosystem and encourages interoperability of software from different solution providers to agree on document schema, valid state transition actions and best practices.

**2. Supports NFTs/Smart Contracts**

The selected blockchain shall minimally support arbitrary digital asset ownership structures, and ideally be support **Turing Complete Smart Contracts.**
In order to fulfil the requirement of asset ownership capability, it must be able to:

1. Define a unique digital asset
2. Singularly keep ownership records of instances of digital assets
3. Allow an owner to prove control over the digital asset

For additional flexibility, it would be ideal for the blockchain to support smart contracts that allow actors to define a valid set of state transitioning transactions, their preconditions and post-conditions. This is needed for programs like the DocumentStore, TokenRegistry or TitleEscrow to store information about the states of documents and ownership structure.
An example of how smart contracts are used:
In the case of ETR issuers such as shipping lines, they should be able to deploy smart contracts to maintain a single global record for the following purposes:

* Keeping records of the statuses of ETRs issued by the issuer
* Keeping records of the current owners of the different ETR
* Defining the function and preconditions for issuing a new ETR
* Defining the function and preconditions for transferring an ETR
* Other functions required by the users or the issuer of the ETR

Example of how preconditions are set for a transfer action:
An entity may only transfer its ownership of an ETR from itself to another entity only if the following pre-conditions are met:

* The ETR has been issued by the ETR issuer
* The Entity is currently in control
* The transaction has been signed by the entity proposing the transactions

**3. Accessibility of blockchain state**

TradeTrust requires the blockchain to satisfy the accessibility criteria below:

1. **availability:** any party can download and verify the current head state meaning it is censorship-resistant
2. **safety/validity:** must not have invalid state transition
3. **liveness:** any party can submit transactions to advance the head state

**4. Impartial Security Model**

The set of entities that are allowed to append blocks to the blockchain should be **large enough** such that the **possibility of bribery** or **colluding** among critical node operators is nearly impossible.
If collusion occurs, it shall be detectable by any participants in the system. The membership criteria for this set of entities must not exclude actors based on subjective factors (e.g political, geographic, social). This allows the security of the network to be objectively measured in terms of crypto-economics – i.e the cost of a successful attack on the network should be definitive. It also ensures that any interested actor should be able to join the validator set, such that no party should be able to veto or deny service to any other.
For private blockchains, the possibility of collusion or a buy-out scenario among the node players are higher due to the smaller number of players.

**5. Economically Secured**

The blockchain needs to **continue to operate** even if some nodes fail or act maliciously. That is, the cost of an attack should far outweigh any possible gains from a successful attack.
The cost of an attack on the blockchain could be used as a proxy to evaluate if such an economic opportunity could be present. One plausible attack scenario is the rent-to-pwn scenario, where smaller public, permissionless proof-of-work blockchains are attacked simply by mercenary actors that put up their computational power for sale. This eliminates the security of many ledgers that are secure in theory if they have the majority of all proof-of-work that exists in the universe, but falls apart if they are not.

**6. Open-sourced**

The blockchain shall be an **open-source software** (OSS) that is open for public review. This is important to ensure that participants have the chance to review the underlying code prior to partaking in any activities on the blockchain in the spirit of "Don't Trust, Verify". Necessarily, this implies that the protocol and consensus mechanisms are all public and easily verifiable as well.

The guidelines offer insights into what the TradeTrust framework and reference implementation look for in terms of its choice of blockchains. The properties of a blockchain must satisfy the requirements stipulated in the MLETR:

1. **Singularity:** The ETR document can be represented by an unique Document ID which cannot collide with another document and the association of the ID to a single `owner` property in a smart contract ensures that there is only one owner of the ETR at any point in time.
2. **Exclusive Control:** The implementation of the ETR smart contract can be implemented such that the listed owner of the ETR will have exclusive control over the ETR. This means that only the owner of the ETR can invoke the transfer function of the ETR and the signature of the transfer transaction is being checked to assert the constraints.
3. **Integrity:** Integrity of an ETR can be verified through an unique Document ID that is the hash of the content of the document. Any attempt to modify the contents of the document will result in the document hash to change thus giving recipients of the ETR, assurance as to the integrity of the document.