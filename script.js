document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.querySelector("#signature_pad");
    var signaturePad = new SignaturePad(canvas, {
        minWidth: 2,
        maxWidth: 4,
    });

    function resizeCanvas() {
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        let storedData = signaturePad.toData();
        signaturePad.clear(); // otherwise isEmpty() might return incorrect value
        signaturePad.fromData(storedData);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    var clearButton = document.querySelector("#clear_button");
    clearButton.addEventListener("click", function() {
        signaturePad.clear();
    });
    
    var finishButton = document.querySelector("#finish_button");
    finishButton.addEventListener("click", function() {
        const svgDataUrl = signaturePad.toDataURL("image/svg+xml");
        console.log(svgDataUrl);
    });
});