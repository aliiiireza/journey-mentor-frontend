import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CountryCard from '../CountryCard.vue'

const mockCountry = {
  name: {
    common: 'United States',
    official: 'United States of America'
  },
  population: 331002651,
  region: 'Americas',
  capital: ['Washington, D.C.'],
  flags: {
    png: 'https://flagcdn.com/w320/us.png',
    svg: 'https://flagcdn.com/us.svg'
  },
  cca3: 'USA'
}

describe('CountryCard', () => {
  it('renders country information correctly', () => {
    const wrapper = mount(CountryCard, {
      props: {
        country: mockCountry
      }
    })

    expect(wrapper.text()).toContain('United States')
    expect(wrapper.text()).toContain('331,002,651')
    expect(wrapper.text()).toContain('Americas')
    expect(wrapper.text()).toContain('Washington, D.C.')
  })

  it('emits click event when card is clicked', async () => {
    const wrapper = mount(CountryCard, {
      props: {
        country: mockCountry
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual([mockCountry])
  })

  it('formats population numbers correctly', () => {
    const wrapper = mount(CountryCard, {
      props: {
        country: {
          ...mockCountry,
          population: 1234567
        }
      }
    })

    expect(wrapper.text()).toContain('1,234,567')
  })

  it('handles missing capital gracefully', () => {
    const wrapper = mount(CountryCard, {
      props: {
        country: {
          ...mockCountry,
          capital: []
        }
      }
    })

    expect(wrapper.text()).toContain('N/A')
  })
})
