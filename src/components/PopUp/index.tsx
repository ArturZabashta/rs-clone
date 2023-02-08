import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/userHooks';

const PopUp: React.FC = () => {
  const [styles, setStyles] = useState('popUp popUp__disabled');
  const popUpMsg = useAppSelector((store) => store.ui.popUpMsg);
  useEffect(() => {
    setStyles('popUp');
    setTimeout(() => {
      setStyles('popUp popUp__disabled');
    }, 3000);
  }, [popUpMsg]);

  return (
    <section className={styles}>
      <span>{popUpMsg}</span>
    </section>
  );
};
export default PopUp;
