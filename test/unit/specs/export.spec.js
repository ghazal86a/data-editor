import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ExportJson from '../../../src/components/ExportJson'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('ExportJson Component', () => {
  let state
  let store

  beforeEach(() => {
    state = {
      rows: []
    }
    store = new Vuex.Store({
      state
    })
  })

  it('sets the correct default data', () => {
    expect(typeof ExportJson.data).toBe('function')
    const defaultData = ExportJson.data()
    expect(defaultData.showError).toBe(false)
  })

  it('correctly sets the showError when created', () => {
    const wrapper = mount(ExportJson, {store, localVue})
    expect(wrapper.vm.$data.showError).toBe(false)
  })
})
