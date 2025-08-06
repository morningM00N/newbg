document.getElementById('roll-button').addEventListener('click', rollDice);

const faces = document.querySelectorAll('.face');
for (let i = 0; i < faces.length; i++) {
    const element = faces[i];

    // 점의 위치 설정 (주사위 눈 규칙에 따라)
    switch (i%6) {
        case 1:
            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '42.5px';
                dot.style.left = '42.5px';
                element.appendChild(dot);
            }
            break;
        case 2:
            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '15px';
                dot.style.left = '15px';
                element.appendChild(dot);
            }
            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '70px';
                dot.style.left = '70px';
                element.appendChild(dot);
            }
            break;
        case 3:
            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '15px';
                dot.style.left = '15px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '42.5px';
                dot.style.left = '42.5px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '70px';
                dot.style.left = '70px';
                element.appendChild(dot);
            }

            break;
        case 4:
            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '15px';
                dot.style.left = '15px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '15px';
                dot.style.left = '70px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '70px';
                dot.style.left = '15px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '70px';
                dot.style.left = '70px';
                element.appendChild(dot);
            }

            break;
        case 5:
            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '15px';
                dot.style.left = '15px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '15px';
                dot.style.left = '70px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '70px';
                dot.style.left = '15px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '70px';
                dot.style.left = '70px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '42.5px';
                dot.style.left = '42.5px';
                element.appendChild(dot);
            }

            break;
        case 0:

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '15px';
                dot.style.left = '15px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '15px';
                dot.style.left = '70px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '70px';
                dot.style.left = '15px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '70px';
                dot.style.left = '70px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '15px';
                dot.style.left = '42.5px';
                element.appendChild(dot);
            }

            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = '70px';
                dot.style.left = '42.5px';
                element.appendChild(dot);
            }
            break;
    }


}
function rollDice() {
    // 주사위 눈 결정
    // 주사위 회전 애니메이션
    {
    const dice = document.getElementById('dice');
    let verValue = Math.floor(Math.random()*20)
    let horValue = Math.floor(Math.random()*20)
    let deltaX = Math.random()*30 -15
    let deltaY = Math.random()*30 -15
    console.log(verValue,horValue)

    dice.style.transform = `rotateX(${verValue*90+deltaX}deg) rotateY(${horValue*90+deltaY}deg)`;
    }

    {
        const dice = document.getElementById('dice2');
        let verValue = Math.floor(Math.random()*20)
        let horValue = Math.floor(Math.random()*20)
        let deltaX = Math.random()*30 -15
        let deltaY = Math.random()*30 -15
        console.log(verValue,horValue)
    
        dice.style.transform = `rotateX(${verValue*90+deltaX}deg) rotateY(${horValue*90+deltaY}deg)`;
        }
}
