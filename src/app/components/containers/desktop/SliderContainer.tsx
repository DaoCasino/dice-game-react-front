import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UIContainer } from '@daocasino/dc-react-gamengine'
import RollOver from '../../elements/RollOver'
import Payout from '../../elements/Payout'
import WinChance from '../../elements/WinChance'
import Slider from '../../elements/Slider'

import { setChanceAction } from '../../../reducers/ReducerAction'
import SoundOnOffButton from '../../elements/SoundOnOffButton'

class SliderContainer extends Component<any, any> {
  render(): JSX.Element {
    const { x, y, width, height, chance, soundOnOff } = this.props

    const totalWidth = width

    const sliderWidth = totalWidth

    const yIndicatorsPercent = 65
    const yIndicators = height * yIndicatorsPercent / 100

    return (
      <UIContainer interactive={true} buttonMode={false}>
        <SoundOnOffButton x={10} y={10} />
        <UIContainer x={x} y={y}>
          <Slider
            x={0}
            y={90}
            width={sliderWidth}
            height={26}
            min={1}
            max={99}
            value={chance}
            steps={5}
            showSteps={true}
            stepping={true}
            onChangeValue={value => setChanceAction(value)}
          />
          <RollOver
            x={totalWidth * 0.25}
            y={yIndicators}
            value={10}
          />
          <Payout
            x={totalWidth * 0.5}
            y={yIndicators}
            value={10}
          />
          <WinChance
            x={totalWidth * 0.75}
            y={yIndicators}
            value={10}
          />
        </UIContainer>
      </UIContainer>
    )
  }
}

const mapState = (state) => {
  const { chance, soundOnOff } = state

  return {
    chance,
    soundOnOff,
  }
}

export default connect(mapState, null)(SliderContainer)
