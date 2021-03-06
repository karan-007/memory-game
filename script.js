function myFunction() {
  const gameContainer = document.getElementById("game");
  const gameDiv = document.getElementById("start-game");
  const name = document.getElementById("name").value;
  const level = document.getElementById("select").value;
  document.getElementById("game-level").innerHTML = level;
  document.getElementById("score-name").innerHTML = name;

  let cardNo = 0;
  let timerOn = false;
  let firstCardClass = "";
  let secondCardClass = "";
  let totalCardsMatched = 0;
  let totalSeconds = 0;
  let timer;

  getDataFromLocal();

  if (name === "" || level === "") {
    document.getElementById("reload").classList.add("error");
    document.getElementById("anchor").setAttribute("href", "#reload");
  } else {
    document.getElementById("anchor").setAttribute("href", "#start-game");
    gameDiv.classList.add("show-game-div");
    document.getElementById("game-intro").classList.add("hide-intro");
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

    function shuffle(array) {
      let counter = array.length;

      while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
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
        textClassName = "card-text-8"
      } else if (level === "12") {
        tileClassName = "tile12";
        textClassName = "card-text-12"
      } else {
        tileClassName = "tile16";
        textClassName = "card-text-16"
      }
      for (let i = 0; i < level; i++) {
        const newDiv = document.createElement("div");
        const cardImg = document.createElement("IMG");
        cardImg.setAttribute("src", colorArray[i]);
        cardImg.classList.add("img");
        newDiv.classList.add("tile");
        newDiv.classList.add(tileClassName);
        newDiv.setAttribute("imgValue", colorArray[i]);
        const frontDiv = document.createElement("p");
        frontDiv.innerHTML = "Click me to know my true colors";
        frontDiv.classList.add("back-face");
        frontDiv.classList.add("card-text");
        frontDiv.classList.add(textClassName);
        cardImg.classList.add("front-face");
        newDiv.append(frontDiv);
        newDiv.append(cardImg);

        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
      }
    }

    function handleCardClick(event) {

      if (totalCardsMatched === 0 && timerOn === false) {
        timerOn = true;
        timer = setInterval(setTime, 1000);
      }
      if (cardNo < 2) {
        if (cardNo === 0) {
          console.log("flip");
          this.classList.add("flip");
          firstCardClass = this;
          firstAttr = firstCardClass.attributes.imgvalue.nodeValue;
          cardNo += 1;
        } else {
          console.log("flip");
          this.classList.add("flip");
          secondCardClass = this;
          secondAttr = secondCardClass.attributes.imgValue.nodeValue;
          cardNo += 1;
          if (compareCards(firstAttr, secondAttr)) {
            console.log("yay");
            firstCardClass.classList.add("done");
            secondCardClass.classList.add("done");
            totalCardsMatched += 2;
            if (totalCardsMatched === parseInt(level)) {
              console.log("done");
              clearInterval(timer);
              storeDataInLocal();
              let score = document.getElementById("timer").innerHTML;
              setTimeout(function () {
                if (alert('Good Game, Press ok to play again. Your score is ' + score)) { }
                else window.location.reload();
              }, 1000)
            }
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
    }

    function storeDataInLocal() {
      let score = document.getElementById("timer").innerHTML;
      let playerName = name;
      let playerLevel = level;

      const data = {
        score: score,
        name: playerName,
        level: playerLevel
      }

      console.log(data.score, data.name, data.level);

      if ("store-" + level in localStorage) {
        localData = JSON.parse(localStorage.getItem("store-" + level));
        if (parseInt(localData.score) > parseInt(data.score)) {
          localStorage.setItem("store-" + level, JSON.stringify(data));
        }
      } else {
        localStorage.setItem("store-" + level, JSON.stringify(data));
      }

    }

    function setTime() {
      ++totalSeconds;
      document.getElementById("timer").innerHTML = totalSeconds;
    }

    function compareCards(first, second) {
      if (first === second) {
        return true;
      } else {
        return false;
      }
    }
    createDivsForColors(shuffledColors, level);
  }
  function getDataFromLocal() {
    levelArr = [8, 12, 16, 24];
    levelArr.map((level) => {
      if ("store-" + level in localStorage) {
        let store = JSON.parse(localStorage.getItem("store-" + level));
        document.getElementById("name-" + level).innerHTML = store.name;
        document.getElementById("level-" + level).innerHTML = store.level;
        document.getElementById("score-" + level).innerHTML = store.score;
      }
    })
  }
}