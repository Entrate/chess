const pieces = document.querySelectorAll('.draggable')
const tiles = document.querySelectorAll('.tile')
const blackPieces = document.querySelectorAll('.black')
const whitePieces = document.querySelectorAll('.white')
const pawns = document.querySelectorAll('.pawn')
let pieceStartingSquare;
let isValidCapture = true;
let pieceStaringSquares = {};
let turnCounter = 1
let draggedPiece

const turnChange = (piece) => {
  if(pieceStartingSquare != piece.parentElement){ 
    turnCounter++
    console.log(turnCounter)
    if(piece.classList.contains('white')){
      whitePieces.forEach(whitePiece => whitePiece.setAttribute("draggable",false))
      blackPieces.forEach(blackPiece => blackPiece.setAttribute("draggable",true))
    } else {
      blackPieces.forEach(blackPiece => blackPiece.setAttribute("draggable",false))
      whitePieces.forEach(whitePiece => whitePiece.setAttribute("draggable",true))
    }
  }
}
const checkIfPieceCanMoveToThatTile = (tile, piece) => {
   let originalRowAsString = pieceStartingSquare.parentElement.classList[1]
   let originalRowAsNumber = Number(originalRowAsString[originalRowAsString.length - 1])
   let currentRowAsString = tile.parentElement.classList[1]
   let currentRowAsNumber = Number(currentRowAsString[currentRowAsString.length - 1])
  if(piece.classList.contains('white'))
    if(originalRowAsNumber + 1 == currentRowAsNumber){
      return true
    } else {
      pieceStartingSquare.appendChild(piece)
      return false
    }
    if(piece.classList.contains('black'))
    if(originalRowAsNumber - 1 == currentRowAsNumber){
      return true
    } else {
      pieceStartingSquare.appendChild(piece)
      return false
    }
  
}
const checkIfCapturedPieceIsNotYourOwn = (tile,piece) => {
        if(piece.classList.contains('white') && tile.children[0].classList.contains('black') || piece.classList.contains('black') && tile.children[0].classList.contains('white')){
          tile.removeChild(tile.children[0])
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
  
  if(checkIfPieceCanMoveToThatTile(currentTile, piece)){
    if(currentTile.children.length >= 2){
      if(checkIfCapturedPieceIsNotYourOwn(currentTile,piece)) turnChange(piece)
    } else turnChange(piece)
  }
})
})

