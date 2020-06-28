import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-bootstrap/Popover';

const CustomPopover = () => (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Popover</Popover.Title>
    <Popover.Content>
      {' '}
      <strong>amazing</strong> content. It's very engaging. right?
    </Popover.Content>
  </Popover>
);

CustomPopover.propTypes = {};

export default CustomPopover;
