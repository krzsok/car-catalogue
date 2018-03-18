
var carListData = [];


$(document).ready(function() {


    populateTable();

});


$('#carList table tbody').on('click', 'td a.linkshowcar', showCarInfo);


$('#btnAddCar').on('click', addCar);


$('#carList table tbody').on('click', 'td a.linkdeletecar', deleteCar);


function populateTable() {


    var tableContent = '';


    $.getJSON( '/users/carlist', function( data ) {


    carListData = data;


        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowcar" rel="' + this.samochodID + '">' + this.samochodmodel + '</a></td>';
            tableContent += '<td>' + this.samochodmarka + '</td>';
            tableContent += '<td><a href="#" class="linkdeletecar" rel="' + this.samochodID + '">Usuń</a></td>';
            tableContent += '</tr>';
        });


        $('#carList table tbody').html(tableContent);
    });
};



function showCarInfo(event) {
    debugger;

    event.preventDefault();


    var thisCarID = $(this).attr('rel');



    var carIDs = carListData.map(function(item) {return item.samochodID});


    var thisCarObject = carListData[carIDs.indexOf(parseInt(thisCarID))];


    $('#carRokProdukcji').text(thisCarObject.samochodrokprodukcji);
    $('#carPojemnosc').text(thisCarObject.samochodpojemnosc + " cm3");
    $('#carMoc').text(thisCarObject.samochodmoc + "KM");


};


function addCar(event) {
    //debugger;
    event.preventDefault();


    var errorCount = 0;
    $('#addCar input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });


    if(errorCount === 0) {


        var newCar = {
            'marka': $('#addCar fieldset input#inputMarka').val(),
            'model': $('#addCar fieldset input#inputModel').val(),
            'rokprodukcji': $('#addCar fieldset input#inputRokProdukcji').val(),
            'pojemnosc': $('#addCar fieldset input#inputPojemnosc').val(),
            'moc': $('#addCar fieldset input#inputMoc').val()
        }


        $.ajax({
            type: 'POST',
            data: newCar,
            url: '/users/addcar',
            dataType: 'JSON'
        }).done(function( response ) {


            if (response.msg === '') {

                // Clear the form inputs
                $('#addCar fieldset input').val('');


                populateTable();

            }
            else {


                alert('Błąd: ' + response.msg);

            }
        });
    }
    else {

        alert('Proszę uzupełnić wszystkie pola');
        return false;
    }
};


function deleteCar(event) {

    event.preventDefault();


    var confirmation = confirm('Czy na pewno chcesz usunąć ten samochód z bazy?');


    if (confirmation === true) {


        $.ajax({
            type: 'DELETE',
            url: '/users/deletecar/' + $(this).attr('rel')
        }).done(function( response ) {


            if (response.msg === '') {
            }
            else {
                alert('Błąd: ' + response.msg);
            }


            populateTable();

        });

    }
    else {


        return false;

    }

};