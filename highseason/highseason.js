funcWidthPerHeight(2187 / 1448)

funcUpdatePageSize(true)

var gameStart = false
function funcInputValue() {
    let val = prompt("점수를 입력하세요.")
    if (isNaN(Number(val))) return
    event.target.innerHTML = val
    let score = 0
    for (let i = 0; i < 10; i++) {
        score += Number(document.getElementById("inputScore" + (i)).innerHTML)
    }
    $("#inputScore10")[0].innerHTML=score
}

let prefix = "HS_"
function funcPlainSlash() {
    if (gameStart==false)
        return
    if (event.target.innerHTML == "/") {
        event.target.innerHTML = ""
        localStorage.removeItem(prefix + event.target.id)
    }
    else {
        event.target.innerHTML = "/"
        localStorage.setItem(prefix + event.target.id, "/")
    }
}

function funcSlash() {
    if (gameStart==false)
        return

    let id = event.target.id
    if (id[0] == 's') {
        id = id.substr(1)
    }
    let btnCircle = document.getElementById(id)
    let btnSlash = document.getElementById("s" + id)
    if (btnSlash.innerHTML == "/") {
        btnSlash.innerHTML = ""
        btnCircle.style.border = "0px"
        localStorage.removeItem(prefix + id)

    }
    else {
        btnSlash.innerHTML = "/"
        localStorage.setItem(prefix + id, "/")
    }
}

function funcCircleSlash() {
    if (gameStart==false)
        return

    let id = event.target.id
    if (id[0] == 's') {
        id = id.substr(1)
    }
    let btnCircle = document.getElementById(id)
    let btnSlash = document.getElementById("s" + id)
    if (btnSlash.innerHTML == "/") {
        btnSlash.innerHTML = ""
        btnCircle.style.border = "0px"
        localStorage.removeItem(prefix + id)

    }
    else if (btnCircle.style.border == "0px") {
        btnCircle.style.border = (pageWidth / 400 > 1 ? pageWidth / 400 : 1) + "px solid black"
        localStorage.setItem(prefix + id, "O")
    }
    else {
        btnSlash.innerHTML = "/"
        localStorage.setItem(prefix + id, "/")
    }
}

function loadStorage() {
    let played = localStorage.getItem("HSboard")
    if (played == null) {
        return
    }
    let answer = confirm("기존에 플레이한 기록이 있습니다. 이어하시겠습니까?")
    if (answer == null || answer == false) {
        localStorage.clear()
        return
    }
    changeBackground(played)
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        if (key.substring(0, 3) == "HS_") {
            let id = key.substring(3)
            if (id.indexOf("btnHotelRoom") != -1 || id.indexOf("btnMoney") != -1) {
                let val = localStorage.getItem(key)
                $("#" + id)[0].style.border = (pageWidth / 400 > 1 ? pageWidth / 400 : 1) + "px solid black"
                if (val != 'O') {
                    $("#s" + id)[0].innerHTML = "/"

                }
                //document.getElementById(id).innerHTML="/"
            }
            else {
                console.log("#" + id)
                $("#" + id)[0].innerHTML = "/"
            }

        }
    }
}
function funcDraw() {
    {
        let ystep = 0.046
        for (let i = 0; i < 11; i++) {
            if (i < 10) {
                let btn = funcInsertElement("inputScore" + (i), "button", "btnTrans", 0.067, 0.0581 + ystep * i, 0.091, 0.0895 + ystep * i)
                btn.onclick=funcInputValue
            }
            if (i == 10) {
                let btn = funcInsertElement("inputScore" + (i), "button", "btnTrans", 0.06, 0.066 + ystep * i, 0.099, 0.1 + ystep * i)
            }

        }
    }

    {
        let xstep = 0.153
        for (let i = 0; i < 6; i++) {
            let btn = funcInsertElement("btnStaff" + (i), "button", "btnTrans", 0.11 + xstep * i, 0.85, 0.136 + xstep * i, 0.91)
            btn.onclick = funcPlainSlash
            //btn.innerHTML="/"

        }
    }
    {
        let i = 0
        let twidth = 0.035
        let theight = 0.055
        let locs = [
            [0.065, 0.55],
            [0.09, 0.565],
            [0.105, 0.595],
            [0.11, 0.64],
            [0.103, 0.68],
            [0.076, 0.71],
            [0.05, 0.715]
        ]
        locs.forEach(e => {
            let btn = funcInsertElement("btnRound" + (i), "button", "btnTrans", e[0], e[1], e[0] + twidth, e[1] + theight)
            btn.onclick = funcPlainSlash
            i += 1
        });
    }
    {
        let xstep = 0.022
        let xleftstart = 0.1975
        for (let i = 0; i < 5; i++) {
            let btn = funcInsertElement("btnEmp0" + (i), "button", "btnTrans", xleftstart + xstep * i, 0.61, xleftstart + 0.0181 + xstep * i, 0.65)
            btn.onclick = funcPlainSlash
            if (i == 2) {
                xleftstart += 0.035
            }
        }

        xleftstart = 0.178
        let ytopstart = 0.688
        for (let i = 0; i < 6; i++) {
            let btn = funcInsertElement("btnEmp1" + (i), "button", "btnTrans", xleftstart + xstep * i, ytopstart, xleftstart + 0.0181 + xstep * i, ytopstart + 0.04)
            btn.onclick = funcPlainSlash
            if (i == 1) {
                xleftstart += 0.034
            }
        }

        xleftstart = 0.122
        ytopstart += 0.08
        for (let i = 0; i < 7; i++) {
            let btn = funcInsertElement("btnEmp2" + (i), "button", "btnTrans", xleftstart + xstep * i, ytopstart, xleftstart + 0.0181 + xstep * i, ytopstart + 0.04)
            btn.onclick = funcPlainSlash
            if (i == 1) {
                xleftstart += 0.034
            }
            if (i == 3) {
                xleftstart += 0.034
            }

        }
    }

    {
        let xleft = .4649
        let ytop = .6
        let xright = .4814
        let ybottom = .65
        let xstep = 0.02
        let ystep = 0.042
        for (let c = 0; c < 2; c++) {
            for (let r = 0; r < 5; r++) {
                let btn = funcInsertElement("btnEmpF" + (c) + (r), "button", "btnTrans", xleft + xstep * c, ytop + ystep * r, xright + xstep * c, ybottom + ystep * r)
                btn.onclick = funcPlainSlash
            }
        }
    }

    {
        let xstep = 0.04
        for (let i = 0; i < 3; i++) {
            let btn = funcInsertElement("btnLoan" + (i), "button", "btnTrans", 0.5308 + xstep * i, 0.6174, 0.5638 + xstep * i, 0.6863)
            btn.onclick = funcPlainSlash
        }
    }

    {
        let idx = 0
        let xstep = 0.0275
        let ystep = 0.044
        let ydelta = -0.002
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 8; c++) {

                let btn = funcInsertElement("btnMoney" + (idx), "button", "btnTrans", 0.6733 + xstep * c, 0.613 + ystep * r, 0.6995 + xstep * c, 0.652 + ystep * r)
                btn.style.border = "0px"
                let btn2 = funcInsertElement("sbtnMoney" + (idx), "button", "btnTrans", 0.6733 + xstep * c, ydelta + 0.613 + ystep * r, 0.6995 + xstep * c, ydelta + 0.652 + ystep * r)
                btn2.style.backgroundColor = "transparent"
                btn2.style.fontSize = "" + Number(btn.style.fontSize.replace("px", "")) * 1.4 + "px"

                btn.style.borderRadius = "100%"
                btn.onclick = funcCircleSlash
                btn2.onclick = funcCircleSlash

                if (idx <= 6) {
                    btn.onclick = funcSlash
                    btn2.onclick = funcSlash


                }


                idx++

            }
        }
    }

    {
        let xstep = 0.0744
        let ystep = 0.116
        let ydelta = -0.001
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                let btn = funcInsertElement("btnHotelRoom" + (3 - r) + c, "button", "btnTrans", 0.241 + xstep * c, 0.175 + ystep * r, 0.258 + xstep * c, 0.204 + ystep * r)
                btn.style.borderRadius = "100%"
                btn.onclick = funcCircleSlash
                btn.style.border = "0px"


                let btn2 = funcInsertElement("sbtnHotelRoom" + (3 - r) + c, "button", "btnTrans", 0.241 + xstep * c, ydelta + 0.175 + ystep * r, 0.258 + xstep * c, ydelta + 0.204 + ystep * r)
                btn2.onclick = funcCircleSlash

                if (r == 3 && c >= 2) {
                    btn.onclick = funcSlash
                    btn2.onclick = funcSlash
                }

                btn2.style.fontSize = "" + Number(btn.style.fontSize.replace("px", "")) * 1.4 + "px"

            }
        }

        let delta = 0.415
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 3; c++) {
                let btn = funcInsertElement("btnHotelRoom" + (3 - r) + (c + 4), "button", "btnTrans", delta + 0.241 + xstep * c, 0.175 + ystep * r, delta + 0.258 + xstep * c, 0.204 + ystep * r)
                btn.style.borderRadius = "100%"
                btn.style.border = "0px"

                btn.onclick = funcCircleSlash

                let btn2 = funcInsertElement("sbtnHotelRoom" + (3 - r) + (c + 4), "button", "btnTrans", delta + 0.241 + xstep * c, ydelta + 0.175 + ystep * r, delta + 0.258 + xstep * c, ydelta + 0.204 + ystep * r)
                btn2.onclick = funcCircleSlash

                btn2.style.fontSize = "" + Number(btn.style.fontSize.replace("px", "")) * 1.4 + "px"

                if (r == 3 && c == 0) {
                    btn.onclick = funcSlash
                    btn2.onclick = funcSlash
                }


            }
        }

    }


    {
        let step = 0.074
        for (let idx = 0; idx < 4; idx++) {
            let btn = funcInsertElement("btnColBonus" + idx, "button", "btnTrans", 0.2647 + step * idx, 0.0599, 0.2783 + step * idx, 0.0910)
            btn.title = "btnColBonus" + idx
            btn.style.fontSize = "" + Number(btn.style.fontSize.replace("px", "")) * 1.5 + "px"
            btn.onclick = funcPlainSlash
        }

        for (let idx = 4; idx < 7; idx++) {
            let btn = funcInsertElement("btnColBonus" + idx, "button", "btnTrans", 0.6799 + step * (idx - 4), 0.0599, 0.6931 + step * (idx - 4), 0.0910)
            btn.title = "btnColBonus" + idx
            btn.style.fontSize = "" + Number(btn.style.fontSize.replace("px", "")) * 1.5 + "px"
            btn.onclick = funcPlainSlash

        }
    }


    let step = -0.06
    let delta = 0.119
    let ystep = 0.116
    let xmod = 0.679
    for (let i = 0; i < 4; i++) {
        {
            let btn = funcInsertElement("btnRowBonusLeft" + (3 - i), "button", "btnTrans", 0.2047, 0.1789 + ystep * i, 0.2183, 0.21 + ystep * i)
            btn.title = "btnRowBonusLeft" + (3 - i)
            btn.style.fontSize = "" + Number(btn.style.fontSize.replace("px", "")) * 1.5 + "px"
            btn.onclick = funcPlainSlash
        }

        {

            let btn = funcInsertElement("btnRowBonusRight" + (3 - i), "button", "btnTrans", 0.2647 + step + xmod, 0.0599 + delta + ystep * i, 0.2783 + step + xmod, 0.0910 + delta + ystep * i)
            btn.title = "btnRowBonusLeft" + (3 - i)
            btn.style.fontSize = "" + Number(btn.style.fontSize.replace("px", "")) * 1.5 + "px"
            btn.onclick = funcPlainSlash

        }

    }


    //
}


$(window).resize(function () {
    funcUpdatePageSize(true)
    funcDraw()
});

funcDraw()

function changeBackground(num) {
    gameStart = true
    let number
    if (num != undefined) {
        number = num
    } else {
        let num1 = $("#sltMainBoard")[0].selectedIndex
        let num2 = $("#sltStaffBoard")[0].value
        console.log(num1)
        console.log(num2)
        if (num1 == 0 || num2 == "스태프보드") {
            return
        }
        number = num1 * 10 + Number(num2)
    }
    localStorage.setItem("HSboard", number)
    document.getElementById("main").style.backgroundImage = `url('img/board${number}.jpg')`


    document.getElementById("container").style.display = "none"; // 숨기기
}

//funcPrepareGetLocation()

loadStorage()
