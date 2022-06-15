import { FC } from "react";
import preloader from "../../../assets/images/preloader.gif";
import s from './Preloader.module.css'

let Preloader: FC<object> = (props) => {
  return (
    <div className={s.preloader  + ' preloader'}>
      <img src={preloader} alt={'preloader img'} />
    </div>
  );
};

export default Preloader;
