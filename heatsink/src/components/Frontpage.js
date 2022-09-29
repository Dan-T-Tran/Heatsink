import Topbar from './Topbar.js';
import Sidebar from './Sidebar.js';
import Game from './gameboard/Game.js';
import MainView from './MainView.js';
import GamePanel from './GamePanel.js';

const Frontpage = () => {


  return (
    <>
      <Topbar />
      {/* <Sidebar /> */}
      <MainView />
    </>
  )
};

export default Frontpage;