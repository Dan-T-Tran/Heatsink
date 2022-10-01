import { useDispatch } from 'react-redux';

const Credits = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: 'screen', payload: 'title' });
  }

  return (
    <div className='credits'>
      <h1>Sound</h1>
      <p><u>Spirit of Avarice</u> from Touhou 13: Ten Desires</p>
      <p><u>Battle of the Basement -Innocence-</u> from Touhou: Mystical Chain</p>
      <p><u>Player's Score</u> from Touhou 10: Mountain of Faith</p>
      <p>Sound effects from Touhou 11: Subterranean Animism and Touhou 9.5: Shoot the Bullet</p>
      <h1>Sprites</h1>
      <p>Gundam + Zaku sprites from <a href='http://shrines.rpgclassics.com/snes/msgcd/sprites.shtml'>shrines.rpgclassics.com</a></p>
      <p>Some bullet sprites from <a href='https://opengameart.org/content/bullet-collection-2-m484-games'>opengameart.org</a></p>
      <p>Other bullet sprites from Google Images</p>
      <p>Forest background from <a href='https://www.istockphoto.com/vector/seamless-green-forest-gm583853510-99933785'>istockphoto.com</a></p>
      <h1>Inspiration</h1>
      <p>Touhou Project</p>
      <p>Ikaruga</p>
      <p>Suguri series</p>
      <button className='credits-button' onClick={handleClick}>Back to Title</button>
    </div>
  )
};

export default Credits;
