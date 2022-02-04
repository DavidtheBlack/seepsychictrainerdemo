document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.querySelector("#signature_pad");
  var signaturePad = new SignaturePad(canvas, {
    minWidth: 2,
    maxWidth: 4,
  });

  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    const storedData = signaturePad.toData();
    signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    signaturePad.fromData(storedData);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const clearButton = document.querySelector("#clear_button");
  clearButton.addEventListener("click", function () {
    signaturePad.clear();
    if (document.querySelector("#reveal_button")) {
      document.getElementById("reveal_icon").textContent = "";
    }
    toggleIconContainer(false);
  });

  // var finishButton = document.querySelector("#finish_button");
  // finishButton.addEventListener("click", function() {
  //     const svgDataUrl = signaturePad.toDataURL("image/svg+xml");
  //     console.log(svgDataUrl);
  // });

  function getRandomSymbol() {
    const iconTemp = symbolList[Math.floor(Math.random() * symbolList.length)];
    return String.fromCharCode(iconTemp);
  }

  function toggleIconContainer(isDisplayed) {
    if (isDisplayed) {
      document.getElementById("icon-reveal-container").style.display = "flex";
    } else {
      document.getElementById("icon-reveal-container").style.display = "none";
    }
  }

  const revealButton = document.querySelector("#reveal_button");
  revealButton.addEventListener("click", function () {
    const icon = getRandomSymbol();
    document.getElementById("reveal_icon").textContent = icon;

    toggleIconContainer(true);
  });
});
