import EventEmitter from 'eventemitter3'

import { Engine, Localization, ResourceManager, ResourceManagerEvent } from 'dc-react-gamengine'

import React from 'react'
import * as process from 'process'

import { ResourcesConfig } from './Resources'
import { initialState, reducer } from './reducers/Reducer'

import Root from './components/Root'

interface AppInitOptions {
  debugMode?: boolean
}

export class App extends EventEmitter {
  static instance: App

  private engine: Engine
  private resourceManager: ResourceManager

  constructor() {
    super()

    App.instance = this
  }

  public async init(
    props: AppInitOptions = {
      debugMode: process.env.BUILD_MODE === 'development',
    },
  ): Promise<void> {
    console.log('App::init() -', props)

    await this.initEngine({
      view: document.getElementById('canvas'),
      backgroundColor: 0x0E1037,
      resolution: window.devicePixelRatio,
      resizeTo: window,
      antialias: true,
    })
    await this.initLocal()
    await this.loadResources(ResourcesConfig)

    this.start(<Root />, reducer, initialState)
  }

  protected async loadResources(config: any): Promise<void> {
    return new Promise((resolve) => {
      console.log('App::loadResources() -', config)

      this.resourceManager = this.engine.getResourceManager()
      this.resourceManager.addFromMap(config.images)
      this.resourceManager.addFromMap(config.sounds)
      this.resourceManager.addFromMap(config.fonts)
      this.resourceManager.once(ResourceManagerEvent.Complete, () => resolve())
      this.resourceManager.load()
    })
  }

  protected async initEngine(props: any): Promise<void> {
    this.engine = new Engine()
    this.engine.init(props)

    return Promise.resolve()
  }

  protected start(element: any, reducer: any, initialState: any = {}): void {
    this.engine.start(element, reducer, initialState)
  }

  private async initLocal(): Promise<void> {
    const url = new URL(window.location.href)

    url.pathname += 'res/local/'
    url.search = ''

    try {
      await Localization.init(
        'en',
        url.toString() + '{{lng}}.json',
      )
    } catch (e) {
      console.error('initLocal', e)
    }
  }
}
