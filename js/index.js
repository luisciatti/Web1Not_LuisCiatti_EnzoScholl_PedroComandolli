fetch('snippets/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('cabecalho').innerHTML = data;
    });

fetch('snippets/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('rodape').innerHTML = data;
    });