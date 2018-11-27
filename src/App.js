import React from "react";

const apiAddress = "http://localhost:3000/languages";

class App extends React.Component {
  state = {
    dictionaries: [],
    selectedLanguage: 0,
    textToTranslate: "",
    loaded: false
  };

  componentDidMount() {
    fetch(apiAddress)
      .then(r => r.json())
      .then(d => this.setState({ dictionaries: d, loaded: true }));
  }

  handleLanguageSelection = languageIndex => {
    this.setState({ selectedLanguage: languageIndex });
  };

  handletextToTranslateUpate = event => {
    this.setState({ textToTranslate: event.target.value });
  };

  translatedText() {
    return this.state.textToTranslate
      .split(" ")
      .map(wordToTraslate => {
        console.log("Word to translate is: ", wordToTraslate);
        if (this.state.loaded) {
          const { dictionaries, selectedLanguage } = this.state;
          const dictionaryObj = dictionaries[selectedLanguage];
          const dictionary = dictionaryObj.data;
          const word = dictionary.find(
            dictionaryWord => Object.keys(dictionaryWord)[0] === wordToTraslate
          );
          if (word) {
            console.log("Translation word is ", Object.values(word)[0]);
            return Object.values(word)[0];
          } else {
            return wordToTraslate;
          }
        } else {
          return "Still loading data";
        }
      })
      .join(" ");
  }

  render() {
    const { dictionaries, textToTranslate } = this.state;
    return (
      <>
        Select a language:{" "}
        {dictionaries.map((l, i) => (
          <span onClick={() => this.handleLanguageSelection(i)} key={l.name}>
            {" "}
            {l === dictionaries[this.state.selectedLanguage] ? (
              <strong>{l.name}</strong>
            ) : (
              l.name
            )}
          </span>
        ))}
        <p>Text to translate:</p>{" "}
        <input
          onChange={this.handletextToTranslateUpate}
          type="text"
          value={textToTranslate}
        />
        <p>Translated text:</p>{" "}
        <input type="text" value={this.translatedText()} />
      </>
    );
  }
}

export default App;
