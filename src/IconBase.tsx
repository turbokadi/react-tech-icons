import { SVGProps } from 'react'

export type IconMeta = {
  viewBox: string
  ratio: number
}

export type PublicIconProps = Omit<SVGProps<SVGSVGElement>, 'viewBox'> & {
  size?: number
}

export type IconBaseProps = PublicIconProps & {
  meta: IconMeta
}

export function IconBase({ size = 24, meta, children, ...props }: IconBaseProps) {
  const [x, y, w, h] = meta.viewBox.split(/\s+/).map(Number)

  const visualRatio = clampVisualRatio(meta.ratio)
  const TARGET_AREA = size * size * 0.65

  const width = Math.sqrt(TARGET_AREA * visualRatio)
  const height = width / visualRatio

  let vbX = x
  let vbY = y
  let vbW = w
  let vbH = h

  // padding pour logos compacts (évite qu’ils dominent)
  if (meta.ratio > 0.9 && meta.ratio < 1.1) {
    const padX = w * 0.15
    const padY = h * 0.15
    vbX -= padX
    vbY -= padY
    vbW += padX * 2
    vbH += padY * 2
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  )
}

function clampVisualRatio(ratio: number) {
  const MAX = 1.6
  const MIN = 0.7

  if (ratio > MAX) {
    return MAX + Math.log(ratio - MAX + 1) * 0.35
  }

  if (ratio < MIN) {
    return MIN - Math.log(MIN - ratio + 1) * 0.35
  }

  return ratio
}
