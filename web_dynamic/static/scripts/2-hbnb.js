$("document").ready(function () {
    const amenities = {};
    $("input[type=checkbox").change(function () {
        if (this.checked) {
            amenities[this.dataset.name] = this.dataset.id;
        } else {
            delete amenities[this.dataset.name];
        }
        $(".amenities h4").text(Object.keys(amenities).sort().join(", "));
    });
    $.getJSON("http://127.0.0.1:5001/api/v1/status/", (response) =>{
        console.log(response.status)
        if (response.status === "OK") {
            $("div#api_status").addClass("available");
            $('div#api_status').removeAttr('id');
            
        } else {
            $("div#api_status").removeClass("available");
        }
    })
});