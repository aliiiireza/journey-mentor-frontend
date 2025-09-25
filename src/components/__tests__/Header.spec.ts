import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '../Header.vue'

describe('Header', () => {
  it('renders title correctly', () => {
    const wrapper = mount(Header, {
      props: {
        isDarkMode: false
      }
    })

    expect(wrapper.text()).toContain('Where in the world?')
  })

  it('shows light mode button when in dark mode', () => {
    const wrapper = mount(Header, {
      props: {
        isDarkMode: true
      }
    })

    expect(wrapper.text()).toContain('Dark Mode')
  })

  it('shows dark mode button when in light mode', () => {
    const wrapper = mount(Header, {
      props: {
        isDarkMode: false
      }
    })

    expect(wrapper.text()).toContain('Light Mode')
  })

  it('emits toggle-theme event when button is clicked', async () => {
    const wrapper = mount(Header, {
      props: {
        isDarkMode: false
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('toggleTheme')).toBeTruthy()
  })
})
