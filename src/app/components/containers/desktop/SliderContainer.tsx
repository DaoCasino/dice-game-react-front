import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UIContainer } from '@daocasino/dc-react-gamengine'
import RollOver from '../../elements/RollOver'
import Payout from '../../elements/Payout'
import WinChance from '../../elements/WinChance'
import { Slider } from '../../elements/Slider'

import { setChanceAction } from '../../../reducers/ReducerAction'

class SliderContainer extends Component<any, any> {
  render(): JSX.Element {
    const { x, y, width, height, chance, setChanceAction } = this.props

    const margin = 14
    const totalWidth = width// - margin * 3.5

    const sliderWidth = totalWidth

    const yIndicatorsPercent = 65
    const yIndicators = height * yIndicatorsPercent / 100

    return (
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
    )
  }
}

const mapState = (state) => {
  const { chance } = state

  return {
    chance,
    setChanceAction,
  }
}

export default connect(mapState, null)(SliderContainer)
