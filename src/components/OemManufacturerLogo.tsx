import { Suspense, lazy, useMemo } from 'react'
import type { PublicIconProps } from '../IconBase'
import { solveOemManufacturerFromVendor } from '../solver/oemManufacturerFromVendor'
import { OEM_ICON_LOADERS } from '../registry/manufacturer/oem/oem-loader'

type Props = PublicIconProps & {
  vendorName?: string | null
  loading?: React.ReactNode
}

export function OemManufacturerLogo({ vendorName, loading = null, ...props }: Props) {
  const manufacturer = useMemo(() => solveOemManufacturerFromVendor(vendorName), [vendorName])
  if (!manufacturer) return <></>

  const loader = OEM_ICON_LOADERS[manufacturer]
  if (!loader) return <></>

  const Icon = lazy(async () => {
    const mod = await loader()
    return { default: mod[manufacturer] ?? mod.default }
  })

  return (
    <Suspense fallback={loading}>
      <Icon {...props} />
    </Suspense>
  )
}
