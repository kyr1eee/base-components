const imgWidth = 600
let slider = document.querySelector(".slider")
let imgArr = document.querySelectorAll(".slider li")
let dots = document.querySelector(".dots")
let imgNums = imgArr.length
let index = 1
let moveTime = 1.2
let turnTime = 5
let ifClick = false
let autoPlay = ''
let dark = '#6b547c9c'
let light = '#dcadff9c'
run()
dots.addEventListener('mousedown',dotMove)
dots.addEventListener('mouseup',() => {
    if(ifClick) {
        play()
        ifClick = false

    }
})
function run() {
    clonePic()
    play()
    currentDot()
}
function dotMove(el) {
    ifClick = true
    if(autoPlay) {
        clearInterval(autoPlay)
    }
    let target = el.target
    if (target.nodeName.toLowerCase() === 'span') {
        if(index === imgNums + 1) {
            return ''
        }
        let currentIndex = target.attributes[0].nodeValue
        let direction = 'left'
        slider.style.left = -imgWidth * currentIndex + 'px'
        index = parseInt(currentIndex)
    }
    else {
        return
    }
}
function currentDot() {
    let allDot = document.querySelectorAll('.dots span')
    let showDot = setInterval(()=>{
        // let dot = document.querySelector(`.dots span:nth-child(${index})`)
        if(index <= imgNums) {
            allDot.forEach((el, i)=>{
                allDot[i].style.backgroundColor = i+1 !== index ? dark : light
            })
        }
        if(index > imgNums) {
            allDot[0].style.backgroundColor = light
            allDot[allDot.length - 1].style.backgroundColor = dark
        }
    }, 10)
}
function addClass(el, cls) {
    let className = el.className
    let clsArr = className.split(' ')
    if (clsArr.indexOf(className) === -1) {
        el.className = className + ' ' + cls
    }
    else {
        return ''
    }
}
function removeClass(el, cls) {
    let className = el.className
    className.replace(cls,'')
}
function play() {
    autoPlay = setInterval(() => {
        let offset = slider.style.left
        if (index > imgNums) {
            index = 0
            slider.style.transition = 'none'
            slider.style.left = -imgWidth + 'px'
            setTimeout(() => {
                slider.style.left = -imgWidth * 2 + 'px'
                slider.style.transition = `all ${moveTime}s`
                index++
            }, 100)
        }
        else {
            slider.style.left = -imgWidth * (index + 1) + 'px'
            slider.style.transition = `all ${moveTime}s`
        }

        index++
    }, turnTime * 1000)
}
function clonePic() {
    let first = imgArr[0].cloneNode(true)
    let last = imgArr[imgArr.length - 1].cloneNode(true)
    slider.style.left = -imgWidth + 'px'
    slider.insertBefore(last, imgArr[0])
    slider.appendChild(first)
}