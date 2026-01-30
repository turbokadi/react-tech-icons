import { describe, it, expect } from 'vitest'
import { solveOemManufacturerFromVendor } from '../oemManufacturerFromVendor'

describe('solveOemManufacturerFromVendor', () => {
  it('returns null for empty or undefined input', () => {
    expect(solveOemManufacturerFromVendor(undefined)).toBeNull()
    expect(solveOemManufacturerFromVendor(null)).toBeNull()
    expect(solveOemManufacturerFromVendor('')).toBeNull()
  })

  it('detects Dell vendors', () => {
    expect(solveOemManufacturerFromVendor('Dell Inc.')).toBe('Dell')
    expect(solveOemManufacturerFromVendor('DELL COMPUTER CORPORATION')).toBe('Dell')
  })

  it('detects HP vendors', () => {
    expect(solveOemManufacturerFromVendor('HP')).toBe('HP')
    expect(solveOemManufacturerFromVendor('Hewlett-Packard')).toBe('HP')
    expect(solveOemManufacturerFromVendor('Hewlett Packard Enterprise')).toBe('HP')
  })

  it('detects Lenovo vendors', () => {
    expect(solveOemManufacturerFromVendor('LENOVO')).toBe('Lenovo')
    expect(solveOemManufacturerFromVendor('Lenovo Group Limited')).toBe('Lenovo')
  })

  it('detects Apple vendors', () => {
    expect(solveOemManufacturerFromVendor('Apple Inc.')).toBe('Apple')
  })

  it('detects Asus vendors', () => {
    expect(solveOemManufacturerFromVendor('ASUSTeK COMPUTER INC.')).toBe('Asus')
    expect(solveOemManufacturerFromVendor('ASUS')).toBe('Asus')
  })

  it('detects Acer vendors', () => {
    expect(solveOemManufacturerFromVendor('Acer')).toBe('Acer')
    expect(solveOemManufacturerFromVendor('Acer Incorporated')).toBe('Acer')
  })

  it('detects MSI vendors', () => {
    expect(solveOemManufacturerFromVendor('Micro-Star International')).toBe('MSI')
    expect(solveOemManufacturerFromVendor('MSI')).toBe('MSI')
  })

  it('detects Samsung vendors', () => {
    expect(solveOemManufacturerFromVendor('Samsung Electronics')).toBe('Samsung')
  })

  it('detects Sony vendors', () => {
    expect(solveOemManufacturerFromVendor('Sony Corporation')).toBe('Sony')
  })

  it('detects Toshiba vendors', () => {
    expect(solveOemManufacturerFromVendor('TOSHIBA')).toBe('Toshiba')
  })

  it('detects Supermicro vendors', () => {
    expect(solveOemManufacturerFromVendor('Supermicro')).toBe('Supermicro')
    expect(solveOemManufacturerFromVendor('Super Micro Computer Inc.')).toBe('Supermicro')
  })

  it('detects IBM vendors', () => {
    expect(solveOemManufacturerFromVendor('IBM')).toBe('IBM')
    expect(solveOemManufacturerFromVendor('International Business Machines')).toBe('IBM')
  })

  it('detects LG vendors', () => {
    expect(solveOemManufacturerFromVendor('LG Electronics')).toBe('LG')
    expect(solveOemManufacturerFromVendor('LGE')).toBe('LG')
  })

  it('returns null for unknown vendors', () => {
    expect(solveOemManufacturerFromVendor('Random Whitebox OEM')).toBeNull()
    expect(solveOemManufacturerFromVendor('To Be Filled By O.E.M.')).toBeNull()
  })
})
