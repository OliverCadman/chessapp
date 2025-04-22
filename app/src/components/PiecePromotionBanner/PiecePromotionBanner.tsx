import React from 'react';
import { PieceColors } from '../../constants/PieceColors';
import PieceMap from '../../data/piece-map';

interface PiecePromotionBannerProps {
    color: string;
    bannerWidth: number;
}

const PiecePromotionBanner: React.FC<PiecePromotionBannerProps> = 
({
    color,
    bannerWidth
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
    <div className="piece_promotion_banner__container" style={{width: bannerWidth, height: bannerWidth / 4}}>
            <div className="piece_image__wrapper flex">
                {
                    pieceImgArray.map(imgUrl => {
                        return <div className="square flex centered">
                          <img src={imgUrl} className="w-100" />
                        </div>
                    })
                }
            </div>
        </div>
  )
}

export default PiecePromotionBanner