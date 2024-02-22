import Exercise from '../core/exercise';
import { Button } from '@mui/material'
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
  return (
    <div>
      <Button variant="outlined">
        Start Request
      </Button>
      <Button variant="outlined" color="secondary">
        Finish Request
      </Button>
    </div>
  );
};
