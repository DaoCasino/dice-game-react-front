import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  tr,
  UIContainer,
  UIList,
  UIListStyle,
  UIRectangle,
  UITab,
  UITabContainer,
  UITabContent,
  UITabType,
  UIText,
  UITextAlign,
} from '@daocasino/dc-react-gamengine'
import RollList from '../../elements/RollList'
import BetAmount from '../../elements/BetAmount'
import ChangeBetButton from '../../elements/ChangeBetButton'
import {
  betDivideAction,
  betMinusAction,
  betMultiplyAction,
  betPlusAction,
  playAction,
} from '../../../state/reducers/ReducerAction'
import PayoutOnWin from '../../elements/PayoutOnWin'
import PlayButton from '../../elements/PlayButton'
import BetMaxButton from '../../elements/BetMaxButton'

enum TabType {
  Manual = 'manual',
  Auto = 'auto',
}

class BettingContainer extends Component<any, any> {
  render() {
    const { x, y, width, height, state } = this.props

    const margin = 15
    const totalWidth = width - margin * 2

    const buttonHeight = 64
    const changeBetButtonSize = 40
    const changeButtonMargin = 5

    const betAmountY = 60
    const betAmountWidth = totalWidth - ((changeBetButtonSize + changeButtonMargin) * 4)

    const payoutOnWinY = 120
    const payoutOnWinWidth = totalWidth

    const playButtonY = payoutOnWinY + 60
    const playButtonWidth = betAmountWidth + (changeBetButtonSize + changeButtonMargin) * 1.5

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

          <UITabContent x={margin} y={tabHeight + 35}>
            <RollList maxRolls={5} />
            <BetAmount
              y={betAmountY}
              width={betAmountWidth}
              height={40}
              value={betAmountValue}
            />
            <UIList
              x={betAmountWidth + changeButtonMargin}
              y={betAmountY}
              margin={{ x: changeButtonMargin, y: 0 }}
              style={UIListStyle.Horizontal}>
              <ChangeBetButton
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('minusBetButton')}
                pointerdown={() => betMinusAction()}
              />
              <ChangeBetButton
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('plusBetButton')}
                pointerdown={() => betPlusAction()}
              />
              <ChangeBetButton
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('decreaseBetButton')}
                pointerdown={() => betDivideAction()}
              />
              <ChangeBetButton
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('increaseBetButton')}
                pointerdown={() => betMultiplyAction()}
              />
            </UIList>
            <PayoutOnWin
              y={payoutOnWinY}
              width={payoutOnWinWidth}
              height={40}
              value={payoutOnWinValue}
            />
            <PlayButton
              y={playButtonY}
              width={playButtonWidth}
              height={buttonHeight}
              pointerdown={() => playAction()}
            />
            <BetMaxButton
              x={playButtonWidth + margin}
              y={playButtonY}
              width={totalWidth - playButtonWidth - margin}
              height={buttonHeight}
              pointerdown={() => playAction()}
            />
          </UITabContent>

          <UITabContent x={margin} y={tabHeight + 30}></UITabContent>
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
  }
}

const mapState = state => {
  return {
    state: state,
  }
}

export default connect(mapState, null)(BettingContainer)
