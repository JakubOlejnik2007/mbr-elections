let pointsOlejnik = 1;
let pointsKrol = 1;
let pointsWojtynska = 1;
const inputPassword = document.querySelector(".section__input--js");
const submitButton = document.querySelector(".section__button--js");

const POINTDIV = `<div class="point"></div>`;

const showResult = (message) => {
    window.alert(message);
}

const showError = (message) => {
    window.alert(message);
}

const sendValidate = (vote1, vote2, vote3, identifier) => {
    return (vote1 + vote2 + vote3 === 5 && (vote1 >= 1 && vote1 <= 3) && (vote2 >= 1 && vote2 <= 3) && (vote3 >= 1 && vote3 <= 3) && (String(identifier)).length === 8)
}

const sendRequest = async (olejnik, krol, wojtynska, identifier) => {
    try {
        if (sendValidate(olejnik, krol, wojtynska, identifier)) {
            const url = 'http://localhost:2503/vote';
            const data = {
                olejnik, 
                krol, 
                wojtynska,
                identifier
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showResult("Success");
            } else {
                showError("Wystąpił błąd");
            }
        } else {
            showError("Wprowadzone dane są niepoprawne");
        }
    } catch (error) {
        showError("Wystąpił błąd");
    }
}

const updatePoints = (candidate, operation) => {
    const sumPoints = pointsOlejnik + pointsKrol + pointsWojtynska;
    if (sumPoints >= 5 && operation === 'add') {
        showError("Suma punktów nie może przekraczać 5");
        return;
    }

    switch (candidate) {
        case 'Olejnik':
            if (operation === 'add') {
                pointsOlejnik++;
            } else if (operation === 'subtract' && pointsOlejnik > 1) {
                pointsOlejnik--;
            }
            break;
        case 'Król':
            if (operation === 'add') {
                pointsKrol++;
            } else if (operation === 'subtract' && pointsKrol > 1) {
                pointsKrol--;
            }
            break;
        case 'Wojtyńska':
            if (operation === 'add') {
                pointsWojtynska++;
            } else if (operation === 'subtract' && pointsWojtynska > 1) {
                pointsWojtynska--;
            }
            break;
        default:
            break;
    }
    displayPoints();
}

const displayPoints = () => {
    document.querySelector("#pointsOlejnik").innerHTML = POINTDIV.repeat(pointsOlejnik);
    document.querySelector("#pointsKrol").innerHTML = POINTDIV.repeat(pointsKrol);
    document.querySelector("#pointsWojtynska").innerHTML = POINTDIV.repeat(pointsWojtynska);
}

document.querySelectorAll('.section__button--candidatePoints').forEach(button => {
    button.addEventListener('click', (event) => {
        const candidateName = event.target.parentElement.parentElement.querySelector('h2').innerText.trim().split(" ")[1];
        const operation = event.target.innerText === '+' ? 'add' : 'subtract';
        console.log(candidateName, operation);
        updatePoints(candidateName, operation);
    });
});

displayPoints();


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(pointsOlejnik, pointsKrol, pointsWojtynska, inputPassword.value)
    sendRequest(pointsOlejnik, pointsKrol, pointsWojtynska, inputPassword.value);
});