const pieces = document.querySelectorAll('.draggable')
const tiles = document.querySelectorAll('.tile')
const blackPieces = document.querySelectorAll('.black')
const whitePieces = document.querySelectorAll('.white')
let pieceStartingSquare;
let isValidCapture = true;
pieces.forEach(piece => {
  piece.addEventListener('dragstart', (e) => {
    piece.classList.add('dragging')
    pieceStartingSquare = piece.parentElement
  })
})

tiles.forEach(tile => {
  tile.addEventListener('dragover', (e) => {
    e.preventDefault()
    const piece = document.querySelector('.dragging')
    tile.classList.add('lighten')
        tile.appendChild(piece)
      piece.addEventListener('dragend', () => {
        tile.classList.remove('lighten')
        piece.classList.remove('dragging')
        const currentTile = piece.parentElement
        if(currentTile.children.length >= 2){
        if(checkIfCapturedPieceIsNotYourOwn(currentTile,piece)){
          turnChange(piece)
        }
      } else turnChange(piece)
    })
  })
  tile.addEventListener('dragover', (e) => {
    tiles.forEach(tile => {
      if(e.currentTarget != tile) tile.classList.remove('lighten')
    })
  })
})
const turnChange = (piece) => {
  if(pieceStartingSquare != piece.parentElement){ 
    if(piece.classList.contains('white')){
      whitePieces.forEach(whitePiece => whitePiece.setAttribute("draggable",false))
      blackPieces.forEach(blackPiece => blackPiece.setAttribute("draggable",true))
    } else {
      blackPieces.forEach(blackPiece => blackPiece.setAttribute("draggable",false))
      whitePieces.forEach(whitePiece => whitePiece.setAttribute("draggable",true))
    }
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
    
