import { useState, useEffect } from 'react';
import { Box, Button, FormControlLabel, LinearProgress, Switch } from '@mui/material'
import Exercise from '../core/exercise';
import './progress-bar-exercise.scss'

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/futurestay/frontend-challenges/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [finishRequest, setFinishRequest] = useState(false)
  // toggle for enabling breakpoints
  const [checked, setChecked] = useState(false)

  const breakpointsArr = [10, 25, 30, 65, 85]

  // convert breakpoints array into an object
  const formatBreakpoints = (arr) => {
    let obj = {}
    for (let i = 0; i < arr.length - 1; i++) {
      obj[arr[i]] = arr[i]
    }
    return obj
  }

  const breakpointsObj = formatBreakpoints(breakpointsArr)

  useEffect(() => {
    // checks to see if breakpoints are enabled and if the progress bar is at a breakpoint
    if (checked && progress === breakpointsObj[progress]) {
      setTimeout(() => { console.log('Set 1 second delay') }, 1000)
    }
  }, [checked, progress, breakpointsObj])

  // reset local states back to default values
  const handleReset = () => {
    setProgress(0)
    setFinishRequest(false)
  }

  const handleProgressBar = () => {
    // reset if start request button is clicked after finishing a request
    if (finishRequest) {
      handleReset()
    }

    setIsLoading(true)
    setInterval(() => {
      setProgress((prevValue) => {
        // increment 5% every half second
        return Math.min(prevValue + 5, 90)
      })
    }, 500)
  }

  const handleFinishRequest = () => {
    setIsLoading(false)
    setFinishRequest(true)
  }

  const handleSwitch = (event) => {
    setChecked(event.target.checked)
  }

  const renderProgressBar = () => {
    if (isLoading || finishRequest) {
      return (
        <Box className={finishRequest ? 'fade-out' : null} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ width: "50%" }}>
            <LinearProgress variant="determinate" value={finishRequest ? 100 : progress} />
          </Box>
          <Box data-testid="progress-bar-label" sx={{ marginLeft: "15px" }}>
            {finishRequest ? "100%" : `${progress.toFixed(0)}%`}
          </Box>
        </Box>
      )
    }
    return
  }

  return (
    <div>
      {renderProgressBar()}
      <Box sx={{ display: "flex", justifyContent: "center" }} >
        <Button variant="outlined" onClick={() => handleProgressBar()}>
          {isLoading ? "Loading..." : "Start Request"}
        </Button>
        <Button variant="outlined" color="secondary" disabled={!isLoading} onClick={() => handleFinishRequest()}>
          Finish Request
        </Button>
        <FormControlLabel control={<Switch checked={checked} onChange={handleSwitch} />} label="Breakpoints" />
      </Box>
    </div>
  );
};
