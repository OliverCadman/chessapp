import FullHeightContainer from '../../components/FullHeightContainer/FullHeightContainer';
import Board from '../../components/Board/Board';

import useArenaState from '../../store/arena';

const Arena = () => {

    const gameBoard = useArenaState((state) => state.board);
    gameBoard.init();

  return (
    <FullHeightContainer extraClasses='flex centered'>
        <Board />
    </FullHeightContainer>
  )
}

export default Arena