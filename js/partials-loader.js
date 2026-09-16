Promise.all([
    fetch('/partials/header.html').then(r => r.text()),
    fetch('/partials/footer.html').then(r => r.text())
]).then(([headerHtml, footerHtml]) => {
    document.getElementById('header').innerHTML = headerHtml;
    document.getElementById('footer').innerHTML = footerHtml;
    document.dispatchEvent(new Event('partials-loaded'));
});