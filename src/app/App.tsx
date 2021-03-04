import EventEmitter from 'eventemitter3'
import * as PIXI from 'pixi.js'

import React from 'react'
import thunk from 'redux-thunk'

import { Store } from 'redux'

import { ResourcesConfig } from './Resources'
import { reducer } from './state/reducers/Reducer'

import './App.css'

import {
  CurrencyManager,
  Engine,
  Localization,
  ResourceManager,
  ResourceManagerEvent,
  Utils,
} from '@daocasino/dc-react-gamengine'

import Root from './components/Root'
import { IDice } from './math/IDice'
import { DiceMock } from './math/DiceMock'
import { setBalanceAction, setBetMax, setBetMin, setPayoutMax } from './state/reducers/ReducerAction'
import { DiceBackend } from './math/DiceBackend'
import { SoundMiddleware } from './state/middlewares/SoundMiddleware'
import { AutobetMiddleware } from './state/middlewares/AutobetMiddleware'
import { VibrateMiddleware } from './state/middlewares/VibrateMiddleware'
import { DefaultState } from './state/DefaultState'

interface AppInitOptions {
  isDebug?: boolean
  isMock?: boolean
}

export class App extends EventEmitter {
  static instance: App

  protected props: AppInitOptions

  protected engine: Engine
  protected store: Store
  protected currencyManager: CurrencyManager
  protected resourceManager: ResourceManager

  protected gameAPI: IDice

  constructor() {
    super()

    App.instance = this
  }

  public async init(
    props: AppInitOptions = {
      isDebug: process.env.NODE_ENV === 'development',
      isMock: process.env.GAME_IS_MOCK,
    },
  ): Promise<void> {
    this.props = props

    if (new URLSearchParams(window.location.search).has('demo')) {
      this.props.isMock = true
    }

    console.log('App::init() -', props)

    await this.initEngine(reducer, DefaultState, [
      thunk,
      AutobetMiddleware,
      SoundMiddleware,
      VibrateMiddleware,
    ])
    await this.initLocal()
    await this.loadResources(ResourcesConfig)

    this.hideLoader()

    await this.connectToServer()
    await this.initCurrency()

    const canvas = document.getElementById('canvas')

    this.start(<Root />, {
      view: canvas,
      backgroundColor: 0x0e1037,
      resolution: window.devicePixelRatio,
      resizeTo: window,
      autoDensity: true,
      antialias: true,
    })
  }

  protected async loadResources(config: any): Promise<void> {
    return new Promise(resolve => {
      console.log('App::loadResources() -', config)

      this.resourceManager = this.engine.getResourceManager()
      this.resourceManager.addFromMap(config.images)
      this.resourceManager.addFromMap(config.sounds)
      this.resourceManager.addFromMap(config.fonts)
      this.resourceManager.once(ResourceManagerEvent.Complete, () => resolve())
      this.resourceManager.load()
    })
  }

  protected hideLoader(): void {
    document.body.removeChild(document.body.getElementsByClassName('loading')[0])
  }

  protected async initEngine(
    reducer: any,
    initialState: any,
    middlewares: any[] = [],
  ): Promise<void> {
    this.engine = new Engine()
    this.engine.init(reducer, initialState, middlewares)

    this.store = this.engine.getStore()

    return Promise.resolve()
  }

  protected async setupDefaultCurrency() {
    const curr = 'BET'
    const precision = 2

    await this.currencyManager.setData([
      {
        type: curr,
        precision: precision,
        sources: [
          {
            key: 'currency',
            src: this.engine.getResourceManager().getTexture('currency_png'),
          },
        ],
      },
    ])

    this.currencyManager.setCurrency(curr)

    console.warn('App::setupDefaultCurrency() - currency fallback to default')
  }

  protected async setupCurrency() {
    const urlParams = new URLSearchParams(window.location.search)
    const hasAllParams =
      urlParams.has('cur') &&
      urlParams.has('curIcon') &&
      urlParams.has('curPrecision')

    if (!hasAllParams) {
      console.error('App::setupCurrency() - invalid urlParams')

      return Promise.reject()
    }

    const cur = urlParams.get('cur')
    const curIcon = urlParams.get('curIcon')
    const curPrecision = parseInt(urlParams.get('curPrecision'), 10)

    const scale = 3

    let image = null

    try {
      image = await Utils.svg2img(curIcon, {
        width: 24 * scale,
        height: 24 * scale,
      })
    } catch (error) {
      console.error('App::setupCurrency() - invalid imageUrl')

      return Promise.reject()
    }

    await this.currencyManager.setData([
      {
        type: cur,
        precision: curPrecision,
        scale: scale,
        sources: [
          {
            key: 'currency',
            src: new PIXI.Texture(new PIXI.BaseTexture(image)),
          },
        ],
      },
    ])

    this.currencyManager.setCurrency(cur)

    return Promise.resolve()
  }

  protected async initCurrency() {
    this.currencyManager = this.engine.getCurrencyManager()

    try {
      await this.setupCurrency()
    } catch (e) {
      await this.setupDefaultCurrency()
    }
  }

  protected async connectToServer() {
    try {
      this.gameAPI = this.props.isMock ? new DiceMock() : new DiceBackend()

      const { balance, params } = await this.gameAPI.init()

      setBalanceAction(balance)
      setBetMin(parseInt(params[0].value) / 10000)
      setBetMax(parseInt(params[1].value) / 10000)
      setPayoutMax(parseInt(params[2].value) / 10000)

    } catch (err) {
      console.error(err)
      return Promise.reject(err)
    }
  }

  protected start(element: any, props: any): void {
    this.engine.start(element, props)
  }

  protected async initLocal(): Promise<void> {
    const url = new URL(window.location.href)

    url.pathname += this.props.isDebug ? './public/local/' : './local/'
    url.search = ''

    try {
      await Localization.init('en', url.toString() + '{{lng}}.json')
    } catch (e) {
      console.error('initLocal', e)
    }
  }

  public getGameAPI(): IDice {
    return this.gameAPI
  }
}
