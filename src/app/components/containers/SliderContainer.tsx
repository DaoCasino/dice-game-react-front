import React, { Component } from 'react'

import { UIContainer } from 'dc-react-gamengine'
import { RollOver } from '../elements/RollOver'
import { Payout } from '../elements/Payout'
import { WinChance } from '../elements/WinChance'
import { Slider } from '../elements/Slider'
import { connect } from 'react-redux'

class SliderContainer extends Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render(): JSX.Element {
    const { x, y, width, height, probability } = this.props

    const margin = 14
    const totalWidth = width - margin * 3.5

    const sliderWidth = totalWidth

    const yIndicatorsPercent = 55
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
          value={probability}
          steps={5}
          showSteps={true}
          stepping={true}
          onChangeValue={value => console.log(value)}
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

const mapState = state => {
  return {
    probability: state.probability,
  }
}

export default connect(mapState, null)(SliderContainer)
