function ticTacToe() {
  const gameState = {
    players: ['x', 'o'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

  let loop;

  let player1;
  let player2;

  function createBoard() {
    $('.gameboard div').remove();
    for (let i = 0; i <= 8; i++) {
      $('.gameboard').append($(`<div class="board ${i}"><span class="text"></span></div>`));
    }
  }

  const selectPlayer = function () {
    gameState.players.unshift(gameState.players.pop());
  }

  function toggleActiveClass() {
    const currentPlayer = gameState.players[0];

    if ($('.player span').hasClass('active')) {
      $('.player span').removeClass('active');
    }
    if (currentPlayer === "x") {
      $('.player-1').addClass('active');
    }
    if (currentPlayer === "o") {
      $('.player-2').addClass('active');
    }
  }

  const checkAvailableSpots = function (row, spotNumber, player) {
    const boardRow1 = gameState.board[0];
    const boardRow2 = gameState.board[1];
    const boardRow3 = gameState.board[2];
    const numClass = spotNumber;
    let arrIndex;
    let rowNum;

    if (row === 0) {
      rowNum = boardRow1;
    }
    else if (row === 1) {
      rowNum = boardRow2;
    }
    else if (row === 2) {
      rowNum = boardRow3;
    }

    if (spotNumber === 0 || spotNumber === 3 || spotNumber === 6) {
      arrIndex = 0;
    }
    if (spotNumber === 1 || spotNumber === 4 || spotNumber === 7) {
      arrIndex = 1;
    }
    if (spotNumber === 2 || spotNumber === 5 || spotNumber === 8) {
      arrIndex = 2;
    }
    if (rowNum[arrIndex] === null) {
      $(`.${numClass} span`).text(player);
      rowNum[arrIndex] = player;
      return true;
    }
    else {
      return false;
    }
  }

  function checkForWinner() {
    const boardRow1 = gameState.board[0];
    const boardRow2 = gameState.board[1];
    const boardRow3 = gameState.board[2];
    const player = gameState.players[1];

    const horizontal = arr => arr.every(e => e === arr[0] && e !== null);
    const vertical = (arr1, arr2, arr3) => {
      for (let i = 0; i < 3; i++) {
        if (arr1[i] === arr2[i] && arr1[i] === arr3[i] && arr1[i] !== null) {
          return true;
        }
      }
      return false;
    }
    let winner;

    if (player === "x") {
      winner = $('.player-1').text();
    }
    else {
      winner = $('.player-2').text();
    }

    if (vertical(boardRow1, boardRow2, boardRow3)) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    if (horizontal(boardRow1)) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    if (horizontal(boardRow2)) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    if (horizontal(boardRow3)) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    if (boardRow1[0] === boardRow2[1] && boardRow2[1] === boardRow3[2] && boardRow1[0] !== null) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    if (boardRow1[2] === boardRow2[1] && boardRow2[1] === boardRow3[0] && boardRow1[2] !== null) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    return false;
  }

  function checkForTie() {
    const gameboard = gameState.board;
    const gameArr = [];
    const horizontal = arr => arr.every(e => e !== null);
    gameboard.forEach(function (e) {
      gameArr.push(...e)
    });

    if (!checkForWinner() && horizontal(gameArr)) {
      clearInterval(loop);
      $('.game-over h2').text("Tie Game");
      $('.game-over').fadeIn();
    }
  }

  function renderBoard() {
    const player = gameState.players[0];
    if ($(this).hasClass('0')) {
      checkAvailableSpots(0, 0, player);
      selectPlayer();
    }
    if ($(this).hasClass('1')) {
      checkAvailableSpots(0, 1, player);
      selectPlayer();
    }
    if ($(this).hasClass('2')) {
      checkAvailableSpots(0, 2, player);
      selectPlayer();
    }
    if ($(this).hasClass('3')) {
      checkAvailableSpots(1, 3, player);
      selectPlayer();
    }
    if ($(this).hasClass('4')) {
      checkAvailableSpots(1, 4, player);
      selectPlayer();
    }
    if ($(this).hasClass('5')) {
      checkAvailableSpots(1, 5, player);
      selectPlayer();
    }
    if ($(this).hasClass('6')) {
      checkAvailableSpots(2, 6, player);
      selectPlayer();
    }
    if ($(this).hasClass('7')) {
      checkAvailableSpots(2, 7, player);
      selectPlayer();
    }
    if ($(this).hasClass('8')) {
      checkAvailableSpots(2, 8, player);
      selectPlayer();
    }
  }

  function tick() {
    toggleActiveClass();
    checkForWinner();
    checkForTie();
  }

  function runGame(speed) {
    if (typeof loop !== "undefined") {
      clearInterval(loop);
    }
    loop = setInterval(tick, 1000 / speed);
  }

  function runBotGame(speed) {
    if (typeof loop !== "undefined") {
      clearInterval(loop);
    }
    loop = setInterval(computerPlayer, 1000 / speed);
  }
  // tick-tac-toe robot

  function computerPlayer() {

    if (gameState.players[0] === "o") {
      checkTwoRow();
    }
    checkForWinnerBot();
    checkForTie();
    toggleActiveClassRobot();
  }

  function toggleActiveClassRobot() {
    const currentPlayer = gameState.players[0];

    if ($('.player h2').hasClass('active')) {
      $('.player h2').removeClass('active');
    }
    if (currentPlayer === "x") {
      $('.player-1').addClass('active');
    }
    if (currentPlayer === "o") {
      $('.player-bot').addClass('active');
    }
  }

  const makeClassNumber = function (num) {
    let numKey;

    if (num === 0) {
      numKey = [0, 1, 2];
    }
    else if (num === 1) {
      numKey = [3, 4, 5];
    }
    else {
      numKey = [6, 7, 8];
    }
    return numKey;
  }

  function checkTwoRow() {
    const gameboard = gameState.board;
    // rows
    if (gameboard[0][0] === "x" && gameboard[0][1] === "x" && gameboard[0][2] === null) {
      gameboard[0][2] = "o";
      $(`.${makeClassNumber(0)[2]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][0] === null && gameboard[0][1] === "x" && gameboard[0][2] === "x") {
      gameboard[0][0] = "o";
      $(`.${makeClassNumber(0)[0]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][0] === "x" && gameboard[0][1] === null && gameboard[0][2] === "x") {
      gameboard[0][1] = "o";
      $(`.${makeClassNumber(0)[1]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[1][0] === "x" && gameboard[1][1] === "x" && gameboard[1][2] === null) {
      gameboard[1][2] = "o";
      $(`.${makeClassNumber(1)[2]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[1][0] === null && gameboard[1][1] === "x" && gameboard[1][2] === "x") {
      gameboard[1][0] = "o";
      $(`.${makeClassNumber(1)[0]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[1][0] === "x" && gameboard[1][1] === null && gameboard[1][2] === "x") {
      gameboard[1][1] = "o";
      $(`.${makeClassNumber(1)[1]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[2][0] === "x" && gameboard[2][1] === "x" && gameboard[2][2] === null) {
      gameboard[2][2] = "o";
      $(`.${makeClassNumber(2)[2]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[2][0] === null && gameboard[2][1] === "x" && gameboard[2][2] === "x") {
      gameboard[2][0] = "o";
      $(`.${makeClassNumber(2)[0]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[2][0] === "x" && gameboard[2][1] === null && gameboard[2][2] === "x") {
      gameboard[2][1] = "o";
      $(`.${makeClassNumber(2)[1]} span`).text("o");
      selectPlayer();
      return true;
    }
    // columns
    else if (gameboard[0][0] === "x" && gameboard[1][0] === "x" && gameboard[2][0] === null) {
      gameboard[2][0] = "o";
      $(`.${makeClassNumber(2)[0]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][0] === null && gameboard[1][0] === "x" && gameboard[2][0] === "x") {
      gameboard[0][0] = "o";
      $(`.${makeClassNumber(0)[0]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][0] === "x" && gameboard[1][0] === null && gameboard[2][0] === "x") {
      gameboard[1][0] = "o";
      $(`.${makeClassNumber(1)[0]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][1] === "x" && gameboard[1][1] === "x" && gameboard[2][1] === null) {
      gameboard[2][1] = "o";
      $(`.${makeClassNumber(2)[1]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][1] === null && gameboard[1][1] === "x" && gameboard[2][1] === "x") {
      gameboard[0][1] = "o";
      $(`.${makeClassNumber(0)[1]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][1] === "x" && gameboard[1][1] === null && gameboard[2][1] === "x") {
      gameboard[1][1] = "o";
      $(`.${makeClassNumber(1)[1]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][2] === "x" && gameboard[1][2] === "x" && gameboard[2][2] === null) {
      gameboard[2][2] = "o";
      $(`.${makeClassNumber(2)[2]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][2] === null && gameboard[1][2] === "x" && gameboard[2][2] === "x") {
      gameboard[0][2] = "o";
      $(`.${makeClassNumber(0)[2]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][2] === "x" && gameboard[1][2] === null && gameboard[2][2] === "x") {
      gameboard[1][2] = "o";
      $(`.${makeClassNumber(1)[2]} span`).text("o");
      selectPlayer();
      return true;
    }
    // diag
    else if (gameboard[0][0] === null && gameboard[1][1] === "x" && gameboard[2][2] === "x") {
      gameboard[0][0] = "o";
      $(`.${makeClassNumber(0)[0]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][0] === "x" && gameboard[1][1] === "x" && gameboard[2][2] === null) {
      gameboard[2][2] = "o";
      $(`.${makeClassNumber(2)[2]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][0] === "x" && gameboard[1][1] === null && gameboard[2][2] === "x") {
      gameboard[1][1] = "o";
      $(`.${makeClassNumber(1)[1]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][2] === null && gameboard[1][1] === "x" && gameboard[2][0] === "x") {
      gameboard[0][2] = "o";
      $(`.${makeClassNumber(0)[2]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][2] === "x" && gameboard[1][1] === "x" && gameboard[2][0] === null) {
      gameboard[2][0] = "o";
      $(`.${makeClassNumber(2)[0]} span`).text("o");
      selectPlayer();
      return true;
    }
    else if (gameboard[0][2] === "x" && gameboard[1][1] === null && gameboard[2][0] === "x") {
      gameboard[1][1] = "o";
      $(`.${makeClassNumber(1)[1]} span`).text("o");
      selectPlayer();
      return true;
    }
    else {
      pickEmpty();
      return false;
    }
  }

  function pickEmpty() {
    const row0 = gameState.board[0];
    const row1 = gameState.board[1];
    const row2 = gameState.board[2];

    if (checkForWinnerBot() === false) {
      for (let i = 0; i < row0.length; i++) {
        if (row0[i] === null) {
          row0[i] = "o";
          $(`.${makeClassNumber(0)[i]} span`).text("o");
          selectPlayer();
          return true
        }
        else if (row1[i] === null) {
          row1[i] = "o";
          $(`.${makeClassNumber(1)[i]} span`).text("o");
          selectPlayer();
          return true
        }
        else if (row2[i] === null) {
          row2[i] = "o";
          $(`.${makeClassNumber(2)[i]} span`).text("o");
          selectPlayer();
          return true
        }
      }
    }
    return false
  }

  function checkForWinnerBot() {
    const boardRow1 = gameState.board[0];
    const boardRow2 = gameState.board[1];
    const boardRow3 = gameState.board[2];
    const player = gameState.players[0];
    const horizontal = arr => arr.every(e => e === arr[0] && e !== null);
    const vertical = (arr1, arr2, arr3) => {
      for (let i = 0; i < 3; i++) {
        if (arr1[i] === arr2[i] && arr1[i] === arr3[i] && arr1[i] !== null) {
          return true;
        }
      }
      return false;
    }

    let winner = $('.player-b').text();
    if (player === "x") {
      winner = $('.player-1').text();
    }

    if (vertical(boardRow1, boardRow2, boardRow3)) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    if (horizontal(boardRow1)) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    if (horizontal(boardRow2)) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    if (horizontal(boardRow3)) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    if (boardRow1[0] === boardRow2[1] && boardRow2[1] === boardRow3[2] && boardRow1[0] !== null) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    if (boardRow1[2] === boardRow2[1] && boardRow2[1] === boardRow3[0] && boardRow1[2] !== null) {
      clearInterval(loop);
      $('.winner').text(winner);
      $('.game-over').fadeIn();
      return true;
    }
    return false;
  }
  // click
  $('.start').click(function () {
    $('.start').css('display', 'none');
    $('.bot').css('display', 'none');
    createBoard();
    $('.board').on('click', renderBoard);
    runGame(30);
  })

  $('.bot').click(function () {
    $('.start').css('display', 'none');
    $('.bot').css('display', 'none');
    $('.player-2-info').css('display', 'none');
    $('.player-2').text("Bot");
    $('#name2').css('display', 'none');
    $('.player-2-label').css('display', 'none');
    $('.player-bot').css('display', 'unset');

    createBoard();
    $('.board').on('click', renderBoard);
    runBotGame(20);
  })

  $('.play-again').click(function () {
    location.reload();

  });

  $('.player-names').click(function () {
    const player1 = $('.player-1-name').val();
    const player2 = $('.player-2-name').val();

    $('.player-1').text(player1);
    $('.player-2').text(player2);

    $('.form-pair').css('display', 'none')
  });

}
ticTacToe()






