import React, { Component } from 'react'
import { UIContainer, UIRectangle, UITextAlign, UITextInput } from '@daocasino/dc-react-gamengine'

export class NumberInput extends Component<any, any> {
  render() {
    const { text, disabled, onBlur } = this.props

    return (
      <UIContainer
        x={this.props.x}
        y={this.props.y}
        interactive={!disabled}
        buttonMode={disabled}>
        <UIRectangle
          width={this.props.width}
          height={this.props.height}
          borderRadius={6}
          fill={0x313354}
          stroke={0x53537b}
          strokeThickness={1}
        />
        <UITextInput
          x={15}
          y={this.props.height / 2}
          anchor={{ x: 0, y: 0.5 }}
          type={'number'}
          text={text}
          min={'min' in this.props ? this.props.min : 0}
          max={'max' in this.props ? this.props.max : 0}
          style={{
            fill: 0xffffff,
            fontFamily: 'Rajdhani-fnt',
            fontSize: 20,
            align: UITextAlign.Left,
          }}
          disabled={disabled}
          interactive={!disabled}
          buttonMode={!disabled}
          onBlur={onBlur}
        />
      </UIContainer>
    )
  }
}
