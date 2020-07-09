import React from 'react';
import text from '../Text';
import Blocks from '../Blocks';
// import { textModelPropTypes } from '#models/propTypes/text';

const componentsToRender = { text };

const VariantContainer = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </>
  );
};

// VariantContainer.propTypes = {
//   ...textModelPropTypes,
// };

export default VariantContainer;
