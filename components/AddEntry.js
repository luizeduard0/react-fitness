import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { getMetricMetaInfo, timeToString } from './../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from './../utils/api'

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

    submitEntry({ key, entry })

    // Clear local notifications
  }
  reset = () => {
    const key = timeToString()

    // update redux
    // navigate to Home

    removeEntry(key)
  }
  render() {

    if(this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons
            name='ios-happy-outline'
            size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton>Reset</TextButton>
        </View>
      )
    }

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
                  {...rest} /> :
                <UdaciSteppers
                  value={value}
                  onIncrement={value => this.increment(key)}
                  onDecrement={value => this.decrement(key)}
                  {...rest} />}
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}
