import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { getMetricMetaInfo, timeToString } from './../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
        onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}

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
  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    })

    // Update Redux
    // Navigate to Home
    // save to DB
    // Clear local notifications
  }
  render() {
    const metaInfo = getMetricMetaInfo()
    return (
      <View>
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              <DateHeader date={() => new Date().toLocalDateString()} />
              {type === 'slider' ?
                <UdaciSlider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}/> :
                <UdaciSteppers
                  value={value}
                  onIcrement={value => this.increment(key)}
                  onDecrement={value => this.increment(key)}
                  {...rest} />}
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}