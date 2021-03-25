import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  tr,
  UIContainer,
  UIList,
  UIListStyle,
  UIRectangle,
  UIScrollContainer,
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
  autobetOnLoseInputAction,
  autobetOnLoseMinusAction,
  autobetOnLoseModeAction,
  autobetOnLosePlusAction,
  autobetOnOffAction,
  autobetOnWinInputAction,
  autobetOnWinMinusAction,
  autobetOnWinModeAction,
  autobetOnWinPlusAction,
  autobetStopAction,
  autobetStopOnLoseInputAction,
  autobetStopOnLoseMinusAction,
  autobetStopOnLosePlusAction,
  autobetStopOnWinInputAction,
  autobetStopOnWinMinusAction,
  autobetStopOnWinPlusAction,
  betDivideAction,
  betMinusAction,
  betMultiplyAction,
  betPlusAction,
  playAction,
} from '../../../state/reducers/ReducerAction'
import PayoutOnWin from '../../elements/PayoutOnWin'
import PlayButton from '../../elements/desktop/PlayButton'
import BetMaxButton from '../../elements/BetMaxButton'
import AutobetList from '../../elements/mobile/AutobetList'
import { TripleSelectButton } from '../../elements/TripleSelectButton'
import { NumberInput } from '../../elements/NumberInput'

import { AutobetCounts, AutobetMode } from '../../../types/AutobetTypes'

enum TabType {
  Manual = 'manual',
  Auto = 'auto',
}

class BettingContainer extends Component<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: TabType.Manual,
    }
  }

  render() {
    const {
      x,
      y,
      width,
      height,
      autobetOnOff,
      autobetCounter,
      autobetOnWin,
      autobetOnWinMode,
      autobetOnLose,
      autobetOnLoseMode,
      autobetStopOnWin,
      autobetStopOnLose,
    } = this.props
    const { currentTab } = this.state

    const isAutobetRunning = autobetOnOff && autobetCounter > -1

    const margin = 15
    const totalWidth = width - margin * 2

    const buttonHeight = 64
    const changeBetButtonSize = 40
    const changeButtonMargin = 5

    const betAmountY = 60
    const betAmountWidth =
      totalWidth - (changeBetButtonSize + changeButtonMargin) * 4

    const payoutOnWinY = 120
    const payoutOnWinWidth = totalWidth

    const playButtonY = payoutOnWinY + 60
    const playButtonWidth =
      betAmountWidth + (changeBetButtonSize + changeButtonMargin) * 1.5

    const payoutOnWinValue = 0
    const betAmountValue = 0

    const tabHeight = 45

    return (
      <UIContainer x={x} y={y}>
        <UIRectangle width={width} height={height} fill={0x1b1b46} />
        <UITabContainer
          defaultTab={0}
          interactive={!isAutobetRunning}
          onSelect={type => {
            if (!isAutobetRunning) {
              autobetOnOffAction(type === TabType.Auto)
              this.setState({ currentTab: type })
            }
          }}>
          <UITab key={TabType.Manual} selected={currentTab === TabType.Manual}>
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

          <UITab
            key={TabType.Auto}
            selected={currentTab === TabType.Auto}
            onSelect={type => {
              autobetOnOffAction(true)
              this.setState({ currentTab: type })
            }}>
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

          <UITabContent x={margin} y={tabHeight + 35}>
            <UIScrollContainer
              mask={{
                x: 0,
                y: y + tabHeight,
                width: width,
                height: height - tabHeight,
              }}>
              <UIRectangle
                y={0}
                width={totalWidth}
                height={775}
                fill={0x1b1b46}
              />
              <RollList maxRolls={5} />
              <PlayButton
                y={35}
                width={totalWidth}
                height={buttonHeight}
                pointerdown={() =>
                  isAutobetRunning ? autobetStopAction() : playAction()
                }
              />
              <BetAmount
                y={140}
                width={totalWidth}
                height={changeBetButtonSize}
                value={betAmountValue}
              />
              <UIText
                y={220}
                anchor={{ x: 0, y: 1 }}
                alpha={0.4}
                text={tr('autobetCount')}
                style={{
                  fill: 0xffffff,
                  fontFamily: 'Rajdhani-fnt',
                  fontSize: 16,
                  align: UITextAlign.Left,
                }}
              />
              <AutobetList width={totalWidth} y={250} counts={AutobetCounts} />
              <UIText
                y={315}
                key={'onWinLabel'}
                anchor={{ x: 0, y: 1 }}
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
                y={330}
                key={'onWinButton'}
                width={totalWidth}
                height={36}
                index={Object.values(AutobetMode).indexOf(autobetOnWinMode)}
                disabled={isAutobetRunning}
                onChange={index => autobetOnWinModeAction(Object.values(AutobetMode)[index])}
              />
              <NumberInput
                y={385}
                width={
                  totalWidth - (changeBetButtonSize + changeButtonMargin) * 2
                }
                height={changeBetButtonSize}
                text={autobetOnWin}
                min={0}
                max={100}
                disabled={true}
                onBlur={value => autobetOnWinInputAction(value)}
              />
              <ChangeBetButton
                x={
                  totalWidth -
                  (changeBetButtonSize + changeButtonMargin) * 2 +
                  5
                }
                y={385}
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('minusBetButton')}
                pointerdown={() => autobetOnWinMinusAction()}
              />
              <ChangeBetButton
                x={
                  totalWidth -
                  (changeBetButtonSize + changeButtonMargin) * 2 +
                  5 +
                  changeBetButtonSize +
                  5
                }
                y={385}
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('plusBetButton')}
                pointerdown={() => autobetOnWinPlusAction()}
              />

              <UIText
                y={455}
                key={'onLoseLabel'}
                anchor={{ x: 0, y: 1 }}
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
                y={470}
                key={'onLoseButton'}
                width={totalWidth}
                height={36}
                index={Object.values(AutobetMode).indexOf(autobetOnLoseMode)}
                disabled={isAutobetRunning}
                onChange={index => autobetOnLoseModeAction(Object.values(AutobetMode)[index])}
              />
              <NumberInput
                y={525}
                width={
                  totalWidth - (changeBetButtonSize + changeButtonMargin) * 2
                }
                height={changeBetButtonSize}
                text={autobetOnLose}
                min={0}
                max={100}
                disabled={true}
                onBlur={value => autobetOnLoseInputAction(value)}
              />
              <ChangeBetButton
                x={
                  totalWidth -
                  (changeBetButtonSize + changeButtonMargin) * 2 +
                  5
                }
                y={525}
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('minusBetButton')}
                pointerdown={() => autobetOnLoseMinusAction()}
              />
              <ChangeBetButton
                x={
                  totalWidth -
                  (changeBetButtonSize + changeButtonMargin) * 2 +
                  5 +
                  changeBetButtonSize +
                  5
                }
                y={525}
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('plusBetButton')}
                pointerdown={() => autobetOnLosePlusAction()}
              />

              <UIText
                y={580}
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
              <NumberInput
                y={605}
                width={
                  totalWidth - (changeBetButtonSize + changeButtonMargin) * 2
                }
                height={changeBetButtonSize}
                text={autobetStopOnWin}
                min={0}
                max={100}
                disabled={true}
                onBlur={value => autobetStopOnWinInputAction(value)}
              />
              <ChangeBetButton
                x={
                  totalWidth -
                  (changeBetButtonSize + changeButtonMargin) * 2 +
                  5
                }
                y={605}
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('minusBetButton')}
                pointerdown={() => autobetStopOnWinMinusAction()}
              />
              <ChangeBetButton
                x={
                  totalWidth -
                  (changeBetButtonSize + changeButtonMargin) * 2 +
                  5 +
                  changeBetButtonSize +
                  5
                }
                y={605}
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('plusBetButton')}
                pointerdown={() => autobetStopOnWinPlusAction()}
              />

              <UIText
                y={660}
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
              <NumberInput
                y={685}
                width={
                  totalWidth - (changeBetButtonSize + changeButtonMargin) * 2
                }
                height={changeBetButtonSize}
                text={autobetStopOnLose}
                min={0}
                max={100}
                disabled={true}
                onBlur={value => autobetStopOnLoseInputAction(value)}
              />
              <ChangeBetButton
                x={
                  totalWidth -
                  (changeBetButtonSize + changeButtonMargin) * 2 +
                  5
                }
                y={685}
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('minusBetButton')}
                pointerdown={() => autobetStopOnLoseMinusAction()}
              />
              <ChangeBetButton
                x={
                  totalWidth -
                  (changeBetButtonSize + changeButtonMargin) * 2 +
                  5 +
                  changeBetButtonSize +
                  5
                }
                y={685}
                width={changeBetButtonSize}
                height={changeBetButtonSize}
                text={tr('plusBetButton')}
                pointerdown={() => autobetStopOnLosePlusAction()}
              />
            </UIScrollContainer>
          </UITabContent>
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
  const {
    autobetOnOff,
    autobetCounter,
    autobetOnWin,
    autobetOnWinMode,
    autobetOnLose,
    autobetOnLoseMode,
    autobetStopOnWin,
    autobetStopOnLose,
  } = state

  return {
    autobetOnOff,
    autobetCounter,
    autobetOnWin,
    autobetOnWinMode,
    autobetOnLose,
    autobetOnLoseMode,
    autobetStopOnWin,
    autobetStopOnLose,
  }
}

export default connect(mapState, null)(BettingContainer)
