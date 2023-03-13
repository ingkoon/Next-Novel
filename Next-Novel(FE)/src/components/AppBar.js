import './AppBar.css'
import DehazeIcon from '@mui/icons-material/Dehaze';

function AppBar(){
  return (
    <div className="Appbar">
      <div className='name'>
        <span style={{float : 'left'}}>
          내가 그린 AI 소설
        </span>
      </div>
      <div className='logo'>
        <img src={process.env.PUBLIC_URL + '/img/logo.png'}></img>
      </div>
      <div className='menudiv'>
        <DehazeIcon className='menu'/>
      </div>
      
    </div>
  )
}

export default AppBar;