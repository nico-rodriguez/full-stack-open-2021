import PropTypes from 'prop-types';

import { useState } from 'react';

function Togglable({ buttonLabel, children }) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <>
      <div style={hideWhenVisible}>
        <button type="button" onClick={() => setVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={() => setVisible(false)}>Cancel</button>
      </div>
    </>
  );
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
