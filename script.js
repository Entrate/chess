const pieces = document.querySelectorAll('.draggable')
const tiles = document.querySelectorAll('.tile')
const blackPieces = document.querySelectorAll('.black')
const whitePieces = document.querySelectorAll('.white')
const pawns = document.querySelectorAll('.pawn')
const tileCodes = {a: 1,b: 2,c: 3,d:4,e:5,f:6,g:7,h:8}
let pieceStartingSquare;
let isValidCapture = true;
let pieceStaringSquares = {};
let turnCounter = 0
let draggedPiece

const turnChange = (piece) => {
    if(piece.classList.contains('white')){
      console.log('isran2')
      whitePieces.forEach(whitePiece => whitePiece.setAttribute("draggable",false))
      blackPieces.forEach(blackPiece => blackPiece.setAttribute("draggable",true))
    } else {
      blackPieces.forEach(blackPiece => blackPiece.setAttribute("draggable",false))
      whitePieces.forEach(whitePiece => whitePiece.setAttribute("draggable",true))
      turnCounter++
    }
}

const pawnMovement = (color,tile,piece,ogRow,currentRow) => {
    let mutltiplier = 1
    if(color == 'black') mutltiplier = -1
    if(tile.classList[1] == pieceStartingSquare.classList[1]){
      if(!piece.classList.contains('moved')){
        if(ogRow + 1 * mutltiplier == currentRow || ogRow + 2 * mutltiplier == currentRow){
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

const checkIfPieceCanMoveToThatTile = (tile, piece) => {
  let originalRowAsNumber = Number(pieceStartingSquare.parentElement.classList[1][pieceStartingSquare.parentElement.classList[1].length - 1])
  let currentRowAsNumber = Number(tile.parentElement.classList[1][tile.parentElement.classList[1].length - 1])
  let originalCollum = tileCodes[pieceStartingSquare.classList[1][pieceStartingSquare.classList[1].length - 1]]
  let currentCollum = tileCodes[tile.classList[1][tile.classList[1].length - 1]]
  if(piece.classList.contains('white')){
    if(pawnMovement('white',tile,piece,originalRowAsNumber,currentRowAsNumber) && piece.classList.contains('pawn')){
      return true
    } 
    else if(piece.classList.contains('king')){
      return kingMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    } 
    else return false
  } else {
    if(pawnMovement('black',tile,piece,originalRowAsNumber,currentRowAsNumber) && piece.classList.contains('pawn')) return true
    else if(piece.classList.contains('king')) return kingMovement(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
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
    else return false

  } else {
    if(piece.classList.contains('pawn')){
      return pawnCaptures('black',piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    } else if(piece.classList.contains('king')){
      return kingCaptures(piece,originalRowAsNumber,currentRowAsNumber,originalCollum,currentCollum)
    } else{
      return false
     }
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

