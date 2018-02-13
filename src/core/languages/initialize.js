import { initialize } from 'react-localize-redux';
import { addTranslation, addTranslationForLanguage } from 'react-localize-redux';
import store from 'Core/store';
import jsonEN from './en.json';
import jsonRU from './ru.json';

// To set a different default active language set the defaultLanguage option.
const languages = [ 
    { name: 'English', code: 'en' },
    { name: 'Русский', code: 'ru' }
  ];

const missingTranslationMsg = '${key}';
store.dispatch(initialize(languages, { defaultLanguage: 'en', missingTranslationMsg}));

//simulate loading translations
setTimeout(function() {
  store.dispatch(addTranslationForLanguage(jsonEN, 'en'));
}, 3000);
setTimeout(function() {
  store.dispatch(addTranslationForLanguage(jsonRU, 'ru'));
}, 5000);




