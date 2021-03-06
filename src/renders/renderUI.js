import renderFeeds from './renderFeeds';
import renderPosts from './renderPosts';

export default function renderUI(containers, i18nextInstance, watchedState) {
  const {
    title,
    subTitle,
    languageSelect,
    formInput,
    formLabel,
    submitButton,
    exampleMessage,
    feedbackMessage,
    feedsContainer,
    postsContainer,
  } = containers;

  const { error } = watchedState.rssForm;

  languageSelect.textContent = '';
  i18nextInstance.languages.sort().forEach((language, index) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('class', 'btn-check');
    input.setAttribute('name', 'btnradio');
    input.setAttribute('data-language', language);
    input.setAttribute('id', `btnradio${index}`);
    if (i18nextInstance.language === language) {
      input.setAttribute('checked', 'checked');
    }

    const label = document.createElement('label');
    label.setAttribute('class', 'btn btn-outline-primary');
    label.setAttribute('for', `btnradio${index}`);
    label.textContent = language;

    languageSelect.append(input);
    languageSelect.append(label);
  });

  formInput.setAttribute('placeholder', i18nextInstance.t('form.placeholder'));
  formLabel.textContent = i18nextInstance.t('form.placeholder');
  title.textContent = i18nextInstance.t('title');
  subTitle.textContent = i18nextInstance.t('subTitle');
  submitButton.textContent = i18nextInstance.t('buttons.add');
  exampleMessage.textContent = i18nextInstance.t('form.example');

  feedbackMessage.textContent = feedbackMessage.textContent
    && i18nextInstance.t(error ? `errors.${error}` : 'success');

  renderFeeds(feedsContainer, i18nextInstance, watchedState);
  renderPosts(postsContainer, i18nextInstance, watchedState);
}
