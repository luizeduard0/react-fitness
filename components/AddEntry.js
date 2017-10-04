import React, { Component } from 'react'
import { View } from 'react-native'
import { getMetricMetaInfo } from './../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }
  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState(state => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }
  decrement = metric => {
    this.setState(state => {
      const count = state[metric] - getMetricMetaInfo(metric).step
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }
  render() {
    const metaInfo = getMetricMetaInfo()
    return (
      <View>
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const { value } = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              <DateHeader date={() => new Date().toLocalDateString()} />
              {type === 'slider' ?
                <UdaciSlider
                  value={value}
                  onChage={value => this.slide(key, value)}
                  {...rest}/> :
                <UdaciSteppers
                  value={value}
                  onIcrement={value => this.increment(key)}
                  onDecrement={value => this.increment(key)}
                  {...rest} />}
            </View>
          )
        })}
      </View>
    )
  }
}
