import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIList, UIRectangle, UIText, UITextAlign } from '@daocasino/dc-react-gamengine'
import { TripleSelectButton } from '../../elements/TripleSelectButton'
import { TextInput } from '../../elements/TextInput'
import { TextInputCurrency } from '../../elements/TextInputCurrency'

class AutobetContainer extends Component<any, any> {
  render() {
    const { x, y, width, height, state } = this.props

    return (
      <UIContainer x={x} y={y}>
        <UIRectangle width={width} height={height} fill={0x1b1b46} />
        <UIList x={25} y={18} margin={{ x: 0, y: 18 }}>
          <UIText
            key={'autobetModeLabel'}
            anchor={{ x: 0, y: 0 }}
            text={tr('autobetMode')}
            style={{
              fill: 0xffffff,
              fontFamily: 'Rajdhani-fnt',
              fontSize: 23,
              align: UITextAlign.Left,
            }}
          />
          <UIText
            key={'onWinLabel'}
            anchor={{ x: 0, y: 0 }}
            alpha={0.4}
            text={tr('onWin')}
            style={{
              fill: 0xffffff,
              fontFamily: 'Rajdhani-fnt',
              fontSize: 16,
              align: UITextAlign.Left,
            }}
          />
          <TripleSelectButton
            key={'onWinButton'}
            width={this.props.width - 25 * 2}
            height={36}
          />
          <TextInput
            width={this.props.width - 25 * 2}
            height={36}
            value={0}
          />
          <UIText
            key={'onLoseLabel'}
            anchor={{ x: 0, y: 0 }}
            alpha={0.4}
            text={tr('onLose')}
            style={{
              fill: 0xffffff,
              fontFamily: 'Rajdhani-fnt',
              fontSize: 16,
              align: UITextAlign.Left,
            }}
          />
          <TripleSelectButton
            key={'onLoseButton'}
            width={this.props.width - 25 * 2}
            height={36}
          />
          <TextInput
            width={this.props.width - 25 * 2}
            height={36}
            value={0}
          />
          <UIText
            key={'stopOnLoseLabel'}
            anchor={{ x: 0, y: 0 }}
            alpha={0.4}
            text={tr('stopOnLose')}
            style={{
              fill: 0xffffff,
              fontFamily: 'Rajdhani-fnt',
              fontSize: 16,
              align: UITextAlign.Left,
            }}
          />
          <TextInputCurrency
            width={this.props.width - 25 * 2}
            height={36}
            value={0}
          />
          <UIText
            key={'stopOnProfitLabel'}
            anchor={{ x: 0, y: 0 }}
            alpha={0.4}
            text={tr('stopOnProfit')}
            style={{
              fill: 0xffffff,
              fontFamily: 'Rajdhani-fnt',
              fontSize: 16,
              align: UITextAlign.Left,
            }}
          />
          <TextInputCurrency
            width={this.props.width - 25 * 2}
            height={36}
            value={0}
          />
        </UIList>
      </UIContainer>
    )
  }
}

const mapState = state => {
  return {
    state: state,
  }
}

export default connect(mapState, null)(AutobetContainer)
