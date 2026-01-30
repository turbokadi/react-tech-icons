# React Tech Icons

A tree-shakable React icon library for **technology, hardware, and vendor logos**  
(CPU, OEM, network, and more).

Icons are optimized SVGs, exposed as React components, with **lazy loading support** to avoid bundle bloat — even with hundreds of icons.

---

## Features

- ⚡ Tree-shakable & lazy-loadable icons
- 🧩 Organized by domain (CPU, OEM, …)
- 📐 Consistent visual sizing across very different logo ratios
- 🛠 Fully typed (TypeScript & JavaScript friendly)
- 🚫 No runtime dependencies beyond React

---

## Installation

```bash
pnpm add @turbokadi/react-tech-icons
# or
npm install @turbokadi/react-tech-icons
```

## Usage

### Direct icon import

```react
import { Intel } from '@turbokadi/react-tech-icons/icons/manufacturer'

<Intel size={48} />
```

### Dynamic resolution (example: OEM from vendor string)

```react
<OemManufacturerLogo vendorName="Dell Inc." size={48} />
```

Icons are loaded on demand and split into separate chunks.

## Trademarks

All product names, logos, and brands are property of their respective owners.
All company, product and service names used in this library are for identification purposes only.
Use of these names, logos, and brands does not imply endorsement.
