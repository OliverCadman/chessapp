import React from 'react';
import { PieceColors } from '../../constants/PieceColors';
import PieceMap from '../../data/piece-map';

interface PiecePromotionBannerProps {
    color: string;
    bannerRect: {[key: string]: number}
}

const PiecePromotionBanner: React.FC<PiecePromotionBannerProps> = 
({
    color,
    bannerRect
}) => {
  const colorIndex: number = color === PieceColors.WHITE ? 0 : 1;
  const {
    queen: queenImages, 
    rook: rookImages,
    knight: knightImages, 
    bishop: bishopImages
  } = PieceMap;

  const pieceImgArray = [
    queenImages, rookImages, knightImages, bishopImages
  ].map(images => images[colorIndex])

  return (
    <div className="piece_promotion_banner__container" 
    style={{width: bannerRect.width, height: bannerRect.width / 4, left: bannerRect.left}}
    >
            <div className="piece_image__wrapper flex">
                {
                    pieceImgArray.map((imgUrl, idx) => {
                        return <div className="square flex centered" key={idx}>
                          <img src={imgUrl} className="w-100" />
                        </div>
                    })
                }
            </div>
        </div>
  )
}

export default PiecePromotionBanner