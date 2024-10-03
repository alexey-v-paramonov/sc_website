let lang = 'ru';    
if(document.location.host.indexOf("localhost:1313") || document.location.host.indexOf("streaming.center")){
    lang = 'en';
}
console.log("Lang: ", lang);
const PRICING = {
    ru: {
        selfhosted: {
            base: 549,
            single: 80,
            whitelabel: 300
        },
        hosted: {
            price_per_gb: 15,
        },
        app:{
            android: {
                base: 15000,
                publishing: 2000,
                whitelabel: 1500,
            },
            ios: {
                base: 18000,
                publishing: 0,
                whitelabel: 1500,
            }
        }
    },
    en: {
        selfhosted: {
            base: 10,
            single: 1,
            whitelabel: 5
        },
        hosted: {
            price_per_gb: 0.19,
        },
        app:{
            android: {
                base: 250,
                publishing: 30,
                whitelabel: 30,
            },
            ios: {
                base: 300,
                publishing: 0,
                whitelabel: 30,
            }
        }
    }
}

function calculateSelfHostedPrice(){
    
    const stationsSelect = document.getElementById("self-hosted-stations");
    const whitelabelRadio = document.getElementById("self-hosted-whitelabel-yes");
    const selfHostedPriceContainer = document.getElementById("self-hosted-price");
    let price = PRICING[lang]["selfhosted"]["base"];
    if(stationsSelect.value > 5){
        price += PRICING[lang]["selfhosted"]["single"] * (stationsSelect.value - 5);
    }
    if(whitelabelRadio.checked){
        price += PRICING[lang]["selfhosted"]["whitelabel"];
    }

    selfHostedPriceContainer.innerHTML = price;
}

function calculateHostedPrice(){
    const listenersSelect = document.getElementById("hosted-listeners");
    const bitrateSelect = document.getElementById("hosted-listeners");
    const duSelect = document.getElementById("hosted-du");
    const hostedPriceContainer = document.getElementById("hosted-price");

    KBIT_PRICE = 0.055

    const percent_of_full = (parseFloat(listenersSelect.value) / 700.) * 100.0
    const discount_percent = (3 * percent_of_full + 200) / 10
    const price1 = KBIT_PRICE * parseFloat(bitrateSelect.value) * parseFloat(listenersSelect.value)
    let price = price1 - price1 * (discount_percent / 100.0)

    if (price < 500){
        percent = price * 0.18
        price += percent
    }
    if (price < 250){
        price = 250;
    }
    if(lang == 'en'){
        price = (price / 80.0).toFixed(2);
    }
    let extraGb = parseFloat(duSelect.value - 5);
    if(extraGb > 0){
        price = parseFloat(price) + parseFloat(PRICING[lang]["hosted"]["price_per_gb"] * extraGb);
    }
    hostedPriceContainer.innerHTML = price;
}

function calculateAndroidAppPrice(){
    const publishingSelect = document.getElementById("android-app-publishing");
    const copyrightSelect = document.getElementById("android-app-copyright");
    const androidPriceContainer = document.getElementById("android-app-price");
    let price = PRICING[lang]["app"]["android"]["base"];

    if(publishingSelect.value != "2"){
        price += PRICING[lang]["app"]["android"]["publishing"];
    }
    if(copyrightSelect.value != "0"){
        price += PRICING[lang]["app"]["android"]["whitelabel"];
    }
    androidPriceContainer.innerHTML = price;

}

function calculateiOsAppPrice(){
    const copyrightSelect = document.getElementById("ios-app-copyright");
    const iosPriceContainer = document.getElementById("ios-app-price");

    let price = PRICING[lang]["app"]["ios"]["base"];
    if(copyrightSelect.value != "0"){
        price += PRICING[lang]["app"]["ios"]["whitelabel"];
    }
    iosPriceContainer.innerHTML = price;
}

function calcEverything(){
    calculateSelfHostedPrice();
    calculateHostedPrice();
    calculateAndroidAppPrice();
    calculateiOsAppPrice();
}
document.addEventListener('DOMContentLoaded', function() {
    // Self hosted
    const stationsSelect = document.getElementById("self-hosted-stations");
    const whitelabelRadioYes = document.getElementById("self-hosted-whitelabel-yes");
    const whitelabelRadioNo = document.getElementById("self-hosted-whitelabel-no");

    stationsSelect.addEventListener("change", calculateSelfHostedPrice );
    whitelabelRadioYes.addEventListener('change', calculateSelfHostedPrice);
    whitelabelRadioNo.addEventListener('change', calculateSelfHostedPrice)

    // Hosted
    const listenersSelect = document.getElementById("hosted-listeners");
    const bitrateSelect = document.getElementById("hosted-listeners");
    const duSelect = document.getElementById("hosted-du");

    listenersSelect.addEventListener("change", calculateHostedPrice );
    bitrateSelect.addEventListener("change", calculateHostedPrice );
    duSelect.addEventListener("change", calculateHostedPrice );

    // Android app
    const publishingSelect = document.getElementById("android-app-publishing");
    const copyrightSelect = document.getElementById("android-app-copyright");
    publishingSelect.addEventListener("change", calculateAndroidAppPrice );
    copyrightSelect.addEventListener("change", calculateAndroidAppPrice );


    // iOs app
    const iosPublishingSelect = document.getElementById("ios-app-publishing");
    const iosCopyrightSelect = document.getElementById("ios-app-copyright");
    iosPublishingSelect.addEventListener("change", calculateiOsAppPrice );
    iosCopyrightSelect.addEventListener("change", calculateiOsAppPrice );

    calcEverything();

});