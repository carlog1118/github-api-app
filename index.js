'use strict'
function displayResults (responseJson){
    console.log(responseJson);
    $('.list').empty();
    for (let i= 0; i < responseJson.length; i++){
        $('.list').append(
            `<li>
                <h3>${responseJson[i].name}</h3>
                <p><a href="${responseJson[i].html_url}">View Repo</a></p>

            </li>
            `
        )
    };
    $('.results').removeClass('hidden');
}


function getName(query){
    var url= `https://api.github.com/users/${query}/repos`;
    console.log(url);
    fetch(url)
    .then (response => {
        if (response.ok) {
            return response.json();
        } 
        throw new Error(response.statusText);
    })
    .then (responseJson => displayResults(responseJson))
    .catch(err => {
        $('.js-error-message').text(`Something went wrong: ${err.message}`);
    })
}


function watchForm (){
    $('form').submit(event => {
        event.preventDefault();
        const searchName= $('.js-username').val();
        getName(searchName);
    });
}

$(watchForm);