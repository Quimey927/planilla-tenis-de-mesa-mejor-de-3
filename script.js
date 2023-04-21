/* === 3 players/4 players layout === */

const radioButtons = document.querySelectorAll('input[type=radio]');
const fourPlayers = document.querySelectorAll('.four-players');

function toggleDisplay() {
  fourPlayers.forEach((element) => element.classList.toggle('four-players'));
}

radioButtons.forEach((button) =>
  button.addEventListener('change', toggleDisplay)
);

/* === Complete player names === */

const players = document.querySelectorAll('.player');
const fillPlayers = Array.from(document.querySelectorAll('.fill-player'));

function fillPlayer() {
  const playerNumber = this.dataset.number;
  fillPlayers.map((element) => {
    if (element.dataset.number == playerNumber) {
      element.value = this.value;
    }
  });
}

players.forEach((player) => player.addEventListener('keyup', fillPlayer));

/* === Checking data and setting positions === */

const pg = Array.from(document.querySelectorAll('.pg'));
const pgThreePlayers = Array.from(
  document.querySelectorAll('.pg-three-players')
);
const sfsc = Array.from(document.querySelectorAll('.sf-sc'));
const sfscThreePlayers = Array.from(
  document.querySelectorAll('.sf-sc-three-players')
);
const cds = Array.from(document.querySelectorAll('.cds'));
const cdsThreePlayers = Array.from(
  document.querySelectorAll('.cds-three-players')
);
const pfpc = Array.from(document.querySelectorAll('.pf-pc'));
const pfpcThreePlayers = Array.from(
  document.querySelectorAll('.pf-pc-three-players')
);
const cdp = Array.from(document.querySelectorAll('.cdp'));
const cdpThreePlayers = Array.from(
  document.querySelectorAll('.cdp-three-players')
);
const pos = Array.from(document.querySelectorAll('.pos'));
const posThreePlayers = Array.from(
  document.querySelectorAll('.pos-three-players')
);
const setPoints = Array.from(document.querySelectorAll('.set-points'));
const setPointsThreePlayers = Array.from(
  document.querySelectorAll('.set-points-three-players')
);
const sets = Array.from(document.querySelectorAll('.sets'));
const setsThreePlayers = Array.from(
  document.querySelectorAll('.sets-three-players')
);
const checkButton = document.querySelector('input[type=submit]');
let threePlayers = true;

function finalPositionsThreePlayers() {
  /* === computing players data === */
  let wins = [0, 0, 0];
  let sf = [0, 0, 0];
  let sc = [0, 0, 0];
  let pf = [0, 0, 0];
  let pc = [0, 0, 0];
  let cs = [0, 0, 0];
  let cp = [0, 0, 0];
  setsThreePlayers.forEach((set) => {
    let index = parseInt(set.dataset.number);
    let rivalIndex = parseInt(set.dataset.rival);
    if (set.textContent == '2') {
      wins[index - 1] += 1;
    }
    sf[index - 1] += parseInt(set.textContent);
    sc[rivalIndex - 1] += parseInt(set.textContent);
  });
  for (let i = 0; i < 3; i++) {
    pgThreePlayers[i].textContent = wins[i];
    sfscThreePlayers[i].textContent = sf[i].toString() + '/' + sc[i].toString();
    cs[i] = sf[i] / sc[i];
    if (sc[i] == 0) {
      cdsThreePlayers[i].textContent = '😎';
    } else {
      cdsThreePlayers[i].textContent = roundTwoDecimals(cs[i]);
    }
  }
  setPointsThreePlayers.forEach((points) => {
    if (points.value != '') {
      let index = parseInt(points.dataset.number);
      let rivalIndex = parseInt(points.dataset.rival);
      pf[index - 1] += parseInt(points.value);
      pc[rivalIndex - 1] += parseInt(points.value);
    }
  });
  for (let i = 0; i < 3; i++) {
    pfpcThreePlayers[i].textContent = pf[i].toString() + '/' + pc[i].toString();
    cp[i] = pf[i] / pc[i];
    if (pc[i] == 0) {
      cdpThreePlayers[i].textContent = '👽';
    } else {
      cdpThreePlayers[i].textContent = roundThreeDecimals(cp[i]);
    }
  }
  /* === calculing positions === */
  wins.sort((a, b) => b - a);
  //wins = [2 1 0]
  if (wins[0] == 2) {
    for (let i = 0; i < 3; i++) {
      posThreePlayers[i].textContent =
        3 - parseInt(pgThreePlayers[i].textContent);
    }
    //wins = [1 1 1]
  } else {
    let coef = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      coef[i] = cs[i] * 10000 + cp[i];
    }
    const sorted = [...coef].sort((a, b) => b - a);
    let winner = coef.indexOf(sorted[0]);
    let second = coef.indexOf(sorted[1]);
    let third = coef.indexOf(sorted[2]);
    if (sorted[0] > sorted[1] && sorted[1] > sorted[2]) {
      posThreePlayers[winner].textContent = 1;
      posThreePlayers[second].textContent = 2;
      posThreePlayers[third].textContent = 3;
    } else if (sorted[0] > sorted[1] && sorted[1] == sorted[2]) {
      posThreePlayers.map((element) => (element.textContent = 2));
      posThreePlayers[winner].textContent = 1;
    } else if (sorted[1] > sorted[2]) {
      posThreePlayers.map((element) => (element.textContent = 1));
      posThreePlayers[third].textContent = 3;
    } else {
      posThreePlayers.map((element) => (element.textContent = 1));
    }
  }
  /* === adding color to positions === */
  posThreePlayers.map((element) => {
    switch (element.textContent) {
      case '1':
        element.style.backgroundColor = 'rgb(39, 214, 9)';
        break;
      case '2':
        element.style.backgroundColor = 'rgb(15, 255, 80)';
        break;
      case '3':
        element.style.backgroundColor = 'rgb(223, 255, 0)';
        break;
    }
  });
}

function finalPositionsFourPlayers() {
  /* === computing players data === */
  let wins = [0, 0, 0, 0];
  let sf = [0, 0, 0, 0];
  let sc = [0, 0, 0, 0];
  let pf = [0, 0, 0, 0];
  let pc = [0, 0, 0, 0];
  let cs = [0, 0, 0, 0];
  let cp = [0, 0, 0, 0];
  sets.forEach((set) => {
    let index = parseInt(set.dataset.number);
    let rivalIndex = parseInt(set.dataset.rival);
    if (set.textContent == '2') {
      wins[index - 1] += 1;
    }
    sf[index - 1] += parseInt(set.textContent);
    sc[rivalIndex - 1] += parseInt(set.textContent);
  });
  for (let i = 0; i < 4; i++) {
    pg[i].textContent = wins[i];
    sfsc[i].textContent = sf[i].toString() + '/' + sc[i].toString();
    cs[i] = sf[i] / sc[i];
    if (sc[i] == 0) {
      cds[i].textContent = '😎';
    } else {
      cds[i].textContent = roundTwoDecimals(cs[i]);
    }
  }
  setPoints.forEach((points) => {
    if (points.value != '') {
      let index = parseInt(points.dataset.number);
      let rivalIndex = parseInt(points.dataset.rival);
      pf[index - 1] += parseInt(points.value);
      pc[rivalIndex - 1] += parseInt(points.value);
    }
  });
  for (let i = 0; i < 4; i++) {
    pfpc[i].textContent = pf[i].toString() + '/' + pc[i].toString();
    cp[i] = pf[i] / pc[i];
    if (pc[i] == 0) {
      cdp[i].textContent = '👽';
    } else {
      cdp[i].textContent = roundThreeDecimals(cp[i]);
    }
  }
  /* === calculing positions === */
  const sortedWins = [...wins].sort((a, b) => b - a);
  // sortedWins = [3 2 1 0]
  if (sortedWins[0] == 3 && sortedWins[1] == 2) {
    for (let i = 0; i < 4; i++) {
      pos[i].textContent = 4 - parseInt(pg[i].textContent);
    }
    //sortedWins = [3 1 1 1]
  } else if (sortedWins[0] == 3) {
    let winner = wins.indexOf(3);
    let coef = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      if (i != winner) {
        coef[i] = cs[i] * 10000 + cp[i];
      } else {
        coef[i] = 1000000;
      }
    }
    const sorted = [...coef].sort((a, b) => b - a);
    let second = coef.indexOf(sorted[1]);
    let third = coef.indexOf(sorted[2]);
    let fourth = coef.indexOf(sorted[3]);
    if (sorted[1] > sorted[2] && sorted[2] > sorted[3]) {
      pos[second].textContent = 2;
      pos[third].textContent = 3;
      pos[fourth].textContent = 4;
    } else if (sorted[1] > sorted[2] && sorted[2] == sorted[3]) {
      pos.map((element) => (element.textContent = 3));
      pos[second].textContent = 2;
    } else if (sorted[2] > sorted[3]) {
      pos.map((element) => (element.textContent = 2));
      pos[fourth].textContent = 4;
    } else {
      pos.map((element) => (element.textContent = 2));
    }
    pos[winner].textContent = 1;
    //sortedWins = [2 2 2 0]
  } else if (sortedWins[3] == 0) {
    let fourth = wins.indexOf(0);
    let coef = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      if (i != fourth) {
        coef[i] = cs[i] * 10000 + cp[i];
      }
    }
    const sorted = [...coef].sort((a, b) => b - a);
    let winner = coef.indexOf(sorted[0]);
    let second = coef.indexOf(sorted[1]);
    let third = coef.indexOf(sorted[2]);
    if (sorted[0] > sorted[1] && sorted[1] > sorted[2]) {
      pos[winner].textContent = 1;
      pos[second].textContent = 2;
      pos[third].textContent = 3;
    } else if (sorted[0] > sorted[1] && sorted[1] == sorted[2]) {
      pos.map((element) => (element.textContent = 2));
      pos[winner].textContent = 1;
    } else if (sorted[1] > sorted[2]) {
      pos.map((element) => (element.textContent = 1));
      pos[third].textContent = 3;
    } else {
      pos.map((element) => (element.textContent = 1));
    }
    pos[fourth].textContent = 4;
    //sortedWins = [2 2 1 1]
  } else {
    let winner1 = wins.indexOf(2);
    wins[winner1] = 0;
    let winner2 = wins.indexOf(2);
    let loser1 = wins.indexOf(1);
    wins[loser1] = 0;
    let loser2 = wins.indexOf(1);
    sets.forEach((set) => {
      if (
        set.dataset.number == winner1 + 1 &&
        set.dataset.rival == winner2 + 1
      ) {
        if (set.textContent == 2) {
          pos[winner1].textContent = 1;
          pos[winner2].textContent = 2;
        } else {
          pos[winner1].textContent = 2;
          pos[winner2].textContent = 1;
        }
      }
      if (set.dataset.number == loser1 && set.dataset.rival == loser2) {
        if (set.textContent == 2) {
          pos[loser1].textContent = 3;
          pos[loser2].textContent = 4;
        } else {
          pos[loser1].textContent = 4;
          pos[loser2].textContent = 3;
        }
      }
    });
  }
  /* === adding color to positions === */
  pos.map((element) => {
    switch (element.textContent) {
      case '1':
        element.style.backgroundColor = 'rgb(39, 214, 9)';
        break;
      case '2':
        element.style.backgroundColor = 'rgb(15, 255, 80)';
        break;
      case '3':
        element.style.backgroundColor = 'rgb(223, 255, 0)';
        break;
      case '4':
        element.style.backgroundColor = 'rgb(255, 204, 204)';
    }
  });
}

function checkDataThreePlayers() {
  let dataIsCorrect = true;
  players.forEach(
    (player) => (player.style.backgroundColor = 'rgb(255, 255, 204)')
  );
  setPointsThreePlayers.map(
    (element) => (element.style.backgroundColor = 'rgb(255, 255, 204)')
  );
  for (let i = 0; i < 3; i++) {
    if (players[i].value == '') {
      players[i].style.backgroundColor = 'orangered';
      dataIsCorrect = false;
    }
  }
  setsThreePlayers.map((element) => (element.textContent = 0));
  for (let i = 0; i < 3; i++) {
    let matchFinished = false;
    for (let j = 0; j < 3; j++) {
      if (setPointsThreePlayers[6 * i + j].value == '') {
        setPointsThreePlayers[6 * i + j].value = 0;
      }
      if (setPointsThreePlayers[6 * i + j + 3].value == '') {
        setPointsThreePlayers[6 * i + j + 3].value = 0;
      }
      const score1 = parseInt(setPointsThreePlayers[6 * i + j].value);
      const score2 = parseInt(setPointsThreePlayers[6 * i + j + 3].value);
      const maxScore = Math.max(score1, score2);
      const minScore = Math.min(score1, score2);
      if (
        !matchFinished &&
        !(
          (maxScore == 11 && minScore < 10) ||
          (minScore >= 10 && maxScore == minScore + 2)
        )
      ) {
        setPointsThreePlayers[6 * i + j].style.backgroundColor = 'orangered';
        setPointsThreePlayers[6 * i + j + 3].style.backgroundColor =
          'orangered';
        dataIsCorrect = false;
      } else if (!matchFinished) {
        if (score1 > score2) {
          setsThreePlayers[2 * i].textContent =
            parseInt(setsThreePlayers[2 * i].textContent) + 1;
          if (setsThreePlayers[2 * i].textContent == 2) {
            matchFinished = true;
          }
        } else {
          setsThreePlayers[2 * i + 1].textContent =
            parseInt(setsThreePlayers[2 * i + 1].textContent) + 1;
          if (setsThreePlayers[2 * i + 1].textContent == 2) {
            matchFinished = true;
          }
        }
      } else if (matchFinished) {
        if (maxScore > 0) {
          setPointsThreePlayers[6 * i + j].style.backgroundColor = 'orangered';
          setPointsThreePlayers[6 * i + j + 3].style.backgroundColor =
            'orangered';
          dataIsCorrect = false;
        } else {
          setPointsThreePlayers[6 * i + j].value = '';
          setPointsThreePlayers[6 * i + j + 3].value = '';
          setPointsThreePlayers[6 * i + j].placeholder = '';
          setPointsThreePlayers[6 * i + j + 3].placeholder = '';
        }
      }
    }
  }
  if (dataIsCorrect) {
    finalPositionsThreePlayers();
  } else {
    setsThreePlayers.map((element) => (element.textContent = ''));
  }
}

function checkDataFourPlayers() {
  let dataIsCorrect = true;
  players.forEach(
    (player) => (player.style.backgroundColor = 'rgb(255, 255, 204)')
  );
  setPoints.map(
    (element) => (element.style.backgroundColor = 'rgb(255, 255, 204)')
  );
  players.forEach((player) => {
    if (player.value == '') {
      player.style.backgroundColor = 'orangered';
      dataIsCorrect = false;
    }
  });
  sets.map((element) => (element.textContent = 0));
  for (let i = 0; i < 6; i++) {
    let matchFinished = false;
    for (let j = 0; j < 3; j++) {
      if (setPoints[6 * i + j].value == '') {
        setPoints[6 * i + j].value = 0;
      }
      if (setPoints[6 * i + j + 3].value == '') {
        setPoints[6 * i + j + 3].value = 0;
      }
      const score1 = parseInt(setPoints[6 * i + j].value);
      const score2 = parseInt(setPoints[6 * i + j + 3].value);
      const maxScore = Math.max(score1, score2);
      const minScore = Math.min(score1, score2);
      if (
        !matchFinished &&
        !(
          (maxScore == 11 && minScore < 10) ||
          (minScore >= 10 && maxScore == minScore + 2)
        )
      ) {
        setPoints[6 * i + j].style.backgroundColor = 'orangered';
        setPoints[6 * i + j + 3].style.backgroundColor = 'orangered';
        dataIsCorrect = false;
      } else if (!matchFinished) {
        if (score1 > score2) {
          sets[2 * i].textContent = parseInt(sets[2 * i].textContent) + 1;
          if (sets[2 * i].textContent == 2) {
            matchFinished = true;
          }
        } else {
          sets[2 * i + 1].textContent =
            parseInt(sets[2 * i + 1].textContent) + 1;
          if (sets[2 * i + 1].textContent == 2) {
            matchFinished = true;
          }
        }
      } else if (matchFinished) {
        if (minScore > 0) {
          setPoints[6 * i + j].style.backgroundColor = 'orangered';
          setPoints[6 * i + j + 3].style.backgroundColor = 'orangered';
          dataIsCorrect = false;
        } else {
          setPoints[6 * i + j].value = '';
          setPoints[6 * i + j + 3].value = '';
          setPoints[6 * i + j].placeholder = '';
          setPoints[6 * i + j + 3].placeholder = '';
        }
      }
    }
  }
  if (dataIsCorrect) {
    finalPositionsFourPlayers();
  } else {
    sets.map((element) => (element.textContent = ''));
  }
}

function checkData() {
  if (threePlayers) {
    checkDataThreePlayers();
  } else {
    checkDataFourPlayers();
  }
}

function roundTwoDecimals(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function roundThreeDecimals(num) {
  return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

radioButtons.forEach((button) =>
  button.addEventListener('change', () => (threePlayers = !threePlayers))
);
checkButton.addEventListener('click', checkData);
