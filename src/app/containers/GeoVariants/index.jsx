import React from 'react';
import variant from '../Variant';
import Blocks from '../Blocks';

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

export default GeoVariantsContainer;
