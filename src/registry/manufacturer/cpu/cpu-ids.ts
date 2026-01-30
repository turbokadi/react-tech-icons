import type { ManufacturerId } from '../manufacturer-ids'

export const CPU_MANUFACTURERS = [
  'AMD',
  'Intel',
  'ARM',
  'Qualcomm',
  'MediaTek',
  'Apple',
  'Samsung',
  'NXP',
] as const satisfies readonly ManufacturerId[]

export type CpuManufacturerId = (typeof CPU_MANUFACTURERS)[number]
