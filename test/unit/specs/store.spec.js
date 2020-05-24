import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ImportCSV from '../../../src/components/ImportCSV'
import store from '../../../src/store/index.js'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('ImportCSV.vue', () => {
  let state
  let actions
  let store

  beforeEach(() => {
    state = {
      header: [],
      rows: []
    }
    actions = {
      loadCSV: jest.fn(),
      changeValue: jest.fn()
    }
    store = new Vuex.Store({
      state,
      actions
    })
  })

  it('actions - loadCSV - correct action is being called', () => {
    const wrapper = shallowMount(ImportCSV, {store, localVue})

    wrapper.vm.getData()
    expect(actions.loadCSV).toHaveBeenCalled()
  })

  it('actions - handleChange - correct action is being called', () => {
    const wrapper = shallowMount(ImportCSV, {store, localVue})

    wrapper.vm.handleChange()
    expect(actions.changeValue).toHaveBeenCalled()
  })
})

describe('Store', () => {
  it('Mutations - SET_DATA sets the store state', () => {
    expect(store.state).toEqual({ header: [], rows: [] })

    const parsedCSV = {
      headers: ['header1', 'header2', 'header3'],
      result: [{'header1': 'item1', 'header2': 'item2', 'header3': 'item3'}]
    }
    store.commit('SET_DATA', parsedCSV)

    expect(store.state.header).toEqual(['header1', 'header2', 'header3'])
    expect(store.state.rows[0]['header1']).toEqual('item1')
  })

  it('Mutations - SET_NEW_VALUE changes the store state values', () => {
    store.setState = {
      headers: ['header1', 'header2', 'header3'],
      result: [{'header1': 'item1', 'header2': 'item2', 'header3': 'item3'}]
    }
    const payload = {index: 0, key: 'header2', newValue: 'new item 2'}
    store.commit('SET_NEW_VALUE', payload)

    expect(store.state.header).toEqual(['header1', 'header2', 'header3'])
    expect(store.state.rows[0]['header2']).toEqual('new item 2')
  })
})

describe('Store helper functions', () => {
  const sampleCsv =
    `sad,cover,worry
desert,satisfied,fireplace`

  it('convertCSVTOJson - is called with correct parameters', () => {
    jest.spyOn(store, 'convertCSVToJson')
    store.convertCSVToJson(sampleCsv, false)

    expect(store.convertCSVToJson).toHaveBeenCalled()
    expect(store.convertCSVToJson).toHaveBeenCalledWith(sampleCsv, false)
  })

  it('convertCSVTOJson - generates correct object without header', () => {
    const output = store.convertCSVToJson(sampleCsv, false)
    expect(output.headers).toEqual([ 'sad', 'cover', 'worry' ])
    expect(output.result).toEqual(
      [
        { '0': 'sad', '1': 'cover', '2': 'worry' },
        { '0': 'desert', '1': 'satisfied', '2': 'fireplace' }
      ]
    )
  })

  it('convertCSVTOJson - generates correct object with header', () => {
    const output = store.convertCSVToJson(sampleCsv, true)
    expect(output.headers).toEqual([ 'sad', 'cover', 'worry' ])
    expect(output.result).toEqual(
      [
        {'cover': 'satisfied', 'sad': 'desert', 'worry': 'fireplace'}
      ]
    )
  })
})
