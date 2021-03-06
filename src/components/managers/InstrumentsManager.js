import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Tone from 'tone'

import ScoreInstrumentItem from '../items/ScoreInstrumentItem'
import scoreInstrumentsSelector from '../../selectors/scoreInstruments'

class InstrumentsManager extends Component {

  onLoopClick = () => {
    Tone.Sequencer.loop()
  }

  onStartStopClick = () => {
    Tone.Transport.state === "started"
      ? Tone.Sequencer.stop()
      : Tone.Sequencer.start()
  }

  componentDidMount () {
    Tone.Sequencer.connect("manager", action => {
      switch (action) {
        case "tracks-setup":
        case "start":
        case "stop":
          this.forceUpdate()
          break
        default:
          return
      }
    })
  }

  render () {

    const {
      scoreInstruments
    } = this.props

    return (
      <div>
        {Tone.Sequencer.isTracksSetup && (
          <div>
            <button className='button is-primary' onClick={this.onStartStopClick}>
              {
                Tone.Transport.state === "started"
                  ? 'STOP'
                  : 'START'
              }
            </button>
            <button className='button is-primary' onClick={this.onLoopClick}>
              {
                Tone.Transport.loop
                  ? 'LOOP OFF'
                  : 'LOOP ON'
              }
            </button>
          </div>
        )}
        {scoreInstruments.map(scoreInstrument =>
          <ScoreInstrumentItem
            key={scoreInstrument.id}
            scoreInstrument={scoreInstrument}
          />
        )}
      </div>
    )
  }
}

export default compose(
  withRouter,
  connect(
    (state, ownProps) => {
      const { scoreId } = ownProps.match.params
      return {
        scoreInstruments: scoreInstrumentsSelector(state, scoreId),
      }
    }
  )
)(InstrumentsManager)
