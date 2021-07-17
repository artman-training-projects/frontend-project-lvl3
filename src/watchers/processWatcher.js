import { formProcessState } from '../constants';

export default function processWatcher(containers, watchedState) {
  const { formInput, submitButton } = containers;
  switch (watchedState.rssForm.processState) {
    case formProcessState.FAILED:
      watchedState.rssForm.processState = formProcessState.FILLING;
      break;

    case formProcessState.FILLING:
      break;

    case formProcessState.SENDING:
      formInput.setAttribute('readonly', 'true');
      submitButton.setAttribute('disabled', 'true');
      break;

    case formProcessState.FINISHED:
      formInput.removeAttribute('readonly');
      submitButton.removeAttribute('disabled');
      watchedState.rssForm.processState = formProcessState.FILLING;
      break;

    default:
      throw new Error(`Unknown state: ${watchedState}`);
  }
}
