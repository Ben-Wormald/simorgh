import React, { useEffect, useState } from 'react';
import variant from '../Variant';
import Blocks from '../Blocks';

const componentsToRender = { variant };

const GeoVariantsContainer = ({ blocks, areaCode }) => {

  // console.log('HELLO areaCode', areaCode);

  const [council, setCouncil] = useState('variant-1');

  useEffect(() => {
    console.log('USE EFFECT');
    const fetchData = async (lat, lon) => {
      fetch(
        `https://locator-service.test.api.bbci.co.uk/locations?la=${lat}&lo=${lon}&rs=1&pt=region&api_key=${process.env.LOCATOR_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log('DATA 1', data);
          const geoId = data.response.results.results[0].id;
          console.log('geoid', geoId);
          return fetch(
            `https://locator-service.test.api.bbci.co.uk/locations/${geoId}/details/gss-council?api_key=${process.env.LOCATOR_API_KEY}`
          );
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('DATA', data);
          const council = data
            .response.details.find(
              (detail) => detail.data.entityTheme === "Administrative"
            );
          console.log('COUNCIL DATA', council);
          return setCouncil(council.externalId);
        })
        .catch((error) => {
          console.log("Request failed", error);
        });
    }

    console.log('ABOUT TO FETCH');
    fetchData(1, 1);
  }, []);
  // console.log('RENDERING');

  // navigator.geolocation.getCurrentPosition(success, error);

  if (!blocks) return null;

  let chosenVariant;
  chosenVariant = blocks.find(block => block.model.variantKey === areaCode);
  if (!chosenVariant) {
    chosenVariant = blocks[Math.floor(Math.random() * blocks.length)];
  }

  return (
    <>
      <Blocks blocks={[chosenVariant]} componentsToRender={componentsToRender} />
    </>
  );
};

export default GeoVariantsContainer;
