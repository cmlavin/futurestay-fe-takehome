import { act, fireEvent, render, screen } from '@testing-library/react';
import Solution from './progress-bar-exercise';

describe("Request buttons", () => {
  test('Clicking Start Request button changes button text to Loading...', () => {
    render(<Solution />)
    const startReqButton = screen.getByText('Start Request')
    fireEvent.click(startReqButton)
    expect(startReqButton).toHaveTextContent('Loading...')
  });

  test('Clicking Start Request button enables Finish Request button', () => {
    render(<Solution />)
    const startReqButton = screen.getByText('Start Request')
    const finishReqButton = screen.getByText('Finish Request')
    fireEvent.click(startReqButton)
    expect(finishReqButton).toBeEnabled()
  });
})

describe("Render progress bar", () => {
  test('Clicking Start Request button renders the progress bar', () => {
    render(<Solution />)
    const startReqButton = screen.getByText('Start Request')
    fireEvent.click(startReqButton)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  });
})

describe("Progress bar animation", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  test('Progress bar increments by 6% over 15 seconds', () => {
    render(<Solution />)
    const startReqButton = screen.getByText('Start Request')
    fireEvent.click(startReqButton)
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(screen.getByTestId("progress-bar-label")).toHaveTextContent("12%")
  });
})