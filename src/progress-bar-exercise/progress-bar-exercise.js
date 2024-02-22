import { useState } from 'react';
import { Box, Button, LinearProgress } from '@mui/material'
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
        // 90 / 15 = 6% of progress per second
        return Math.min(prevValue + 6, 90)
      })
    }, 1000)
  }

  const handleFinishRequest = () => {
    setIsLoading(false)
    setFinishRequest(true)
  }

  const renderProgressBar = () => {
    if (isLoading || finishRequest) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ width: "50%" }}>
            <LinearProgress variant="determinate" value={finishRequest ? 100 : progress} />
          </Box>
          <Box sx={{ marginLeft: "15px" }}>
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
      </Box>
    </div>
  );
};
