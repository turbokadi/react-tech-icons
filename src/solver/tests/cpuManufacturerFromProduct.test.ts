// src/registry/cpu/solver.test.ts
import { describe, it, expect } from 'vitest'
import { solveCpuManufacturerFromProduct } from '../cpuManufacturerFromProduct'

describe('solveCpuManufacturer', () => {
  it('detects Intel CPUs', () => {
    expect(solveCpuManufacturerFromProduct('Intel(R) Core(TM) i7-12700K')).toBe('Intel')
  })

  it('detects AMD CPUs', () => {
    expect(solveCpuManufacturerFromProduct('AMD Ryzen 9 7950X')).toBe('AMD')
  })

  it('detects ARM CPUs', () => {
    expect(solveCpuManufacturerFromProduct('ARM Cortex-A78')).toBe('ARM')
  })

  it('detects Apple CPUs', () => {
    expect(solveCpuManufacturerFromProduct('Apple M2 Pro')).toBe('Apple')
  })

  it('detects Qualcomm CPUs', () => {
    expect(solveCpuManufacturerFromProduct('Qualcomm Snapdragon X Elite')).toBe('Qualcomm')
  })

  it('is case-insensitive', () => {
    expect(solveCpuManufacturerFromProduct('iNtEl xeon gold 6338')).toBe('Intel')
  })

  it('returns null when no manufacturer is found', () => {
    expect(solveCpuManufacturerFromProduct('VIA Nano U2250')).toBeNull()
  })

  it('does not return Unknown', () => {
    expect(solveCpuManufacturerFromProduct('Unknown Fancy CPU 3000')).toBeNull()
  })
})
