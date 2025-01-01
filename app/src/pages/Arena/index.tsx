import React from 'react';
import FullHeightContainer from '../../components/FullHeightContainer/FullHeightContainer';
import Board from '../../components/Board/Board';

const Arena = () => {
  return (
    <FullHeightContainer extraClasses='flex centered'>
        <Board />
    </FullHeightContainer>
  )
}

export default Arena