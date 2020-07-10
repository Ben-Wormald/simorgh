import React from 'react';
import variant from '../Variant';
import Blocks from '../Blocks';

const componentsToRender = { variant };

const GeoVariantsContainer = ({ blocks }) => {

  const fetchData = (lat, lon) => {
    fetch(
      `https://locator-service.test.api.bbci.co.uk/locations?la=${lat}&lo=${lon}&rs=1&pt=region&api_key=xxxx`
    )
    .then((response) => response.json())
    .then((data) => {
      const geoId = data.response.results.results[0].id;
      return fetch(
        `https://locator-service.api.bbci.co.uk/locations/${geoId}/details/gss-council?api_key=xxxxx`
      );
    })
    .then((response) => response.json())
    .then((data) => {
      const council = data
        .response.details.find(
          (detail) => detail.data.entityTheme === "Administrative"
        );
      return setCouncil(council.externalId);
    })
    .catch((error) => {
      console.log("Request failed", error);
    });
  }

  navigator.geolocation.getCurrentPosition(success, error);

  function success(pos) {
    const {latitude, longitude} = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    fetchData(latitude, longitude);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  if (!blocks) return null;

  const chosenVariant = blocks.find(block => block.model.variantKey === 'variant-2');

  return (
    <>
      <Blocks blocks={[chosenVariant]} componentsToRender={componentsToRender} />
    </>
  );
};

export default GeoVariantsContainer;
