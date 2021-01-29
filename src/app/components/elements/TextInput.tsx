import React, { Component } from 'react'
import { UIContainer, UIRectangle, UIText, UITextAlign, Utils } from 'dc-react-gamengine'

export class TextInput extends Component<any, any> {
  render() {
    return <UIContainer x={this.props.x} y={this.props.y} interactive={false} buttonMode={false}>
      <UIRectangle
        width={this.props.width}
        height={this.props.height}
        borderRadius={6}
        fill={0x313354}
        stroke={0x53537b}
        strokeThickness={1}
      />
      <UIText
        x={15}
        y={this.props.height / 2}
        anchor={{ x: 0, y: 0.5 }}
        text={Utils.formatCurrency(this.props.value)}
        style={{
          fill: 0xffffff,
          fontFamily: 'Rajdhani-fnt',
          fontSize: 20,
          align: UITextAlign.Left,
        }}
      />
    </UIContainer>
  }
}
