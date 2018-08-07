function loadData() {
    return fetch('https://releases-api.comet.aol.com/api/v2/generator/homepage_dynamic_lede/homepage_dl')
        .then(function(response){
            return response.json();
        }).then(function(jsonData){
           return jsonData;
        });
    
}

loadData().then(function(result){
    const topNews = result.data.splice(0,10);
    const lastNews = result.data.splice(10,20);
    console.log('TOTAL NEWS >>> ' + result.data.length);
    console.log(topNews)
    let carousel = document.getElementById('carousel');
    let dots = document.getElementById('dots');
    let slideIndex = 0;
    topNews.forEach(news => {
        //Create Slider element
        let slider = document.createElement('div');
        slider.className = 'slides fade';
        let displayText = document.createElement('div');
        displayText.className = 'display-news';            
        let aTop = document.createElement('a');
        aTop.href = news.url;
        aTop.target = 'blank';
        let h1 = document.createElement('h1');
        h1.innerHTML = news.title_a;
        aTop.appendChild(h1);
        let p = document.createElement('p');
        p.innerHTML = news.summary.substring(0,50) + '...';
        let image = document.createElement('img');
        image.src = news.image;

        //Add new dot element
        let spanDot = document.createElement('span');
        spanDot.className = 'dot';
        slideIndex++;
        //Create a closure to receive the index value.
        spanDot.onclick = function(index) {
                            return function() { currentSlide(index) } 
                        } (slideIndex);
        dots.appendChild(spanDot);
        
        //Add to Carousel component            
        displayText.appendChild(aTop);
        displayText.appendChild(p);
        //Add prev button
        let prevButton = document.createElement('a');
        prevButton.innerHTML = '&#10094;';
        prevButton.className = 'prev';
        prevButton.onclick = function(){ changeSlide(-1) };
        displayText.appendChild(prevButton);
        //Add next button
        let nextButton = document.createElement('a');
        nextButton.innerHTML = '&#10095;';
        nextButton.className = 'next';
        nextButton.onclick = function(){ changeSlide(1) };
        displayText.appendChild(nextButton);
        let numSlide = document.createElement('span');
        numSlide.innerHTML = slideIndex +'/'+ topNews.length;
        displayText.appendChild(numSlide);
        slider.appendChild(displayText);
        slider.appendChild(image);            
        carousel.appendChild(slider)
    });

    //Create Last News Section
    let dailyBuzz = document.getElementById('daily-buzz');
    lastNews.forEach(last => {
        let article = document.createElement('article');
        article.className = 'list-post-item two-col';
        let image = document.createElement('img');
        image.src = last.image;
        let h2 = document.createElement('h2');
        h2.innerHTML = last.title_a;
        let p = document.createElement('p');
        p.innerHTML = last.summary.substring(0,50) + '...';
        let a = document.createElement('a');
        a.href = last.url;
        a.innerHTML = 'Read more';
        a.target = 'blank';
        article.appendChild(image);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(a);
        dailyBuzz.appendChild(article);
    });

}).then(function(){
    showSlides(slideIndex);
});

//Slides Controls
var slideIndex = 1;

function currentSlide(index) {
    showSlides(slideIndex = index);
}

function changeSlide(number){
    showSlides(slideIndex += number);
}

function showSlides(index) {
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("dot");
    if (index > slides.length) {slideIndex = 1} 
    if (index < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block"; 
    dots[slideIndex-1].className += " active";
}

//Validate Data
function validateData() {
    let email = document.forms['newsletter']['email'].value;
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        alert('Invalid Email, try again.');
        return false;
    } else {
        alert('Valid Email, be ready to receive our News.');
        return false;
    }
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    readCookie();
    readBrowserInfo();
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Cookie functions
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function readCookie() {
    if(document.cookie.indexOf('host_aol') < 0){
        setCookie('host_aol','aol.co.uk');
    }
    let spanCookie = document.getElementById('cookie');
    spanCookie.innerHTML = getCookie('host_aol');
}

function readBrowserInfo(){
    let browserInfo = document.getElementById('browserInfo');
    if(browserInfo.hasChildNodes())
        return false;
    let ulBrowserInfo = document.createElement('ul');
    let liCookieEnabled = document.createElement('li');
    liCookieEnabled.innerHTML = 'cookiesEnabled is ' + navigator.cookieEnabled;
    ulBrowserInfo.appendChild(liCookieEnabled);
    let liAppName = document.createElement('li');
    liAppName.innerHTML = 'navigator.appName is ' + navigator.appName;
    ulBrowserInfo.appendChild(liAppName);
    let liAppCodeName = document.createElement('li');
    liAppCodeName.innerHTML = 'navigator.appCodeName is ' + navigator.appCodeName;
    ulBrowserInfo.appendChild(liAppCodeName);
    let liBrowserEngine = document.createElement('li');
    liBrowserEngine.innerHTML = 'navigator.product is ' + navigator.product;
    ulBrowserInfo.appendChild(liBrowserEngine);
    let liAppVersion = document.createElement('li');
    liAppVersion.innerHTML = 'Browser version is ' + navigator.appVersion;
    ulBrowserInfo.appendChild(liAppVersion);
    let liUserAgent = document.createElement('li');
    liUserAgent.innerHTML = 'User Agent is ' + navigator.userAgent;
    ulBrowserInfo.appendChild(liUserAgent);
    let liPlatform = document.createElement('li');
    liPlatform.innerHTML = 'Browser Platform is ' + navigator.platform;
    ulBrowserInfo.appendChild(liPlatform);
    let liLanguage = document.createElement('li');
    liLanguage.innerHTML = 'Browser Language is ' + navigator.language;
    ulBrowserInfo.appendChild(liLanguage);
    let liBrowserOnline = document.createElement('li');
    liBrowserOnline.innerHTML = 'Browser is Online: ' + navigator.onLine;
    ulBrowserInfo.appendChild(liBrowserEngine);
    let liJavaEnabled = document.createElement('li');
    liJavaEnabled.innerHTML = 'Browser Java is Enabled: ' + navigator.javaEnabled;
    ulBrowserInfo.appendChild(liJavaEnabled);
    let liPageLocation = document.createElement('li');
    liPageLocation.innerHTML = 'Page location is ' + window.location.href;
    ulBrowserInfo.appendChild(liPageLocation);
    browserInfo.appendChild(ulBrowserInfo);
}