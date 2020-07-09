import React from 'react';
import variant from '../Variant';
import Blocks from '../Blocks';
// import { textModelPropTypes } from '#models/propTypes/text';

const componentsToRender = { variant };

const GeoVariantsContainer = ({ blocks }) => {
  if (!blocks) return null;

  const chosenVariant = blocks.find(block => block.model.variantKey === 'variant-2');

  return (
    <>
      <Blocks blocks={[chosenVariant]} componentsToRender={componentsToRender} />
    </>
  );
};

// GeoVariantsContainer.propTypes = {
//   ...textModelPropTypes,
// };

export default GeoVariantsContainer;
