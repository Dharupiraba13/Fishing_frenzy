
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

var arr = Array.from(Array(8), () => new Array(9));
/*color codes to display different levels of warnings*/
const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};
var itr=1;
var round=1;
const TIME_LIMIT = 5;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

/*clock circle */
document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

/*On timeup check if no of rounds<8 */
function onTimesUp() {
    clearInterval(timerInterval);
    timePassed = 0;
    timeLeft = TIME_LIMIT;
    timerInterval = null;
    if(round<=8){

    checklevel();
    
    }
}

/*reload window on restart */
function reload(){
    window.location.reload();
}

/*check each round and each team and add values to table */
function checklevel(){
    if(itr==1){
        arr[round-1][itr]=document.getElementById("input").value;
        document.getElementById("team").innerText="B";
        startTimer();
    }
    else if(itr==2){
        arr[round-1][itr]=document.getElementById("input").value;
        document.getElementById("team").innerText="C";
        startTimer();
    }
    else if(itr==3){
        arr[round-1][itr]=document.getElementById("input").value;
        document.getElementById("team").innerText="D";
        startTimer();
    }
    else if(itr==4){   
        arr[round-1][itr]=document.getElementById("input").value;
        displaytable(arr,round-1);
        if(round==8){
            document.getElementById("main").style.display="none";
            document.getElementById("app").style.display="none";
            itr=-1
            var res=[0,0,0,0];
            console.log(arr[0]);
            for (let i = 0; i < 8; i++) {
              res[0]=res[0]+parseInt(arr[i][5]);
              res[1]+=parseInt(arr[i][6]);
              res[2]+=parseInt(arr[i][7]);
              res[3]+=parseInt(arr[i][8]);
            }
            namearr=['A','B','C','D']
            var max_of_array = Math.max.apply(Math, res);
            var winner = res.indexOf(max_of_array);
            var table = document.getElementById("result");
    var row = table.insertRow(round+1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);
    var cell7 = row.insertCell(7);
    var cell8 = row.insertCell(8);
    cell0.innerHTML ='';
    cell1.innerHTML ='';
    cell2.innerHTML ='';
    cell3.innerHTML ='';
    cell4.innerHTML ='';
    cell5.innerHTML =res[0];
    cell6.innerHTML =res[1];
    cell7.innerHTML =res[2];
    cell8.innerHTML =res[3];
            document.getElementById("final").innerHTML="<br><h3>The Winner is Team "+namearr[winner]+"</h3>"
          }
        itr=0
        round=round+1;
        document.getElementById("round").innerHTML=round;
        document.getElementById("team").innerText="A";
        startTimer();  
    }
    itr=itr+1;
}

/*display table */
function displaytable(array,round){
    document.getElementById("table").style.display="block";
    var total=0;
    var one=0,two=0;
    for (let i = 1; i < 5; i++) {
        var temp=parseInt(array[round][i]);
        total=total+temp;
        if(temp==1){
            one+=1;
        }
        else{
            two+=1;
        }
    }
    /*compute profit/loss based on fishes captured*/ 
    array[round][0]=total;
    var one_val,two_val;
    switch (one) {
        case 0:
            one_val="0";
            two_val="-25";
            break;
        case 1:
            one_val="-25";
            two_val="25";
            break;
        case 2:
            one_val="-12.5";
            two_val="50";
            break;
        case 3:
            one_val="0";
            two_val="75";
            break;
        case 4:
            one_val="25";
            two_val="0";
            break;
    }
    for (let i = 1; i < 5; i++) {
        var temp=parseInt(array[round][i]);
        if(temp==1){
            array[round][i+4]=one_val ;
        }
        else{
            array[round][i+4]=two_val;
        }
    }
    var table = document.getElementById("result");
    var row = table.insertRow(round+1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);
    var cell7 = row.insertCell(7);
    var cell8 = row.insertCell(8);
    cell0.innerHTML =array[round][0];
    cell1.innerHTML =array[round][1];
    cell2.innerHTML =array[round][2];
    cell3.innerHTML =array[round][3];
    cell4.innerHTML =array[round][4];
    cell5.innerHTML =array[round][5];
    cell6.innerHTML =array[round][6];
    cell7.innerHTML =array[round][7];
    cell8.innerHTML =array[round][8];
}
/*start timer */
function startTimer() {
    if(round>=9){
      return '';
    }
    document.getElementById("start").style.display="none";
    timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

/*time conversion */
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}


function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}