import React, { Component } from 'react'
import { isMobile } from 'mobile-device-detect'

import { Engine, UIContainer, UIRectangle } from '@daocasino/dc-react-gamengine'

import BettingContainerDesktop from './containers/desktop/BettingContainer'
import SliderContainerDesktop from './containers/desktop/SliderContainer'
import AutobetContainerDesktop from './containers/desktop/AutobetContainer'

import BettingContainerMobile from './containers/mobile/BettingContainer'

export default class Root extends Component<any, any> {
  state = { width: 0, height: 0 }

  updateDimensions = () => {
    const resolution = Engine.instance.getRenderer().resolution
    const width = Engine.instance.getRenderer().width / resolution
    const height = Engine.instance.getRenderer().height / resolution

    this.setState({ width: width, height: height })
  }

  componentDidMount(): void {
    this.updateDimensions()

    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('orientationchange', this.updateDimensions)
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('orientationchange', this.updateDimensions)
  }

  getContainersDesktop(width: number, height: number): any {
    const sliderPositionPercent = { x: 0.325, y: 0 }
    const sliderSizePercent = { x: 0.55, y: 0.50 }

    const bettingPositionPercent = { x: 0, y: 0.50 }
    const bettingSizePercent = { x: 0.65, y: 0.50 }

    const autobetPositionPercent = { x: 0.65, y: 0 }
    const autobetSizePercent = { x: 0.35, y: 1 }
    const autobetLeftMargin = 1

    return (
      <UIContainer>
        <SliderContainerDesktop
          x={width * sliderPositionPercent.x - width * sliderSizePercent.x / 2}
          y={height * sliderPositionPercent.y}
          width={width * sliderSizePercent.x}
          height={height * sliderSizePercent.y}
        />
        <BettingContainerDesktop
          x={width * bettingPositionPercent.x}
          y={height * bettingPositionPercent.y}
          width={width * bettingSizePercent.x}
          height={height * bettingSizePercent.y}
        />
        <AutobetContainerDesktop
          x={width * autobetPositionPercent.x + autobetLeftMargin}
          y={height * autobetPositionPercent.y}
          width={width * autobetSizePercent.x - autobetLeftMargin}
          height={height * autobetSizePercent.y}
        />
      </UIContainer>
    )
  }

  getContainersMobile(width: number, height: number): any {
    const sliderPositionPercent = { x: 0.5, y: 0 }
    const sliderSizePercent = { x: 0.9, y: 0.40 }

    const bettingPositionPercent = { x: 0, y: 0.40 }
    const bettingSizePercent = { x: 1, y: 0.60 }

    return (
      <UIContainer>
        <SliderContainerDesktop
          x={width * sliderPositionPercent.x - width * sliderSizePercent.x / 2}
          y={height * sliderPositionPercent.y}
          width={width * sliderSizePercent.x}
          height={height * sliderSizePercent.y}
        />
        <BettingContainerMobile
          x={width * bettingPositionPercent.x}
          y={height * bettingPositionPercent.y}
          width={width * bettingSizePercent.x}
          height={height * bettingSizePercent.y}
        />
      </UIContainer>
    )
  }

  render(): JSX.Element {
    let { width, height } = this.state

    if (!isMobile) {
      width = Math.max(Math.min(960, width), 900)
      height = Math.max(Math.min(520, height), 520)
    }

    const container = isMobile ?
      this.getContainersMobile(width, height) :
      this.getContainersDesktop(width, height)

    return (
      <UIContainer>
        <UIRectangle
          x={0}
          y={0}
          width={width}
          height={height}
          fill={0x0e1037}
        />
        {container}
      </UIContainer>
    )
  }
}
