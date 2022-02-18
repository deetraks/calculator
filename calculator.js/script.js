class calculator {
    constructor(previousOperandTextElementButton, currentOperandTextElementButton) {
        this.previousOperandTextElementButton = previousOperandTextElement
        this.currentOperandTextElementButton = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNumber(number) {
        if (number === '.'&& this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.tostring()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case'+':
            computation = prev + current
            break
            case'-':
            computation = prev - current
            break
            case'*':
            computation = prev * current
            break
            case'÷':
            computation = prev / current
            break
            default:
                return 
        }this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }
    getDisplayNumber(number) {
        const stringNumber = number.tostring()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDigits
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else{
            integerDisplay = integerDigits.toLocaleString('en',{
            maximumFractionDigits:0 })
        }
        if (decimalDigits != null){
            return '${integerDisplay}.${decimaldigits}'
        } else{
            return integerDisplay
        }
        
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            '${this.getDisplayNumber(this.previousoperand)} ${this.operation}'
        } else{
            this.previousOperandTextElementButton.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElementButton = document.querySelector('[data-previous-operand]')
const currentOperandTextElementButton = document.querySelector('[data-current-operand]')


const calculator = new calculator(previousOperandTextElement, currentOperandTextElement)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})