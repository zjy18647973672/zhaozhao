// 全局变量
let hour = 0;
let minute = 0;
let second = 0;

// 定时器
let timer; 

// 按钮
let m_start = document.getElementById("start");
let m_stop = document.getElementById("stop");
let m_reset = document.getElementById("reset");

// 初始状态
// 停止按钮不可被点击
m_stop.disabled = true; 
m_stop.style.background = "#6495ED";
m_stop.style.cursor = "not-allowed";
// 重置按钮不可被点击
m_reset.disabled = true; 
m_reset.style.background = "#6495ED";
m_reset.style.cursor = "not-allowed";

// 开始按钮，按下时开始计时
m_start.onclick = function(){
    // 开始按钮不可被重复点击，按钮变色，鼠标指针变化
    m_start.disabled = true;
    m_start.style.background = "#6495ED";
    m_start.style.cursor = "not-allowed";
    // 停止按钮可被点击
    m_stop.disabled = false; 
    m_stop.style.background = "#0000FF";
    m_stop.style.cursor = "pointer";
    // 重置按钮不可被点击
    m_reset.disabled = true;
    m_reset.style.background = "#6495ED";
    m_reset.style.cursor = "not-allowed";
    
    if(!timer){
        // 定时器非空时，开始计时
        timer = setInterval(() => {
            // 每隔1000ms进行一次变化
            second++;
            if(second == 60){
                second = 0;
                minute++;
                if(minute == 60){
                    minute = 0;
                    hour++;
                }
            }
            document.getElementById("hour").textContent = pad(hour);
            document.getElementById("minute").textContent = pad(minute);
            document.getElementById("second").textContent = pad(second);
        }, 1000)
    }
}

// 停止按钮，按下时结束计时器
m_stop.onclick = function(){
    // 开始按钮变为“继续”，可被点击
    m_start.disabled = false; 
    m_start.textContent = "继续";
    m_start.style.background = "#0000FF";
    m_start.style.cursor = "pointer";
    // 停止按钮不可被点击
    m_stop.disabled = true; 
    m_stop.style.background = "#6495ED";
    m_stop.style.cursor = "not-allowed";
    // 重置按钮可被点击
    m_reset.disabled = false; 
    m_reset.style.background = "#0000FF";
    m_reset.style.cursor = "pointer";


    clearInterval(timer); // 清除计时器
    timer = null;
}

// 重置按钮，按下时将各数位清零
m_reset.onclick = function(){
    // 继续按钮变为“开始”
    m_start.textContent = "开始";
    // 全局变量归零
    hour = 0;
    minute = 0;
    second = 0;
    document.getElementById("hour").textContent = '00';
    document.getElementById("minute").textContent = '00';
    document.getElementById("second").textContent = '00';
}

// 使数字以两位数呈现
function pad(num){
    return num.toString().padStart(2, "0");
}