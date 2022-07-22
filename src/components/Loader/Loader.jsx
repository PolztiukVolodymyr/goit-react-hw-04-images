import { Puff } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
   return (
      <div className={css.BoxLoader}>
         <Puff color="#00BFFF" height={80} width={80} />        
      </div>
   );
}