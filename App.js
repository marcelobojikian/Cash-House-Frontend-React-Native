import React from 'react';
import Routes from './src/routes';

import 'intl';
import 'intl/locale-data/jsonp/en-IE';
import i18n from 'i18n-js';

i18n.translations = {
  en: require('./language/en.json'),
  pt: require('./language/pt.json'),
};

i18n.locale = 'en'

export default function App() {
  return (
    <Routes />
  );
}
