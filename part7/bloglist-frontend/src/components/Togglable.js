import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { useState } from 'react';

function Togglable({ buttonLabel, children }) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <>
      <div style={hideWhenVisible}>
        <Button type='button' onClick={() => setVisible(true)}>
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button type='button' onClick={() => setVisible(false)}>
          Cancel
        </Button>
      </div>
    </>
  );
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
