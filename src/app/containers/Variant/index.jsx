import React from 'react';
import text from '../Text';
import Blocks from '../Blocks';

const componentsToRender = { text };

const VariantContainer = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </>
  );
};

export default VariantContainer;
