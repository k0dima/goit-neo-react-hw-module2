import { useEffect, useState } from 'react';
import Description from './components/Description/Description.jsx';
import Feedback from './components/Feedback/Feedback.jsx';
import Notification from './components/Notification/Notification.jsx';
import Options from './components/Options/Options.jsx';
import css from './App.module.css';

const FEEDBACK_STORAGE_KEY = 'sip-happens-feedback';
const INITIAL_FEEDBACK = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function getInitialFeedback() {
  const savedFeedback = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);

  if (savedFeedback === null) {
    return INITIAL_FEEDBACK;
  }

  try {
    const parsedFeedback = JSON.parse(savedFeedback);
    const hasValidFeedback = ['good', 'neutral', 'bad'].every(
      key => Number.isInteger(parsedFeedback[key]) && parsedFeedback[key] >= 0
    );

    return hasValidFeedback ? parsedFeedback : INITIAL_FEEDBACK;
  } catch {
    return INITIAL_FEEDBACK;
  }
}

function App() {
  const [feedback, setFeedback] = useState(getInitialFeedback);

  const { good, neutral, bad } = feedback;
  const totalFeedback = good + neutral + bad;
  const positiveFeedback =
    totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;

  useEffect(() => {
    window.localStorage.setItem(
      FEEDBACK_STORAGE_KEY,
      JSON.stringify(feedback)
    );
  }, [feedback]);

  const updateFeedback = feedbackType => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback(INITIAL_FEEDBACK);
  };

  return (
    <div className={css.container}>
      <Description />
      <Options
        totalFeedback={totalFeedback}
        onUpdate={updateFeedback}
        onReset={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}

export default App;
