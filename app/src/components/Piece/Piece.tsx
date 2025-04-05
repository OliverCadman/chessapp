import React from "react";
import { useDraggable } from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"
import { PieceData } from "../../common/types/PieceData";


interface IPiece {
  isWhite: boolean;
  whitePerspective: boolean;
  whiteTurnToMove: boolean;
  pieceImgUrls: string[] | null;
  pieceName: string;
  pieceId: string;
  pieceColor: string;
  coordinates: { [key: string]: number };
  notation: string;
  inCheck: boolean;
}

const Piece: React.FC<IPiece> = ({
  isWhite,
  whitePerspective,
  pieceImgUrls,
  pieceName,
  pieceId,
  pieceColor,
  coordinates,
  whiteTurnToMove,
  notation,
  inCheck
}) => {

  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: pieceId,
    data: {
      isWhite,
      pieceName,
      pieceId,
      pieceColor,
      coordinates,
      notation,
      whiteTurnToMove
    } as PieceData
  })

  // console.log(cursorOffset)

  // let x, y, parent;
  // activatorEvent && (
  //   parent = activatorEvent.target.parentElement.getBoundingClientRect()
  //   x = e.clientX - parentRect.left - draggable.offsetWidth / 2;
  //   y = e.clientY - parentRect.top - draggable.offsetHeight / 2;
  // )

  // console.log(activatorEvent)
  // console.log(transform)


  const style = transform ? {
  
    transform: `translate(${transform.x}px, ${transform.y}px)`
   } : undefined;
  


  const colorIndex = isWhite ? 0 : 1;
  return pieceImgUrls ? (
      <img
      className={`piece`}
      style={style}
      src={pieceImgUrls[colorIndex]}
      alt={`${whitePerspective ? "White" : "Black"} ${pieceName}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}

    />
  ) : (
    ""
  );
};

export default Piece;
