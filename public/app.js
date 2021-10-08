let userInput = '';
const results = $('#results');

$('#submit1').click (() => {
    //how to get the text value from the input on button click
    userInput = $('#user-input1').val();
    //using the $.get AJAX method to sent an HTTP request to the Rick and Morty API in order to
    // get the object about episodes from the show
    $.get(`/api/owners/${userInput}`, (data) => {
        console.log(data);
        results.empty();
        let $ownerTitle = $(`<div>Owner Info</div>`, {
            class: "owner-info"
        });
        let name = $(`<div>Name: ${data.first_name} ${data.last_name}</div>`)
        results.append($ownerTitle);
        $ownerTitle.append(name);
    });
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