/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    let wordChain = {}

    for (let i = 0; i < this.words.length; i++) {
      let nextWord = this.words[i + 1];
      if (this.words[i] in wordChain) {

        let newArr = [...wordChain[this.words[i]], nextWord];

        wordChain[this.words[i]] = newArr;
      }
      else {
        wordChain[this.words[i]] = [nextWord];
      }
    }
    this.wordChain = wordChain;
  }


  /** return random text from chains */

  static choice(arr) {
    console.log(arr)
    let randomIndx = Math.floor(Math.random() * arr.length);
    return arr[randomIndx];
  }


  makeText(numWords = 100) {
    // TODO
    let keys = Object.keys(this.wordChain);
    let nextWord = MarkovMachine.choice(keys);
    let out = [];
    while (out.length < numWords && nextWord != null) {
      let chain = this.wordChain[nextWord];
      nextWord = MarkovMachine.choice(chain);
      if (nextWord != null) {
        out.push(nextWord);
      }
    }
    return out.join(" ");
  }
}

let mm = new MarkovMachine("the cat in the hat");

mm.makeText();
