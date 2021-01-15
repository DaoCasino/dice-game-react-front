import React, { Component } from 'react'
import { isMobile } from 'mobile-device-detect'

import { UIContainer, UIRectangle } from 'dc-react-gamengine'
import BettingContainer from './containers/BettingContainer'
import SliderContainer from './containers/SliderContainer'
import AutobetContainer from './containers/AutobetContainer'

export default class Root extends Component<any, any> {
  state = { width: 0, height: 0 }

  updateDimensions = (): void => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  componentDidMount(): void {
    this.updateDimensions()

    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateDimensions)
  }

  getContainersDesktop(width: number, height: number): any {
    const sliderPositionPercent = { x: 0.35, y: 0 }
    const sliderSizePercent = { x: 0.65, y: 0.50 }

    const bettingPositionPercent = { x: 0, y: 0.50 }
    const bettingSizePercent = { x: 0.65, y: 0.50 }

    const autobetPositionPercent = { x: 0.65, y: 0 }
    const autobetSizePercent = { x: 0.35, y: 1 }
    const autobetLeftMargin = 1

    return (
      <UIContainer>
        <BettingContainer
          x={width * bettingPositionPercent.x}
          y={height * bettingPositionPercent.y}
          width={width * bettingSizePercent.x}
          height={height * bettingSizePercent.y}
        />
        <SliderContainer
          x={width * sliderPositionPercent.x - width * sliderSizePercent.x / 2}
          y={height * sliderPositionPercent.y}
          width={width * sliderSizePercent.x}
          height={height * sliderSizePercent.y}
        />
        <AutobetContainer
          x={width * autobetPositionPercent.x + autobetLeftMargin}
          y={height * autobetPositionPercent.y}
          width={width * autobetSizePercent.x - autobetLeftMargin}
          height={height * autobetSizePercent.y}
        />
      </UIContainer>
    )
  }

  getContainersMobile(width: number, height: number): any {
    const sliderPositionPercent = { x: 0, y: 0 }
    const sliderSizePercent = { x: 1, y: 0.31 }

    const bettingPositionPercent = { x: 0, y: 0.31 }
    const bettingSizePercent = { x: 1, y: 0.69 }

    // iPhone 5 + SE
    if (height <= 568) {
      sliderSizePercent.y = 0.28

      bettingPositionPercent.y = 0.28
      bettingSizePercent.y = 0.72
    }

    return (
      <UIContainer>
        <BettingContainer
          x={width * bettingPositionPercent.x}
          y={height * bettingPositionPercent.y}
          width={width * bettingSizePercent.x}
          height={height * bettingSizePercent.y}
        />
        <SliderContainer
          x={width * sliderPositionPercent.x}
          y={height * sliderPositionPercent.y}
          width={width * sliderSizePercent.x}
          height={height * sliderSizePercent.y}
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
