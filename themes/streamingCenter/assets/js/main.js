let originalButtonText = "";

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

const restoreButton = function(){
    const tryBtn = document.getElementById("try-btn");
    tryBtn.classList.remove('button-error');
    tryBtn.innerHTML = originalButtonText;
    tryBtn.removeAttribute("disabled");
}


document.addEventListener('DOMContentLoaded', function() {
    
    const tryForm = document.getElementById("try-form");
    const tryEmail = document.getElementById("try-email");
    const tryBtn = document.getElementById("try-btn");

    originalButtonText = tryBtn.innerHTML;
    const invalidEmailText = tryBtn.getAttribute('data-invalid-email');

    tryBtn.addEventListener('click', async function(event){
        event.preventDefault();
        tryForm.classList.remove('form-error');
        restoreButton();
        if(!tryEmail.value || !validateEmail(tryEmail.value)){
            tryForm.classList.add('form-error');
            tryBtn.classList.add('button-error');
            tryBtn.innerHTML = invalidEmailText;
            tryBtn.setAttribute("disabled", "disabled");
            setTimeout(restoreButton, 2000)
            return;
        }
        const response = await fetch("https://streaming.center/api/try_before_buy", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: tryEmail.value})
        });
          
    });

    tryEmail.addEventListener('change', async function(event){
        tryForm.classList.remove('form-error');
    });

    tryEmail.addEventListener('keydown', async function(event){
        tryForm.classList.remove('form-error');
    });

});