import React from 'react';
import Button from 'grommet/components/Button';
import Tooltip from 'react-toolbox/lib/tooltip';

const TooltipButton = Tooltip((props) => {
  const {theme, ...restProps} = props;
  return <Button {...restProps} />;
});

export default TooltipButton;