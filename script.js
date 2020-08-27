function myFunction() {
  const gameContainer = document.getElementById("game");
  const gameDiv = document.getElementById("start-game");
  const name = document.getElementById("name").value;
  const level = document.getElementById("select").value;
  let cardNo = 0;
  let firstCardClass = "";
  let secondCardClass = "";
  if (name === "" || level === "") {
    console.log("x")
  }
  gameDiv.classList.add("show-game-div");
  const COLORS = [
    "./gifs/1.gif",
    "./gifs/2.gif",
    "./gifs/3.gif",
    "./gifs/4.gif",
    "./gifs/5.gif",
    "./gifs/6.gif",
    "./gifs/7.gif",
    "./gifs/8.gif",
    "./gifs/9.gif",
    "./gifs/10.gif",
    "./gifs/11.gif",
    "./gifs/12.gif"
  ];

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let newColors = [];
  for (let i = 0; i < level / 2; i++) {
    newColors.push(COLORS[i]);
    newColors.push(COLORS[i]);
  }
  let shuffledColors = shuffle(newColors);



  function createDivsForColors(colorArray, level) {
    if (level === "24") {
      tileClassName = "tile24";
      textClassName = "card-text-24"
    } else if (level === "8") {
      tileClassName = "tile8";
      // imgClassName = "img";
      textClassName = "card-text-8"
    } else if (level === "12") {
      tileClassName = "tile12";
      // imgClassName = "img";
      textClassName = "card-text-12"
    } else {
      tileClassName = "tile16";
      // imgClassName = "img";
      textClassName = "card-text-16"
    }
    for (let i = 0; i < level; i++) {
      // create a new div

      const newDiv = document.createElement("div");
      const cardImg = document.createElement("IMG");
      cardImg.setAttribute("src", colorArray[i]);
      cardImg.classList.add("img");
      newDiv.classList.add("tile");
      newDiv.classList.add(tileClassName);
      newDiv.setAttribute("imgValue", colorArray[i]);
      const frontDiv = document.createElement("p");
      frontDiv.innerHTML = "flip me to know my true colors";
      frontDiv.classList.add("back-face");
      frontDiv.classList.add("card-text");
      frontDiv.classList.add(textClassName);
      cardImg.classList.add("front-face");
      newDiv.append(frontDiv);
      newDiv.append(cardImg);

      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }


  // TODO: Implement this function!
  function handleCardClick(event) {
    if (cardNo < 2) {
      if (cardNo === 0) {
        console.log("flip");
        this.classList.add("flip");
        firstCardClass = this;
        cardNo += 1;
      } else {
        console.log("flip");
        this.classList.add("flip");
        secondCardClass = this;
        cardNo += 1;
        if (compareCards(firstCardClass.attributes.imgvalue.nodeValue, secondCardClass.attributes.imgValue.nodeValue)) {
          console.log("yay");
          firstCardClass.classList.add("done");
          secondCardClass.classList.add("done");
          console.log(firstCardClass.classList);
          cardNo = 0;
        } else {
          console.log("no");
          setTimeout(function () {
            console.log("noflip");
            if (!firstCardClass.classList.contains("done")) {
              firstCardClass.classList.remove("flip");
            }
            if (!secondCardClass.classList.contains("done")) {
              secondCardClass.classList.remove("flip");
            }
            cardNo = 0;
          }, 1000);
        }
      }

    }
    // console.log("you clicked", event.target.parentElement);
  }

  function compareCards(first, second) {
    console.log(first, second);
    if (first === second) {
      return true;
    } else {
      return false;
    }
  }
  // when the DOM loads
  createDivsForColors(shuffledColors, level);
}