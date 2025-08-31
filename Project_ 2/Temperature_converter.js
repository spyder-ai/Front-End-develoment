const myinput = document.getElementById("myinput");
const celcius = document.getElementById("celcius");
const fahrenheit = document.getElementById("fahrenheit");
const mysubmit = document.getElementById("mysubmit");
const converted = document.getElementById("converted");

mysubmit.onclick = function(){
    let val = myinput.value;
    
    if (val === "" || isNaN(val)) {  // check if empty or not a number
        converted.textContent = `bruh' its not a valid number!`;
        return;
    }

    val = Number(val);
    let temp;

    if(celcius.checked){
        temp = (9 / 5) * val + 32;
        converted.textContent = `${temp.toFixed(2)} deg F`;
    }
    else if(fahrenheit.checked){
        temp = (5 / 9) * (val - 32);
        converted.textContent = `${temp.toFixed(2)} deg C`;
    }
    else{
        converted.textContent = `${val} value is not a valid number, please try again.`
    }
}
