import preloader from "../../../assets/images/preloader.gif";
import s from './Preloader.module.css'

let Preloader = (props) => {
  console.log('Preloader render')
  return (
    <div className={s.preloader  + ' preloader'}>
      <img src={preloader} alt={'preloader img'} />
    </div>
  );
};

export default Preloader;
