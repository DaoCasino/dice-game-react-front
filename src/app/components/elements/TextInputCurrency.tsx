import React, { Component } from 'react'
import { Engine, UIContainer, UIRectangle, UISprite, UITextAlign, UITextInput, Utils } from '@daocasino/dc-react-gamengine'

export class TextInputCurrency extends Component<any, any> {
  render() {
    return <UIContainer x={this.props.x} y={this.props.y} interactive={true} buttonMode={false}>
      <UIRectangle
        width={this.props.width}
        height={this.props.height}
        borderRadius={6}
        fill={0x313354}
        stroke={0x53537b}
        strokeThickness={1}
      />
      <UISprite
        x={8}
        y={this.props.height / 2}
        anchor={{ x: 0, y: 0.5 }}
        texture={Engine.instance.getResourceManager().getTexture('currency_png')}
      />
      <UITextInput
        x={40}
        y={this.props.height / 2}
        anchor={{ x: 0, y: 0.5 }}
        text={Utils.formatCurrency(this.props.value)}
        interactive={true}
        buttonMode={true}
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
