import { useState } from 'react'
import { ICON_SETS, IconCategory } from './categories'
import { CpuManufacturerLogo } from '../components/CpuManufacturerLogo'
import { OemManufacturerLogo } from '../components/OemManufacturerLogo'

const SIZES = [48, 64, 96, 128]

export function IconPlayground() {
  const [category, setCategory] = useState<IconCategory>('manufacturer')
  const icons = ICON_SETS[category]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        background: '#fff',
        fontFamily: 'monospace',
      }}
    >
      <CpuManufacturerLogo size={90} productName={'Intel(R) Core(TM) i7-12700K'} />
      <OemManufacturerLogo size={100} vendorName={'Dell Inc.'} />
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <label>
          Category:{' '}
          <select value={category} onChange={e => setCategory(e.target.value as IconCategory)}>
            <option value="os">OS</option>
            <option value="manufacturer">Manufacturer</option>
          </select>
        </label>

        <span style={{ opacity: 0.6 }}>{Object.keys(icons).length} icons</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {Object.entries(icons).map(([name, Icon]) => (
          <div
            key={name}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, auto)',
              alignItems: 'center',
            }}
          >
            <div style={{ opacity: 0.8 }}>{name}</div>

            {SIZES.map(size => (
              <div
                key={size}
                style={{
                  border: '1px solid red',
                  display: 'flex',
                  width: 'fit-content',
                }}
              >
                <Icon size={size} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
