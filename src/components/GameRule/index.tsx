import React, { useState } from 'react';

import { ReactComponent as Minus } from './assets/icon-minus.svg';
import { ReactComponent as Plus } from './assets/icon-plus.svg';

interface IGameRuleProps {
  head: string;
  body: string;
  isShown: boolean;
  handler: () => void;
}

const GameRule: React.FC<IGameRuleProps> = ({ head, body, isShown, handler }) => {
  return (
    <div className="rules_item">
      <div className="rules_head">
        <h3 className="rules_title"> {head}</h3>
        <span className="rules_opener" onClick={handler}>
          {isShown ? <Minus /> : <Plus />}
        </span>
      </div>
      {isShown && <div className="rules_body">{body}</div>}
    </div>
  );
};

export default GameRule;
