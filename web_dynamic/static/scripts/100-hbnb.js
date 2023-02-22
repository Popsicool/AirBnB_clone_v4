$("document").ready(function () {
    let all = {"amenities": {},
"states": {}, "cities": {}};
    // const amenities = {};
    // const states = {};
    // const cties = {};
    $(".amen_fil").change(function () {
        if (this.checked) {
            all.amenities[this.dataset.name] = this.dataset.id;
        } else {
            delete all.amenities[this.dataset.name];
        }
        $(".amenities h4").text(Object.keys(all.amenities).sort().join(", "));
    });
    $(".state_fil").change(function () {
        if (this.checked) {
            console.log(this);
            all.states[this.dataset.name] = this.dataset.id;
        } else {
            delete all.states[this.dataset.name];
        }
        console.log(all.states)
        // $(".amenities h4").text(Object.keys(all.amenities).sort().join(", "));
    });
    $(".city_fil").change(function () {
        if (this.checked) {
            all.cities[this.dataset.name] = this.dataset.id;
        } else {
            delete all.cities[this.dataset.name];
        }
        // $(".amenities h4").text(Object.keys(all.amenities).sort().join(", "));
    });




    $.getJSON("http://127.0.0.1:5001/api/v1/status/", (response) => {
        if (response.status === "OK") {
            $("div#api_status").addClass("available");
            $('div#api_status').removeAttr('id');

        } else {
            $("div#api_status").removeClass("available");
        }
    });
    send({});

    $(".filters button").click(function () {
        send(amenities);
    })

    function send(list){
        if (list.length >= 1){
            list = {"amenities": list}
        }
        $.post({
            url: "http://127.0.0.1:5001/api/v1/places_search/",
            data: JSON.stringify(list),
            headers: {
                "Content-Type": "application/json",
            },
            success: (response) => {
                response.forEach((place) => {
                    $("section.places").append(
                        `<article>
    <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">${place.price_by_night}</div>
    </div>
    <div class="information">
        <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? "s" : ""}  </div>
        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? "s" : ""}</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? "s" : ""}</div>
    </div>
    <div class="description">
        ${place.description}
    </div>
</article>`
                    )
                });
            }
        });
    };


});