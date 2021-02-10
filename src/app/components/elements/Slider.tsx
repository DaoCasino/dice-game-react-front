import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Engine,
  UIContainer,
  UIRectangle,
  UIText,
  UITextAlign,
  UITilingSprite,
  Utils,
} from '@daocasino/dc-react-gamengine'

class SliderStep extends Component<any, any> {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    value: PropTypes.number,
    text: PropTypes.object,
    rectangle: PropTypes.object,
  }

  static defaultProps = {
    x: 0,
    y: 0,
    value: 0,
    rectangle: {
      fill: 0xffffff,
      strokeThickness: 1,
      strokeAlpha: 0.3,
      width: 1,
      height: 10,
    },
    text: {
      alpha: 0.5,
      y: -9,
      anchor: {
        x: 0.5,
        y: 0.5,
      },
      style: {
        fill: 0xffffff,
        fontFamily: 'Rajdhani-fnt',
        fontSize: 11,
        align: UITextAlign.Center,
      },
    },
  }

  render(): JSX.Element {
    const { x, y, rectangle, text, value } = this.props

    text.text = value.toString()

    return (
      <UIContainer x={x} y={y}>
        <UIRectangle {...rectangle} />
        <UIText {...text} />
      </UIContainer>
    )
  }
}

class Slider extends Component<any, any> {
  protected draggingData: any
  protected dragging: boolean

  componentDidMount() {
    this.dragging = false
    this.draggingData = null

    this.setState({
      value: this.props.value,
    })
  }

  renderSteps(value): JSX.Element {
    const steps = this.props.steps
    const elements = []

    for (let i = 0; i < steps; i++) {
      const percent = (100 / (steps - 1)) * i

      elements.push(
        <SliderStep
          key={i.toString()}
          x={Utils.remap(percent, 0, 100, 0, this.props.width)}
          y={-6}
          value={percent}
        />,
      )
    }

    return <UIContainer>{elements}</UIContainer>
  }

  renderIndicator(x, y, number, profit): JSX.Element {
    const width = profit.toString().length * 7
    const height = 22

    return (
      <UIContainer x={x - width / 2} y={y}>
        <UIRectangle
          width={width}
          height={height}
          fill={profit > 0 ? 0x61ffb1 : 0xff6f61}
          borderRadius={14}
        />
        <UIRectangle
          x={width / 2 + (number === 0 ? 0 : (number === 100 ? -2 : -1))}
          y={height / 2}
          width={2}
          height={50}
          fill={profit > 0 ? 0x61ffb1 : 0xff6f61}
        />
        <UIText
          text={number.toString()}
          x={width / 2}
          y={height / 2}
          anchor={{
            x: 0.5,
            y: 0.5,
          }}
          style={{
            align: UITextAlign.Center,
            fill: 0x000000,
            fontFamily: 'Rajdhani-fnt',
            fontSize: 14,
          }}
        />
      </UIContainer>
    )
  }

  render(): JSX.Element {
    if (!this.state) {
      return null
    }

    const {
      x,
      y,
      width,
      height,
      min,
      max,
      showSteps,
      number,
      profit,
    } = this.props
    const { value } = this.state

    const handleWidth = 44
    const handleHeight = 44
    const handleX = Utils.remap(value, min, max, 0, width - handleWidth)

    const handleText = Math.floor(value).toString()

    const maxHeight = Math.max(height, handleHeight)

    const leftWidth = Utils.remap(
      value,
      min,
      max,
      handleWidth / 2,
      width - handleWidth / 2,
    )
    const rightWidth = width - leftWidth

    return (
      <UIContainer x={x} y={y}>
        {showSteps ? this.renderSteps(value) : null}
        {profit !== undefined && number !== undefined
          ? this.renderIndicator(
            Utils.remap(number, 0, 100, 0, width),
            -30,
            number,
            profit,
          )
          : null}
        <UIRectangle
          y={(maxHeight - height) / 2}
          width={leftWidth}
          height={height}
          fill={0xff6f61}
          borderRadius={8}
        />
        <UIRectangle
          x={leftWidth}
          y={(maxHeight - height) / 2}
          width={rightWidth}
          height={height}
          fill={0x61ffb1}
          borderRadius={8}
        />
        <UITilingSprite
          x={handleX + handleWidth / 2 + rightWidth - 5}
          y={(maxHeight - height) / 2}
          width={rightWidth}
          height={height}
          anchor={{
            x: 1,
            y: 0,
          }}
          tilePosition={{ x: rightWidth, y: 0 }}
          texture={Engine.instance
            .getResourceManager()
            .getTexture('pattern_png')}
        />
        <UIRectangle
          x={handleX}
          width={handleWidth}
          height={handleHeight}
          fill={0xffffff}
          borderRadius={8}
          buttonMode={true}
          interactive={true}
          pointerdown={e => {
            this.draggingData = e.data
            this.dragging = true
          }}
          pointerup={() => {
            this.draggingData = null
            this.dragging = false
          }}
          pointerupoutside={() => {
            this.draggingData = null
            this.dragging = false
          }}
          pointermove={e => {
            if (this.dragging) {
              const globalPosition = this.draggingData.global

              const handleWidth = 44

              const min = this.props.x // + handleWidth / 2
              const max = this.props.x + leftWidth + rightWidth + handleWidth

              const x = Math.max(min, Math.min(max, globalPosition.x))

              let value = Utils.remap(
                x,
                min,
                max,
                this.props.min,
                this.props.max,
              )

              if (this.props.stepping) {
                value = Math.round(value)
              }

              this.setState({
                value: value,
              })

              if (this.props.onChangeValue) {
                this.props.onChangeValue(value)
              }
            }
          }}
        />
        <UIText
          text={handleText}
          x={handleX + handleWidth / 2}
          y={handleHeight / 2}
          anchor={{
            x: 0.5,
            y: 0.5,
          }}
          style={{
            align: UITextAlign.Center,
            fill: 0x121224,
            fontFamily: 'Rajdhani-fnt',
            fontSize: 20,
          }}
        />
      </UIContainer>
    )
  }
}

const mapState = state => {
  const { chance, profit, number } = state

  return {
    chance,
    profit,
    number,
  }
}

export default connect(mapState, null)(Slider)
