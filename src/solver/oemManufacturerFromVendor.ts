import type { OemManufacturerId } from '../registry/manufacturer/oem/oem-ids'
import { OEM_RULES } from '../registry/manufacturer/oem/oem-rules'

export function solveOemManufacturerFromVendor(vendor?: string | null): OemManufacturerId | null {
  if (!vendor) return null

  const text = vendor.toLowerCase()

  for (const [id, tokens] of OEM_RULES) {
    for (const token of tokens) {
      if (text.includes(token)) {
        return id
      }
    }
  }

  return null
}
