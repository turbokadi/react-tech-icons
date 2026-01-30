import type { ManufacturerId } from './manufacturer-ids'

export function loadManufacturerIcon(id: ManufacturerId) {
  return import(`../icons/manufacturer/${id}.tsx`).then(m => ({
    default: m[id as keyof typeof m],
  }))
}
