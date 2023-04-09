const pieces = document.querySelectorAll('.draggable')
const tiles = document.querySelectorAll('.tile')
const blackPieces = document.querySelectorAll('.black')
const whitePieces = document.querySelectorAll('.white')
const pawns = document.querySelectorAll('.pawn')
const tileCodes = {a: 1,b: 2,c: 3,d:4,e:5,f:6,g:7,h:8}
const tileCodes2 = {1: 'a',2: 'b',3: 'c',4:'d',5:'e',6:'f',7:'g',8:'h'}
let pieceStartingSquare;
let isValidCapture = true;
let pieceStaringSquares = {};
let turnCounter = 0
let draggedPiece

const turnChange = (piece) => {

    if(piece.classList.contains('white')){
      whitePieces.forEach(whitePiece => whitePiece.setAttribute("draggable",false))
      blackPieces.forEach(blackPiece => blackPiece.setAttribute("draggable",true))
    } else {
      blackPieces.forEach(blackPiece => blackPiece.setAttribute("draggable",false))
      whitePieces.forEach(whitePiece => whitePiece.setAttribute("draggable",true))
      turnCounter++
    }
}


const pawnMovement = (color,tile,piece,ogRow,currentRow,ogcol,currcol) => {
    let mutltiplier = 1
    const thirRow = document.querySelector('.row-3')
    const sixthRow = document.querySelector('.row-6')
    let rowInFrontOfPawn = thirRow
    if(color == 'black'){
      rowInFrontOfPawn = sixthRow 
      mutltiplier = -1
    }
    
    let insidesOfRowInFrontOfPawns = rowInFrontOfPawn.children[ogcol - 1].children.length
    
    if(tile.classList[1] == pieceStartingSquare.classList[1]){
      if(!piece.classList.contains('moved')){
        if(ogRow + 1 * mutltiplier == currentRow || (ogRow + 2 * mutltiplier == currentRow && insidesOfRowInFrontOfPawns == 0)){
          piece.classList.add('moved')
          return true
        } else{
          pieceStartingSquare.appendChild(piece)
          return false
        } 
      } else {
        if(ogRow + 1 * mutltiplier == currentRow){
          return true
        } else {
          pieceStartingSquare.appendChild(piece)
          return false
        }
      }
    } else {
      pieceStartingSquare.appendChild(piece)
      return false
    }
}
const kingMovement = (piece,ogRow,currentRow,ogcol,currcol) => {
  if((ogRow + 1 == currentRow || ogRow == currentRow || ogRow - 1 == currentRow) && (currcol + 1 == ogcol || currcol - 1 == ogcol || currcol == ogcol)){
    piece.classList.add('moved')
    return true
  } else {
    pieceStartingSquare.appendChild(piece)
    return false
  }
}
const queenMovement = (piece,ogRow,currentRow,ogcol,currcol) => {
  let i = 0
  
  while(true){
    if(currcol == ogcol && currentRow == ogRow){
      pieceStartingSquare.appendChild(piece)
      return false
    } else if((currentRow == ogRow + i || currentRow == ogRow - i || currentRow == ogRow) && (currcol == ogcol + i || currcol == ogcol - i || currcol == ogcol)){
      let thing
      const rows = ogRow - currentRow
      const cols = ogcol - currcol
      if(Math.abs(rows) == Math.abs(cols)){
        for(let i = 1; i <= Math.abs(rows) - 1; i++){
          thing = document.querySelectorAll(`.tile-${tileCodes2[currcol + i]}`)
          arraything = Array.from(thing).reverse()
          if(cols > 0) {
            if(rows < 0 ){
              if(arraything[currentRow - 1 - i].children[0] != undefined){
                return false
              }
            } else {
              if(arraything[currentRow - 1 + i].children[0] != undefined){
                return false
              }
            }
          } else {
              thing = document.querySelectorAll(`.tile-${tileCodes2[currcol - i]}`)
              arraything = Array.from(thing).reverse();
            if(rows < 0 ){
              if(arraything[currentRow - 1 - i].children[0] != undefined){
                return false
              }
              } else {
              if(arraything[currentRow - 1 + i].children[0] != undefined){
                return false
              }
            }
          }
        }
        return true
      }
      for(let i = 0; i <= Math.abs(rows) - 2;i++){
        if(rows > 0) {
            thing = document.querySelector(`.row-${currentRow + i + 1}`)
            if(thing.children[currcol - 1].children[0] != undefined){
              return false
            }
        } else {
            thing = document.querySelector(`.row-${currentRow - i - 1}`)
            if(thing.children[currcol - 1].children[0] != undefined){
              return false
            }
        }
      }
      for(let i = 0; i <= Math.abs(cols) - 2;i++){
        if(cols > 0) {
            thing = document.querySelectorAll(`.tile-${tileCodes2[currcol + i + 1]}`)
            arraything = Array.from(thing).reverse();
            if(arraything[currentRow - 1].children[0] != undefined){
              return false
            }
        } else {
            thing = document.querySelectorAll(`.tile-${tileCodes2[currcol - i - 1]}`)
            arraything = Array.from(thing).reverse();
            if(arraything[currentRow - 1].children[0] != undefined){
              return false
            }
        }
      }
      return true
    }
    if(i > 10){
      pieceStartingSquare.appendChild(piece)
      return false
    } else{
      i++
    }
  }
}
const bishopMovement = (piece,ogRow,currentRow,ogcol,currcol) => {
  for (let i = 0; i < 10; i++){
      if(currcol == ogcol && currentRow == ogRow){
        pieceStartingSquare.appendChild(piece)
        return false
      } else if((currentRow == ogRow + i || currentRow == ogRow - i) && (currcol == ogcol + i || currcol == ogcol - i)){
        let thing
        const rows = ogRow - currentRow
        const cols = ogcol - currcol
        for(let i = 1; i <= Math.abs(rows) - 1; i++){
          thing = document.querySelectorAll(`.tile-${tileCodes2[currcol + i]}`)
          arraything = Array.from(thing).reverse()
          if(cols > 0) {
            if(rows < 0 ){
              if(arraything[currentRow - 1 - i].children[0] != undefined){
                return false
              }
            } else {
              if(arraything[currentRow - 1 + i].children[0] != undefined){
                return false
              }
            }
          } else {
              thing = document.querySelectorAll(`.tile-${tileCodes2[currcol - i]}`)
              arraything = Array.from(thing).reverse();
            if(rows < 0 ){
              if(arraything[currentRow - 1 - i].children[0] != undefined){
                return false
              }
              } else {
              if(arraything[currentRow - 1 + i].children[0] != undefined){
                return false
              }
            }
          }
        }
        return true
      }
  }
  pieceStartingSquare.appendChild(piece)
  return false
}
const rookMovement = (piece,ogRow,currentRow,ogcol,currcol) => {
  for (let i = 0; i < 10; i++){
    if(currcol == ogcol && currentRow == ogRow){
      pieceStartingSquare.appendChild(piece)
      return false
    } else if((currentRow == ogRow + i || currentRow == ogRow - i) && currcol == ogcol || (currcol == ogcol + i || currcol == ogcol - i) && currentRow == ogRow){
      let thing
      const rows = ogRow - currentRow
      const cols = ogcol - currcol
      for(let i = 0; i <= Math.abs(rows) - 2;i++){
        if(rows > 0) {
            thing = document.querySelector(`.row-${currentRow + i + 1}`)
            if(thing.children[currcol - 1].children[0] != undefined){
              return false
            }
        } else {
            thing = document.querySelector(`.row-${currentRow - i - 1}`)
            if(thing.children[currcol - 1].children[0] != undefined){
              return false
            }
        }
      }
      for(let i = 0; i <= Math.abs(cols) - 2;i++){
        if(cols > 0) {
            thing = document.querySelectorAll(`.tile-${tileCodes2[currcol + i + 1]}`)
            arraything = Array.from(thing).reverse();
            if(arraything[currentRow - 1].children[0] != undefined){
              return false
            }
        } else {
            thing = document.querySelectorAll(`.tile-${tileCodes2[currcol - i - 1]}`)
            arraything = Array.from(thing).reverse();
            if(arraything[currentRow - 1].children[0] != undefined){
              return false
            }
        }
      }
      return true
    }
  }
  pieceStartingSquare.appendChild(piece)
  return false
}


const checkIfPieceCanMoveToThatTile = (tile, piece) => {
  let originalRowAsNumber = Number(pieceStartingSquare.parentElement.classList[1][pieceStartingSquare.parentElement.classList[1].length - 1])
  let currentRowAsNumber = Number(tile.parentElement.classList[1][tile.parentElement.classList[1].length - 1])
  let originalCollum = tileCodes[pieceStartingSquare.classList[1][pieceStartingSquare.classList[1].length - 1]]
  let currentCollum = tileCodes[tile.classList[1][tile.classList[1].length - 1]]
  if(piece.classList.contains('white')){
    if(pawnMovement('white',tile,piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum) && piece.classList.contains('pawn')){
      return true
    } 
    else if(piece.classList.contains('king')){
      return kingMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    } else if(piece.classList.contains('queen')){
      return queenMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    } else if(piece.classList.contains('bishop')){
      return bishopMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    } else if(piece.classList.contains('rook')){
      return rookMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    }
    else return false
  } else {
    if(pawnMovement('black',tile,piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum) && piece.classList.contains('pawn')) return true
    else if(piece.classList.contains('king')) return kingMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    else if(piece.classList.contains('queen')) return queenMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    else if(piece.classList.contains('bishop')) return bishopMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    else if(piece.classList.contains('rook')) return rookMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    else return false
  }
}

const pawnCaptures = (color,piece,ogRow,currentRow,ogcol,currcol) => {
  let mutltiplier = 1
  if(color == 'black') mutltiplier = -1
  if(ogRow + 1 * mutltiplier == currentRow && (currcol + 1 == ogcol || currcol - 1 == ogcol)){
    
    piece.classList.add('moved')
    return true
  } else {
    pieceStartingSquare.appendChild(piece)
    return false
  }
}
const kingCaptures = (piece,ogRow,currentRow,ogcol,currcol) => {
  if((ogRow + 1 == currentRow || ogRow == currentRow || ogRow - 1 == currentRow) && (currcol + 1 == ogcol || currcol - 1 == ogcol || currcol == ogcol)){
    piece.classList.add('moved')
    return true
  } else {
    pieceStartingSquare.appendChild(piece)
    return false
  }
}

const checkIfYouCanCapture = (tile,piece) => {
  let originalRowAsNumber = Number(pieceStartingSquare.parentElement.classList[1][pieceStartingSquare.parentElement.classList[1].length - 1])
  let currentRowAsNumber = Number(tile.parentElement.classList[1][tile.parentElement.classList[1].length - 1])
  let originalCollum = tileCodes[pieceStartingSquare.classList[1][pieceStartingSquare.classList[1].length - 1]]
  let currentCollum = tileCodes[tile.classList[1][tile.classList[1].length - 1]]
  if(piece.classList.contains('white')){
    if(piece.classList.contains('pawn')){
      return pawnCaptures('white',piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    } else if(piece.classList.contains('king')) return kingCaptures(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    else if(piece.classList.contains('queen')) return queenMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    else if(piece.classList.contains('bishop')) return bishopMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    else if(piece.classList.contains('rook')) return rookMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    else return false

  } else {
    if(piece.classList.contains('pawn')) return pawnCaptures('black',piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
      else if(piece.classList.contains('king'))return kingCaptures(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
      else if(piece.classList.contains('queen')) return queenMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
      else if(piece.classList.contains('bishop')) return bishopMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
      else if(piece.classList.contains('rook')) return rookMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
      else return false
     
  }
}

const checkIfCapturedPieceIsNotYourOwn = (tile,piece) => {
if(piece.classList.contains('white') && tile.children[0].classList.contains('black') || piece.classList.contains('black') && tile.children[0].classList.contains('white')){
    return true
} else {
    pieceStartingSquare.appendChild(piece)
    return false
  }
}

    
const getStartingSquares = () => {
  let i = 0
  pieces.forEach(piece => {
    i++
  pieceStaringSquares[i] = piece.parentElement
})
}
const resetBoard = () => {
  let i = 0
  pieces.forEach(piece => {
    i++
    piece.classList.remove('moved')
    pieceStaringSquares[i].appendChild(piece)
    blackPieces.forEach(blackPiece => blackPiece.setAttribute("draggable",false))
    whitePieces.forEach(whitePiece => whitePiece.setAttribute("draggable",true))
  })
}

getStartingSquares()


pieces.forEach(piece => {
  piece.addEventListener('dragstart', (e) => {
    piece.classList.add('dragging')
    draggedPiece = piece
    
    pieceStartingSquare = piece.parentElement
  })
})
tiles.forEach(tile => {
  tile.addEventListener('dragover', (e) => {
    e.preventDefault()
    const piece = document.querySelector('.dragging')
    tile.classList.add('lighten')
    tile.appendChild(piece)

  })

  tile.addEventListener('dragover', (e) => {
    tiles.forEach(tile => {
      if(e.currentTarget != tile) tile.classList.remove('lighten')
    })
  })
})
pieces.forEach(piece => {
  piece.addEventListener('dragend', () => {
  const currentTile = piece.parentElement
  piece.classList.remove('dragging')
  currentTile.classList.remove('lighten')
  if(currentTile.children.length >= 2){
    if(checkIfCapturedPieceIsNotYourOwn(currentTile,piece) && checkIfYouCanCapture(currentTile,piece)){
      console.log('captured')
        currentTile.removeChild(currentTile.children[0])
        turnChange(piece)
    } else {
      pieceStartingSquare.appendChild(piece)
    }
  } else if(checkIfPieceCanMoveToThatTile(currentTile, piece)){
    console.log('moved')
    currentTile.appendChild(piece)
    turnChange(piece)
  } else{
    console.log('no')
    pieceStartingSquare.appendChild(piece)
  } 

})
})

