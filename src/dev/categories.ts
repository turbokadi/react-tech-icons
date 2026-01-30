// src/dev/icon-categories.ts
import * as OsIcons from '../icons/os'
import * as ManufacturerIcons from '../icons/manufacturer'

export type IconCategory = 'os' | 'manufacturer'

export const ICON_SETS: Record<IconCategory, Record<string, React.ComponentType<any>>> = {
  os: OsIcons,
  manufacturer: ManufacturerIcons,
}
