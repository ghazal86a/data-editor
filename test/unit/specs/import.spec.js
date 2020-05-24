import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ImportCSV from '../../../src/components/ImportCSV'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('ImportCSV.vue', () => {
  let state
  let store

  beforeEach(() => {
    state = {
      header: ['header1', 'header2'],
      rows: [{'header1': 'value1'}, {'header2': 'value2'}]
    }
    store = new Vuex.Store({
      state
    })
  })

  it('sets the correct default data', () => {
    expect(typeof ImportCSV.data).toBe('function')
    const defaultData = ImportCSV.data()
    expect(defaultData.hasHeader).toBe(false)
  })

  it('correctly sets the hasHeader when created', () => {
    const wrapper = shallowMount(ImportCSV, {store, localVue})
    expect(wrapper.vm.$data.hasHeader).toBe(false)
  })

  it('change an input value, updates the state', () => {
    const wrapper = shallowMount(ImportCSV, { store, localVue })
    const input1 = wrapper.findAll('.cell-input').at(1)

    input1.element.value = 'some new value'
    input1.trigger('input')

    expect(store.state.rows[1]['header2']).toEqual('some new value')
  })
})
