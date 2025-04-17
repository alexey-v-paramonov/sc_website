let originalButtonText = "";

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


function restoreButton() {
    const tryBtn = document.getElementById("try-btn");
    tryBtn.classList.remove('button-error');
    tryBtn.innerHTML = originalButtonText;
    tryBtn.removeAttribute("disabled");
}

function addErrorToButton(text) {
    const tryForm = document.getElementById("try-form");
    const tryBtn = document.getElementById("try-btn");

    tryForm.classList.add('form-error');
    tryBtn.classList.add('button-error');
    tryBtn.innerHTML = text;
    tryBtn.setAttribute("disabled", "disabled");
    setTimeout(restoreButton, 2000)
}

document.addEventListener('DOMContentLoaded', function () {

    const tryForm = document.getElementById("try-form");
    const tryEmail = document.getElementById("try-email");
    const tryBtn = document.getElementById("try-btn");

    originalButtonText = tryBtn.innerHTML;
    const invalidEmailText = tryBtn.getAttribute('data-invalid-email');
    const langCode = tryBtn.getAttribute('data-lang');
    const trySuccessText = tryBtn.getAttribute('data-success-text');
    const tryContainer = document.getElementById("try-form");

    tryBtn.addEventListener('click', async function (event) {
        event.preventDefault();
        tryForm.classList.remove('form-error');
        restoreButton();
        if (!tryEmail.value || !validateEmail(tryEmail.value)) {
            addErrorToButton(invalidEmailText);
            return;
        }

        tryBtn.setAttribute("disabled", "disabled");

        try {
            // const response = await fetch("https://streaming.center/api/v1/users/", {
            //     method: "POST",
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ email: tryEmail.value, language: langCode == 'en' ? 0 : 1, currency: langCode == 'en' ? 0 : 1 })
            // });
            // if (!response.ok) {
            //     // const data = await response.json();
            //     // const error_code = data['email'][0];
            //     // tryBtn.removeAttribute("disabled");
            //     addErrorToButton(invalidEmailText);
            //     //let errorText = invalidEmailText;
            //     // switch(error_code){
            //     //     case 'unique':
            //     //     // case 'email':
            //     // }
            //     return;
            // }
            tryBtn.removeAttribute("disabled");

            // All good: show greeting
            tryContainer.innerHTML = `${trySuccessText} <b>${tryEmail.value}<b>`;
            tryContainer.classList.add('area-success');

        }
        catch (err) {
            console.log("Error: ", err)
            tryBtn.removeAttribute("disabled");

        }


    });

    tryEmail.addEventListener('change', async function (event) {
        tryForm.classList.remove('form-error');
    });

    tryEmail.addEventListener('keydown', async function (event) {
        tryForm.classList.remove('form-error');
    });
});