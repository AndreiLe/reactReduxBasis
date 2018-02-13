import React from 'react'
import { setActiveLanguage, getLanguages } from 'react-localize-redux';
import {connect} from 'react-redux'

const LanguageSelector = ({ languages, setActiveLanguage }) => (
  <ul>
    { languages.map(language => 
      <li key={language.code}><button onClick={ () => setActiveLanguage(language.code) }>{ language.name }</button></li>
    )}
  </ul>
)

const mapStateToProps = state => ({ languages: getLanguages(state.locale) });
const mapDispatchToProps = { setActiveLanguage };

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);