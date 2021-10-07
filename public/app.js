let userInput = '';

$('#submit1').click (() => {
    //how to get the text value from the input on button click
    userInput = $('#user-input1').val();
    //using the $.get AJAX method to sent an HTTP request to the Rick and Morty API in order to
    // get the object about episodes from the show
    $.get(`/api/owners/${userInput}`, (data) => {
        console.log(data);
    })
});


$('#submit2').click (() => {
    //how to get the text value from the input on button click
    userInput = $('#user-input2').val();
    //using the $.get AJAX method to sent an HTTP request to the Rick and Morty API in order to
    // get the object about episodes from the show
    $.get(`/api/pets/${userInput}`, (data) => {
        console.log(data);
    })
});