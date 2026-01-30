import type { CpuManufacturerId } from '../registry/manufacturer/cpu/cpu-ids'
import { CPU_RULES } from '../registry/manufacturer/cpu/cpu-rules'

export function solveCpuManufacturerFromProduct(
  productName?: string | null
): CpuManufacturerId | null {
  if (!productName) return null

  const text = productName.toLowerCase()

  for (const [id, tokens] of CPU_RULES) {
    for (const token of tokens) {
      if (text.includes(token)) {
        return id
      }
    }
  }

  return null
}
