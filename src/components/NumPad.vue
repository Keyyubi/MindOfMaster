<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8 numPad-container">
        <div class="guess-container">{{guessVal}}</div>
        <ul class="numPad">
          <li @click="numberClick(1)" class="num-btn">1</li>
          <li @click="numberClick(2)" class="num-btn mid">2</li>
          <li @click="numberClick(3)" class="num-btn">3</li>
        </ul>
        <ul class="numPad">
          <li @click="numberClick(4)" class="num-btn">4</li>
          <li @click="numberClick(5)" class="num-btn mid">5</li>
          <li @click="numberClick(6)" class="num-btn">6</li>
        </ul>
        <ul class="numPad">
          <li @click="numberClick(7)" class="num-btn">7</li>
          <li @click="numberClick(8)" class="num-btn mid">8</li>
          <li @click="numberClick(9)" class="num-btn">9</li>
        </ul>
        <ul class="numPad">
          <li @click="numberClick(11)" class="num-btn brd-bl btn-ok">
            <i class="fas fa-check"></i>
          </li>
          <li @click="numberClick(0)" class="num-btn mid">0</li>
          <li @click="numberClick(-1)" class="num-btn brd-br btn-cancel">
            <i class="fas fa-times"></i>
          </li>
        </ul>
        <div class="info-text" :class="getClass()">{{infoText}}</div>
      </div>
      <div class="col-3 guess-history">
        <h3>Guesses Made</h3>
        <hr>

        <div class="row text-muted" v-for="(item,key) in history" :key="key">
          <div class="col-6">
            <strong>Guess:</strong>
            {{item.guess}}
          </div>
          <div class="col-6">
            <strong>Result:</strong>
            {{item.result}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guessVal: "",
      initVal: "",
      history: [],
      error: false,
      infoText: ""
    };
  },
  methods: {
    // Determines a random 4 digits number
    Init() {
      let arr = [];
      let str = "";

      for (let i = 0; i < 4; ) {
        let a = Math.floor(Math.random() * 10);
        if (!arr.includes(a) && a !== 0) {
          arr.push(a);
          str += a;
          i++;
        }
      }

      this.initVal = str;
    },

    // For comparing all digits to see
    // if all digits diffirent from each other or not
    // returns true if number is valid, otherwise returns false (not valid)
    checkDigits(strDigit) {
      if (strDigit.length < 2) return true;

      var arr = strDigit.split("");
      for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        if (i < 4) {
          let newArr = arr.slice(i + 1);
          for (let k = 0; k < newArr.length; k++) {
            if (val === newArr[k]) return false;
          }
        }
      }
      return true;
    },

    // Comparing users guess and the target number
    checkGuess(guessVal) {
      var guessArr = ("" + guessVal).split("");
      var initArr = ("" + this.initVal).split("");
      var _100correct = 0;
      var _50correct = 0;
      for (let i = 0; i < initArr.length; i++) {
        if (initArr.includes(guessArr[i]))
          if (guessArr[i] === initArr[i]) _100correct++;
          else _50correct--;
      }
      if (_100correct === 4) return "+4";
      else if (_50correct === -4) return "" + _50correct;
      else if (!_100correct && !_50correct) return "0";
      else return "+" + _100correct + " / " + _50correct;
    },

    numberClick(number) {
      this.error = false;
      this.infoText = "";
      switch (number) {
        // Cancel butonu
        case -1:
          this.guessVal = "";
          break;
        // Tahmin butonu
        case 11:
          if (this.guessVal.length !== 4) {
            if (this.guessVal.length === 0) {
              this.error = true;
              this.infoText = "Bisey girmedinki :(";
            } else {
              this.error = true;
              this.infoText = "4 basamakli sayi gir 4! 4!";
            }
            return;
          }
          this.infoText = this.checkGuess(this.guessVal);
          this.history.push({
            guess: this.guessVal,
            result: this.infoText
          });
          this.guessVal = '';
          break;
        // NumPad Sayi butonlari
        default:
          if (this.guessVal.length === 4 || this.guessVal.length === 0) {
            if (number === 0) {
              this.errorText = "0 ile baslanmaz";
              return;
            } else {
              this.guessVal = "";
            }
          }
          var newVal = this.guessVal + number;
          if (this.checkDigits(newVal)) {
            this.guessVal = newVal;
          } else {
            this.error = true;
            this.infoText = "Rakamlar farkli olsun pliz";
          }
          break;
      }
    },

    fromKeyboard(e) {
      switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
          this.numberClick(Number(e.key));
          break;
        case "Enter":
          this.numberClick(11);
          break;
        case "Escape":
        case " ":
          this.numberClick(-1);
          break;
      }
    },

    // Styling info text according to error
    getClass() {
      return this.error ? "text-danger" : "text-info";
    }
  },

  created() {
    this.Init();
    window.addEventListener("keydown", e => {
      this.fromKeyboard(e);
    });
  }
};
</script>

<style lang="scss">
.numPad-container {
  width: auto;
  height: auto;
  // margin: 0 auto;
  position: relative;

  .numPad {
    display: flex;
    padding: 0;
    margin: 0;
    border-bottom: #fff 1px solid;
    justify-content: center;

    .num-btn {
      background-color: hsl(0, 0%, 95%);
      width: 8vw;
      height: 8vw;
      border-radius: 50%;
      list-style-type: none;
      text-align: center;
      line-height: 8vw;
      font-size: 2rem;
      font-weight: 400;
      cursor: pointer;

      &:active {
        background-color: rgb(236, 236, 236);
      }
    }

    .btn-ok {
      color: hsl(125, 98%, 23%);
    }

    .btn-cancel {
      color: hsl(0, 79%, 37%);
    }

    .mid {
      border-left: #fff 1px solid;
      border-right: #fff 1px solid;
    }
  }

  .guess-container {
    width: 98%;
    min-height: 15vh;
    height: auto;
    padding: 10px 0;
    margin: 1vh auto;
    text-align: center;
    font-size: 4rem;
    border-radius: 5px;
  }
}

.guess-history {
  .history {
    li {
      list-style-type: none;
    }
  }
}

/* top-left border radius */
.brd-tl {
  border-top-left-radius: 3px;
}

/* top-right border radius */
.brd-tr {
  border-top-right-radius: 3px;
}

/* bottom-left border radius */
.brd-bl {
  border-bottom-left-radius: 3px;
}

/* bottom-right border radius */
.brd-br {
  border-bottom-right-radius: 3px;
}
</style>
