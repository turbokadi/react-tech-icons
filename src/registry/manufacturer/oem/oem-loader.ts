import type { OemManufacturerId } from './oem-ids'

export const OEM_ICON_LOADERS: Record<
  OemManufacturerId,
  () => Promise<{ default?: React.ComponentType<any> } | any>
> = {
  Acer: async () => import('../../../icons/manufacturer/Acer'),
  Apple: async () => import('../../../icons/manufacturer/Apple'),
  Asus: async () => import('../../../icons/manufacturer/Asus'),
  Dell: async () => import('../../../icons/manufacturer/Dell'),
  HP: async () => import('../../../icons/manufacturer/HP'),
  IBM: async () => import('../../../icons/manufacturer/IBM'),
  Lenovo: async () => import('../../../icons/manufacturer/Lenovo'),
  LG: async () => import('../../../icons/manufacturer/LG'),
  MSI: async () => import('../../../icons/manufacturer/MSI'),
  Samsung: async () => import('../../../icons/manufacturer/Samsung'),
  Sony: async () => import('../../../icons/manufacturer/Sony'),
  Supermicro: async () => import('../../../icons/manufacturer/Supermicro'),
  Toshiba: async () => import('../../../icons/manufacturer/Toshiba'),
}
