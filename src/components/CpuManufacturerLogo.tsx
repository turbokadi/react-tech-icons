import { Suspense, lazy, useMemo } from 'react'
import type { PublicIconProps } from '../IconBase'
import { solveCpuManufacturerFromProduct } from '../solver/cpuManufacturerFromProduct'
import { CPU_ICON_LOADERS } from '../registry/manufacturer/cpu/cpu-loader'

type Props = PublicIconProps & {
  productName?: string | null
  loading?: React.ReactNode
}

export function CpuManufacturerLogo({ productName, loading = null, ...props }: Props) {
  const manufacturer = useMemo(() => solveCpuManufacturerFromProduct(productName), [productName])

  if (!manufacturer) return <></>

  const loader = CPU_ICON_LOADERS[manufacturer]
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
