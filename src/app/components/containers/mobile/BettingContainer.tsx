import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  tr,
  UIContainer,
  UIRectangle,
  UITab,
  UITabContainer,
  UITabType,
  UIText,
  UITextAlign,
} from '@daocasino/dc-react-gamengine'

enum TabType {
  Manual = 'manual',
  Auto = 'auto',
}

class BettingContainer extends Component<any, any> {
  render() {
    const { x, y, width, height, state } = this.props

    const margin = 10
    const totalWidth = width - margin * 4

    const buttonHeight = 64
    const changeBetButtonSize = 40

    const rollListX = margin * 2
    const rollListY = 22.5 + 18

    const betAmountX = margin * 2
    const betAmountY = 100
    const betAmountWidth =
      totalWidth - margin - (changeBetButtonSize * 2 + margin / 2)

    const payoutOnWinX = margin * 2
    const payoutOnWinY = betAmountY + margin * 4
    const payoutOnWinWidth = width - margin * 4

    const playButtonX = margin * 2
    const playButtonY = payoutOnWinY + 60
    const playButtonWidth = betAmountWidth

    const payoutOnWinValue = 0
    const betAmountValue = 0

    const tabHeight = 45

    return (
      <UIContainer x={x} y={y}>
        <UIRectangle width={width} height={height} fill={0x1b1b46} />
        <UITabContainer>
          <UITab key={TabType.Manual} selected={true}>
            <UIText
              key={UITabType.Default}
              x={width / 4}
              y={tabHeight / 2}
              anchor={{ x: 0.5, y: 0.5 }}
              text={tr('tabManualBet')}
              alpha={0.7}
              style={{
                fill: 0xffffff,
                fontFamily: 'Rajdhani-fnt',
                fontSize: 16,
                align: UITextAlign.Center,
              }}
            />
            <UIText
              key={UITabType.Selected}
              x={width / 4}
              y={tabHeight / 2}
              anchor={{ x: 0.5, y: 0.5 }}
              text={tr('tabManualBet')}
              alpha={0.7}
              style={{
                fill: 0x5d8edd,
                fontFamily: 'Rajdhani-fnt',
                fontSize: 16,
                align: UITextAlign.Center,
              }}
            />
          </UITab>

          <UITab key={TabType.Auto}>
            <UIText
              key={'default'}
              x={width - width / 4}
              y={tabHeight / 2}
              anchor={{ x: 0.5, y: 0.5 }}
              text={tr('tabAutoBet')}
              alpha={0.7}
              style={{
                fill: 0xffffff,
                fontFamily: 'Rajdhani-fnt',
                fontSize: 16,
                align: UITextAlign.Center,
              }}
            />
            <UIText
              key={'selected'}
              x={width - width / 4}
              y={tabHeight / 2}
              anchor={{ x: 0.5, y: 0.5 }}
              text={tr('tabAutoBet')}
              alpha={0.7}
              style={{
                fill: 0x5d8edd,
                fontFamily: 'Rajdhani-fnt',
                fontSize: 16,
                align: UITextAlign.Center,
              }}
            />
          </UITab>
        </UITabContainer>
        <UIRectangle
          x={0}
          y={tabHeight}
          width={width}
          height={1}
          fill={0x323259}
        />
      </UIContainer>
    )

    /*
    return (
      <UIContainer x={x} y={y}>
        <UIRectangle width={width} height={height} fill={0x1b1b46} />
        <PlayButton
          x={playButtonX}
          y={playButtonY}
          width={playButtonWidth}
          height={buttonHeight}
          pointerdown={() => playAction()}
        />
        <BetMaxButton
          x={playButtonX + playButtonWidth + margin}
          y={playButtonY}
          width={totalWidth - playButtonWidth - margin}
          height={buttonHeight}
        />
        <PayoutOnWin
          x={payoutOnWinX}
          y={payoutOnWinY}
          width={payoutOnWinWidth}
          height={40}
          value={payoutOnWinValue}
        />
        <ChangeBetButton
          x={betAmountX + betAmountWidth + margin}
          y={betAmountY}
          width={changeBetButtonSize}
          height={changeBetButtonSize}
          text={tr('decreaseBetButton')}
          pointerdown={() => betDivideAction()}
        />
        <ChangeBetButton
          x={betAmountX + betAmountWidth + margin + changeBetButtonSize + margin / 2}
          y={betAmountY}
          width={changeBetButtonSize}
          height={changeBetButtonSize}
          text={tr('increaseBetButton')}
          pointerdown={() => betMultiplyAction()}
        />
        <BetAmount
          x={betAmountX}
          y={betAmountY}
          width={betAmountWidth}
          height={40}
          value={betAmountValue}
        />
        <RollList
          x={rollListX}
          y={rollListY}
          maxRolls={5}
        />
      </UIContainer>
    )
     */
  }
}

const mapState = state => {
  return {
    state: state,
  }
}

export default connect(mapState, null)(BettingContainer)
