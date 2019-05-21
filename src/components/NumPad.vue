<template>
  <div class="numPad-container">
    <div>
      <input type="text" max="9876" min="1234" class="inp-guess brd-tl brd-tr" :value="initVal">
    </div>
    <ul class="numPad">
      <li class="num-btn">1</li>
      <li class="num-btn mid">2</li>
      <li class="num-btn">3</li>
    </ul>
    <ul class="numPad">
      <li class="num-btn">4</li>
      <li class="num-btn mid">5</li>
      <li class="num-btn">6</li>
    </ul>
    <ul class="numPad">
      <li class="num-btn">7</li>
      <li class="num-btn mid">8</li>
      <li class="num-btn">9</li>
    </ul>
    <ul class="numPad">
      <li class="num-btn brd-bl">OK</li>
      <li class="num-btn mid">0</li>
      <li class="num-btn brd-br">X</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guessVal: "",
      initVal: ""
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
    checkDigits(integer) {
      var arr = ("" + integer).split("");
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
    }
  },

  created() {
    this.Init();
  }
};
</script>

<style lang="scss">
.numPad-container {
  width: 30vw;
  height: auto;
  margin: 5vh auto;
}
.numPad {
  display: flex;
  padding: 0;
  margin: 0;
  border-bottom: #fff 1px solid;
}
.num-btn {
  background-color: #ccc;
  width: 10vw;
  height: 10vw;
  list-style-type: none;
  text-align: center;
  line-height: 10vw;
  cursor: pointer;
}

.num-btn:active {
  background-color: rgb(236, 236, 236);
}

.numPad .mid {
  border-left: #fff 1px solid;
  border-right: #fff 1px solid;
}

.inp-guess {
  width: 98%;
  height: 6vw;
  padding: 10px 0;
  margin: 0 auto;
  text-align: center;
  font-size: 2.3rem;
  border: 1px solid #ccc;
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
