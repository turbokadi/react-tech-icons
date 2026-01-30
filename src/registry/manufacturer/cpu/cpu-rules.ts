import { CpuManufacturerId } from './cpu-ids'

export const CPU_RULES: Array<[CpuManufacturerId, string[]]> = [
  ['Intel', ['intel']],
  ['AMD', ['amd', 'ryzen', 'epyc']],
  ['Apple', ['apple', 'm1', 'm2', 'm3']],
  ['Qualcomm', ['qualcomm', 'snapdragon']],
  ['MediaTek', ['mediatek', 'dimensity', 'helio']],
  ['Samsung', ['samsung', 'exynos']],
  ['ARM', ['arm', 'cortex']],
  ['NXP', ['nxp']],
]
