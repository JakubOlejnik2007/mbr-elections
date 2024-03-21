const showResult = (message) => {
    window.alert(message);
}

const showError = (message) => {
    window.alert(message);
}

const sendValidate = (vote1, vote2, vote3, identifier) => {
    return (vote1 + vote2 + vote3 === 5 && (vote1 >= 1 && vote1 <= 3) && (vote2 >= 1 && vote2 <= 3) && (vote3 >= 1 && vote3 <= 3) && (String(identifier)).length === 8)
}

const sendRequest = async (vote1, vote2, vote3, identifier) => {
    try {
        if (sendValidate(vote1, vote2, vote3, identifier)) {
            const url = 'http://localhost:2503/vote';
            const data = {
                vote1,
                vote2,
                vote3,
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

//sendRequest(2, 2, 1, "12245678");
