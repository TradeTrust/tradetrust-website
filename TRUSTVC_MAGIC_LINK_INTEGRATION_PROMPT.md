# Magic.link in the “Connect to Blockchain” Modal — Prompt for trustvc-website

Use this document as the **implementation brief** when porting TradeTrust-style wallet connection (with **Magic.link**) into **trustvc-website**. It is based on a read-through of **tradetrust-website** (this repo).

---

## Goal (acceptance criteria)

1. **Dedicated connection modal** for linking a wallet when the app determines the user must interact with the chain (same *idea* as TradeTrust: transferable records, asset actions, or other flows that need a signer—not only a read-only RPC).
2. **Magic.link** as the wallet option (project may start **Magic-only** and skip MetaMask, or mirror TradeTrust’s **two-tab** modal—see “Scope variants”).
3. **Separate Magic app / API key** for trustvc-website: create a new app in [Magic dashboard](https://dashboard.magic.link) and use its **publishable** key in env (do not reuse tradetrust-website’s key unless product/security agrees).
4. After connect, downstream flows use **`ethers` `Web3Provider` → `getSigner()`** (or equivalent for your ethers major version).
5. User can **disconnect** and fall back to read-only behaviour where applicable.
6. Modal **does not** appear for purely off-chain / non–blockchain-dependent documents; only when your app’s “needs blockchain connection” condition is true.

---

## How tradetrust-website actually works (reference)

### 1. Environment

- Webpack exposes **`MAGIC_API_KEY`** (and optional **`MAGIC_API_KEY_FALLBACK`**) via `src/config/index.js`.
- **trustvc-website** will typically use **`VITE_MAGIC_API_KEY`** (or your bundler’s equivalent); the name differs, the key type is the same (publishable).

### 2. Magic lifecycle — `src/common/contexts/MagicContext.tsx`

- Magic is constructed only when **`process.env.MAGIC_API_KEY`** is set **and** a **`selectedNetwork`** exists: `{ chainId, rpcUrl }`.
- When **default chain** or **`changeMagicNetwork(chainId)`** runs, it resolves RPC via `getChainInfo(chainId)` and sets `selectedNetwork`.
- A **`useEffect`** depends on `selectedNetwork` and runs:

  `new Magic(MAGIC_API_KEY, { network: selectedNetwork, useStorageCache: true })`

  So: **changing chain recreates the Magic instance** (TradeTrust does not hot-swap networks inside one Magic instance).

- **`magic.user.isLoggedIn()`** on mount restores session; **`magic.user.onUserLoggedOut`** clears local logged-in state.
- **`logoutMagicLink`** → `magic.user.logout()`.
- **`loginMagicLink(email)`** wraps `magic.auth.loginWithMagicLink({ email })` — used in **demo** flows; the **main “Connect to MagicLink” button does not use this** (see below).

### 3. Provider + signer — `src/common/contexts/provider.tsx`

- **`upgradeToMagicSigner()`** (after `disconnectWallet(false)`) calls **`initialiseMagicSigner()`**:
  - If not logged in: **`await magic.wallet.connectWithUI()`** — Magic’s UI handles email / SSO**.
  - Sets **`SIGNER_TYPE.MAGIC`**.
- Magic RPC is wrapped: **`new ethers.providers.Web3Provider(magic.rpcProvider, "any")`**, then accounts/signer as for any Web3 provider.
- **`changeNetwork`** for Magic calls **`changeMagicNetwork`** from MagicContext so Magic is recreated for the new RPC/chain.
- **`disconnectWallet`**: if Magic, **`logoutMagicLink()`**; optionally reset to internal JSON-RPC provider.

**Important correction for implementers:** the primary creator/viewer connect path uses **`magic.wallet.connectWithUI()`**, not a custom email field wired to `loginWithMagicLink`, unless you deliberately build that UX (as in demo screens).

### 4. Connection modal UI — `src/components/ConnectToBlockchain/index.tsx`

- Modal title: **“Connect to Blockchain Wallet”**.
- **Header tabs**: MetaMask | MagicLink (`SIGNER_TYPE.METAMASK` / `SIGNER_TYPE.MAGIC`).
- **Body**:
  - MetaMask → `ConnectToMetamaskModelComponent`
  - Magic → **`ConnectToMagicLinkModelComponent`** (`src/components/ConnectToMagicLink/index.tsx`)
- **Footer**: Cancel; **Continue** — enabled when **`account`** is set, **`currentChainId`** is defined, and **`networkChangeLoading`** is false (same guard for both wallet types).
- **`showNetworkSection`**: when true (e.g. creator path), Magic tab can show **`NetworkContent`** after connect so user confirms network.

### 5. Magic tab body — `src/components/ConnectToMagicLink/index.tsx`

- **`ConnectToMagicLink`**: button **“Connect to MagicLink”** → **`upgradeToMagicSigner()`** (therefore **`connectWithUI`**).
- When connected: **`Connected`** component (address + copy); optional disconnect; optional network block.

### 6. When does TradeTrust show a modal related to blockchain?

| Trigger | Component | What opens |
|--------|-----------|------------|
| User selects **Transferable** doc in Creator | `FormSelection.tsx` | **`ConnectToBlockchainModel`** first, then `DocumentSetup` (DID + token registry) as `nextStep`. |
| User must **manage asset** (no access / connect) | `ActionSelectionForm.tsx` | **`ConnectToBlockchainModel`** via overlay. |
| Uploaded doc **needs network** but **has no `chainId`** in file | `CertificateDropZone.tsx` | **`NetworkSectionModel`** (pick network only—not the full wallet modal). |

So: **“needs blockchain”** is not one function everywhere. **Wallet modal** is used when the product requires an **account/signer** (create transferable flow, asset actions). **Network-only modal** is used when the document is missing chain context.

For **trustvc-website**, mirror this split unless product wants a **single** combined step (network + Magic).

---

## Suggested implementation plan for trustvc-website

### Step 0 — Decide scope variant

- **A (Magic-only):** One modal: connect with Magic only; no MetaMask tab (matches “no MetaMask required” tickets).
- **B (parity with TradeTrust):** Two tabs: MetaMask + Magic; reuse the same footer rules.

### Step 1 — Dependencies

```bash
npm install magic-sdk
```

Align **`ethers`** major with whatever **`@trustvc/trustvc`** expects in trustvc-website (v5 vs v6 APIs differ for `Web3Provider`).

### Step 2 — Environment

- Add to **`.env.example`**:

  `VITE_MAGIC_API_KEY=`  

  (or your framework’s prefix.)

- Document: obtain a **new** publishable key from Magic for the **trustvc-website** app/domain.

### Step 3 — `MagicProvider` (clone behaviour, not necessarily filenames)

Implement the same **state machine** as `MagicContext.tsx`:

- `selectedNetwork: { chainId, rpcUrl }` from your chain config.
- Instantiate **`new Magic(publishableKey, { network: selectedNetwork, useStorageCache: true })`** when `selectedNetwork` changes.
- `isLoggedIn`, `onUserLoggedOut`, `logout`, `changeNetwork(chainId)` (update `selectedNetwork` only — instance recreation is automatic).

### Step 4 — `ProviderContext` (or equivalent)

- Expose **`upgradeToMagicSigner`**: disconnect other wallet types if needed → **`magic.wallet.connectWithUI()`** → set provider to **`Web3Provider(magic.rpcProvider)`** → refresh account/signer.
- Keep a **read-only** default provider for verify-only paths.
- **`disconnectWallet`** for Magic: logout + revert to read-only provider.

### Step 5 — Connection modal component

- **Magic-only:** modal body = connect button + connected state + disconnect + optional network selector.
- **Two-tab:** copy header/body split from `ConnectToBlockchain/index.tsx`,Magic tab = your `ConnectToMagicLinkModelComponent` equivalent.
- Footer **Continue** disabled until **`account` && `chainId`** (and not loading), same as TradeTrust.

### Step 6 — When to open the modal (product logic)

Use **`@trustvc/trustvc`** helpers consistent with TradeTrust, for example:

- **`isTransferableRecord(document)`** / **`isDocumentRevokable(document)`** for “needs chain data”.
- Combine with **`getChainId(document)`** (or your shared util) to decide:

  - **Missing chain:** show **network picker** first (optional).
  - **Needs signer** (endorse/transfer/mint-like actions or your viewer rules): show **Connect wallet (Magic)** modal.

Do **not** show the wallet modal for documents that verify fine with JSON-RPC only **unless** the user starts an action that sends a transaction.

### Step 7 — Assets & CSP

- Add a **Magic** logo asset (TradeTrust uses `/static/images/magic_link.svg`).
- If you use strict CSP, allow Magic’s auth iframes/domains (TradeTrust e2e configs reference `auth.magic.link`).

---

## File map (tradetrust-website)

| File | Role |
|------|------|
| `src/common/contexts/MagicContext.tsx` | Magic instance, network, login/logout, session restore |
| `src/common/contexts/provider.tsx` | `upgradeToMagicSigner`, Web3Provider, MetaMask vs Magic |
| `src/components/ConnectToBlockchain/index.tsx` | Wallet modal shell + tabs + footer |
| `src/components/ConnectToMagicLink/index.tsx` | Magic connect button + modal body |
| `src/components/ConnectToBlockchain/Connected.tsx` | Connected address UI + reopen modal |
| `src/components/Creator/FormSelection/FormSelection.tsx` | Opens wallet modal for **Transferable** create |
| `src/components/AssetManagementPanel/.../ActionSelectionForm.tsx` | Opens wallet modal for asset actions |
| `src/components/CertificateDropZone/CertificateDropZone.tsx` | **Network** modal when `requiresNetwork && !chainId` |
| `src/config/index.js` | `MAGIC_API_KEY` wiring |
| `src/index.tsx` | `MagicProvider` wraps app with `defaultChainId` |

---

## Testing checklist (trustvc-website)

- [ ] Document with **no** chain/signing need → **no** wallet modal on verify.
- [ ] **Transferable** / action path → modal appears at the correct step.
- [ ] Magic **`connectWithUI`** completes → address shows → **Continue** enables → downstream flow receives signer/provider.
- [ ] **Cancel** closes without breaking state.
- [ ] **Disconnect** clears session and signer.
- [ ] Reload with active Magic session → still logged in (session restore).
- [ ] Switch document chain → Magic/network recreation still works (or your app forces reconnect—document chosen behaviour).
- [ ] New **publishable** key only in trustvc-website env; never commit secrets.

---

## Common pitfalls

- Assuming **`loginWithMagicLink({ email })`** is the main path — in TradeTrust it is **`connectWithUI()`** for the primary Connect button.
- Forgetting Magic **constructor needs `{ chainId, rpcUrl }`** aligned with the document or user-selected network.
- Showing the wallet modal on **every** verify; TradeTrust separates **network-only** vs **wallet** modals.
- **ethers v5 vs v6**: adjust `Web3Provider` import and API to match your app.

---

## Magic API key (new app for trustvc-website)

1. Open [https://dashboard.magic.link](https://dashboard.magic.link).
2. Create an application for **trustvc-website** (domain allowlist / redirect URIs as Magic requires).
3. Copy the **Publishable API Key** (`pk_test_…` / `pk_live_…`).
4. Set it in trustvc-website env (e.g. `VITE_MAGIC_API_KEY`).

Treat it like a public client key; still use **per-environment** keys (dev/staging/prod).
