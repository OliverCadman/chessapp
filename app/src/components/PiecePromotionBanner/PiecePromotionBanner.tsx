import React from 'react';
import { PieceColors } from '../../constants/PieceColors';
import PieceMap from '../../data/piece-map';

interface PiecePromotionBannerProps {
    color: string;
    bannerRect: {[key: string]: number};
    handleClick: (
      piece: string
    ) => void;
}

const PiecePromotionBanner: React.FC<PiecePromotionBannerProps> = 
({
    color,
    bannerRect,
    handleClick
}) => {
  const colorIndex: number = color === PieceColors.WHITE ? 0 : 1;
  const {
    queen: queenImages, 
    rook: rookImages,
    knight: knightImages, 
    bishop: bishopImages
  } = PieceMap;

  const pieceImgArray = [
    {
      piece: "q",
      color,
      imgs: queenImages
    },
    {
      piece: "r",
      color,
      imgs: rookImages
    },
    {
      piece: "n",
      color,
      imgs: knightImages
    },
    {
      piece: "b",
      color,
      imgs: bishopImages
    }
  ].map(p => ({...p, imgs: p.imgs[colorIndex]}))

  console.log(pieceImgArray)

  return (
    <div className="piece_promotion_banner__container" 
    style={{width: bannerRect.width, height: bannerRect.width / 4, left: bannerRect.left}}
    >
            <div className="piece_image__wrapper flex">
                {
                    pieceImgArray.map((p, idx) => {
                        return <button 
                        className="square flex centered" 
                        key={idx} 
                        onClick={() => handleClick(p.piece)}>
                          <img src={p.imgs} className="w-100" />
                        </button>
                    })
                }
            </div>
        </div>
  )
}

export default PiecePromotionBanner