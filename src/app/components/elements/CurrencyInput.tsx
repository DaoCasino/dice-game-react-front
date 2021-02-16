import React, { Component } from 'react'

import {
  Engine,
  UIContainer,
  UIRectangle,
  UISprite,
  UITextAlign,
  UITextInput,
  Utils,
} from '@daocasino/dc-react-gamengine'

export class CurrencyInput extends Component<any, any> {
  render() {
    const { disabled } = this.props

    const currencyManager = Engine.instance.getCurrencyManager()
    const currencyProps = currencyManager.getProps()
    const currencyTexture = currencyManager.getTexture('currency')
    const currencyScale =
      currencyProps && currencyProps.scale > 0 ? 1 / currencyProps.scale : 1

    const currencyIconWidth = currencyTexture.width * currencyScale
    const currencyIconMargin = 8

    const textInputMargin = 40

    const text =
      'value' in this.props
        ? this.props.value
        : 'text' in this.props
        ? this.props.text
        : ''

    return (
      <UIContainer
        x={this.props.x}
        y={this.props.y}
        interactive={true}
        buttonMode={false}>
        <UIRectangle
          width={this.props.width}
          height={this.props.height}
          borderRadius={6}
          fill={0x313354}
          stroke={0x53537b}
          strokeThickness={1}
        />
        <UISprite
          x={currencyIconMargin}
          y={this.props.height / 2}
          anchor={{ x: 0, y: 0.5 }}
          scale={{ x: currencyScale, y: currencyScale }}
          texture={currencyTexture}
        />
        <UITextInput
          x={textInputMargin}
          y={this.props.height / 2}
          width={this.props.width - textInputMargin - currencyIconMargin}
          min={this.props.min}
          max={this.props.max}
          type={'number'}
          anchor={{ x: 0, y: 0.5 }}
          text={text}
          interactive={!disabled}
          buttonMode={!disabled}
          disabled={disabled}
          style={{
            fill: 0xffffff,
            fontFamily: 'Rajdhani-fnt',
            fontSize: 20,
            align: UITextAlign.Left,
          }}
          onBlur={value =>
            this.props.onBlur && this.props.onBlur(Utils.formatBet(value))
          }
        />
      </UIContainer>
    )
  }
}
