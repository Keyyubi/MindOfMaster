import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// For comparing all digits to see 
// if all digits diffirent from each other or not
// returns true if number is valid, otherwise returns false (not valid)
function checkDigits(integer) {
    var arr = ("" + integer).split('');
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        if (i < 4) {
            let newArr = arr.slice(i + 1);
            for (let k = 0; k < newArr.length; k++) {
                if (val === newArr[k])
                    return false;
            }
        }
    }
    return true;
}

// Determines a random 4 digits number
function Init() {
    let arr = [];
    let str = '';

    for (let i = 0; i < 4; i++) {
        let a = Math.floor(Math.random() * 10);
        if (!arr.includes(a)) {
            arr.push(a);
            str += a;
        }
    }
    return str;
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetNumber: Init(),
            currentValue: "1234",
        }
    }
    handleClick(val) {
        switch (val) {
            // Cancel butonu
            case -1:
                this.setState({
                    currentValue: "",
                });
                break;
            // Tahmin butonu
            case 10:
                //alert(checkDigits(this.state.currentValue));
                break;
            // NumPad Sayi butonlari
            default:
                let newVal = "";
                if (this.state.currentValue.length === 4)
                {
                    if (val === 0)
                    {
                        alert('0 ile baslanmaz.');
                        return;
                    }
                    newVal = "" + val;
                } else {
                    const newNumber = Number("" + this.state.currentValue + "" + val)
                    if (checkDigits(newNumber))
                        newVal += this.state.currentValue + val;
                    else 
                    {
                        alert("Rakamlar farkli olmali");
                        return;
                    }
                }

                this.setState({
                    currentValue: newVal
                });
                break;
        }
    }
    render() {
        return (
            <NumPad
                guessInput={this.state.currentValue}
                onClick={(i) => this.handleClick(i)}
            />
        )
    }
}

// NumPad Component
class NumPad extends React.Component {
    render() {
        return (
            <div className="numPad-container">
                <div>
                    <input
                        className="inp-guess brd-tl brd-tr"
                        value={this.props.guessInput} />
                </div>
                <ul className="numPad">
                    <li onClick={() => this.props.onClick(1)} className="num-btn">1</li>
                    <li onClick={() => this.props.onClick(2)} className="num-btn mid">2</li>
                    <li onClick={() => this.props.onClick(3)} className="num-btn">3</li>
                </ul>
                <ul className="numPad">
                    <li onClick={() => this.props.onClick(4)} className="num-btn">4</li>
                    <li onClick={() => this.props.onClick(5)} className="num-btn mid">5</li>
                    <li onClick={() => this.props.onClick(6)} className="num-btn">6</li>
                </ul>
                <ul className="numPad">
                    <li onClick={() => this.props.onClick(7)} className="num-btn">7</li>
                    <li onClick={() => this.props.onClick(8)} className="num-btn mid">8</li>
                    <li onClick={() => this.props.onClick(9)} className="num-btn">9</li>
                </ul>
                <ul className="numPad">
                    <li onClick={() => this.props.onClick(10)} className="num-btn brd-bl">OK</li>
                    <li onClick={() => this.props.onClick(0)} className="num-btn mid">0</li>
                    <li onClick={() => this.props.onClick(-1)} className="num-btn brd-br">X</li>
                </ul>
            </div>
        );
    }
}


ReactDOM.render(
    <Game />,
    document.getElementById('root')
);