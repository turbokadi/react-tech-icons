import type { CpuManufacturerId } from './cpu-ids'

export const CPU_ICON_LOADERS: Record<
  CpuManufacturerId,
  () => Promise<{ default?: React.ComponentType<any> } | any>
> = {
  AMD: () => import('../../../icons/manufacturer/AMD'),
  Intel: () => import('../../../icons/manufacturer/Intel'),
  ARM: () => import('../../../icons/manufacturer/ARM'),
  Qualcomm: () => import('../../../icons/manufacturer/Qualcomm'),
  MediaTek: () => import('../../../icons/manufacturer/MediaTek'),
  Apple: () => import('../../../icons/manufacturer/Apple'),
  Samsung: () => import('../../../icons/manufacturer/Samsung'),
  NXP: () => import('../../../icons/manufacturer/NXP'),
}
