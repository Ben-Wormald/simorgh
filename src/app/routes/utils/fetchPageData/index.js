import HttpClient from '@bbc/http-client';
import nodeLogger from '#lib/logger.node';
import onClient from '#lib/utilities/onClient';
import { getQueryString, getUrlPath } from '#lib/utilities/urlParser';
import getBaseUrl from './utils/getBaseUrl';
import isLive from '#lib/utilities/isLive';
import {
  DATA_REQUEST_RECEIVED,
  DATA_NOT_FOUND,
  DATA_FETCH_ERROR,
} from '#lib/logger.const';
import { response } from 'express';

const httpClient = new HttpClient();

const useTestOptimo = false

const logger = nodeLogger(__filename);
const STATUS_OK = 200;
const STATUS_BAD_GATEWAY = 502;
const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_NOT_FOUND = 404;
const upstreamStatusCodesToPropagate = [STATUS_OK, STATUS_NOT_FOUND];

const ampRegex = /.amp$/;

const baseUrl = onClient()
  ? getBaseUrl(window.location.origin)
  : process.env.SIMORGH_BASE_URL;

export const getUrl = pathname => {
  if (!pathname) return '';

  if (useTestOptimo) {
    const pathnameParts = pathname.split('/');
    return `https://optimo.test.api.bbci.co.uk/assets/${pathnameParts[pathnameParts.length - 1]}`;
  }

  const params = isLive() ? '' : getQueryString(pathname);
  const basePath = getUrlPath(pathname);

  return `${baseUrl}${basePath.replace(ampRegex, '')}.json${params}`; // Remove .amp at the end of pathnames for AMP pages.
};

const handleResponse = url => async response => {
  const { status } = response;

  if (upstreamStatusCodesToPropagate.includes(status)) {
    if (status === STATUS_NOT_FOUND) {
      logger.error(DATA_NOT_FOUND, {
        url,
        status,
      });
    }

    return {
      status,
      ...(status === STATUS_OK && {
        json: await response.json(),
      }),
    };
  }

  throw new Error(
    `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`,
  );
};

const handleOptimoResponse = optimoAsset => ({
  status: 200,
  json: {
    content: JSON.parse(optimoAsset),
    metadata: {
      "analyticsLabels": {},
      "blockTypes": [
        "headline",
        "text",
        "paragraph",
        "fragment",
        "image",
        "rawImage",
        "altText",
        "urlLink",
        "subheadline",
        "caption"
      ],
      "createdBy": "News",
      "firstPublished": 1539188371344,
      "id": "urn:bbc:ares::article:c6v11qzyv8po",
      "language": "en-gb",
      "lastPublished": 1539188371344,
      "lastUpdated": 1552558371324,
      "locators": {
        "canonicalUrl": "https://www.bbc.com/news/articles/c6v11qzyv8po",
        "optimoUrn": "urn:bbc:optimo:asset:c6v11qzyv8po"
      },
      "options": {},
      "passport": {
        "home": "http://www.bbc.co.uk/ontologies/passport/home/News",
        "language": "en-gb"
      },
      "tags": {
        "about": [
          {
            "thingId": "18fe6fd7-1aa4-4a35-961f-d037c667eb61",
            "thingLabel": "Queen Victoria",
            "thingSameAs": [
              "http://dbpedia.org/resource/Queen_Victoria",
              "http://rdf.freebase.com/ns/m.0cw10",
              "http://www.wikidata.org/entity/Q9439"
            ],
            "thingType": [
              "Person",
              "Thing"
            ],
            "thingUri": "http://www.bbc.co.uk/things/18fe6fd7-1aa4-4a35-961f-d037c667eb61#id"
          },
          {
            "thingId": "2351f2b2-ce36-4f44-996d-c3c4f7f90eaa",
            "thingLabel": "Wedding of Prince Harry and Meghan Markle",
            "thingSameAs": [],
            "thingType": [
              "Event",
              "Thing"
            ],
            "thingUri": "http://www.bbc.co.uk/things/2351f2b2-ce36-4f44-996d-c3c4f7f90eaa#id"
          },
          {
            "thingId": "6ef8f9fc-237c-4b1f-843b-908a89d34a0e",
            "thingLabel": "Kate Middleton",
            "thingSameAs": [
              "http://dbpedia.org/resource/Catherine%2C_Duchess_of_Cambridge",
              "http://rdf.freebase.com/ns/m.05mnc3",
              "http://www.wikidata.org/entity/Q10479"
            ],
            "thingType": [
              "Person",
              "Thing"
            ],
            "thingUri": "http://www.bbc.co.uk/things/6ef8f9fc-237c-4b1f-843b-908a89d34a0e#id"
          },
          {
            "curationList": [
              {
                "curationId": "06912d9a-26a9-4474-bdb6-f623d1f6a416",
                "curationType": "vivo-stream"
              }
            ],
            "thingId": "803eaeb9-c0c3-4f1b-9a66-90efac3df2dc",
            "thingLabel": "Duchess of Sussex",
            "thingSameAs": [
              "http://dbpedia.org/resource/Meghan_Markle"
            ],
            "thingType": [
              "Person",
              "Thing"
            ],
            "thingUri": "http://www.bbc.co.uk/things/803eaeb9-c0c3-4f1b-9a66-90efac3df2dc#id",
            "topicId": "cg3mq45zq4xt",
            "topicName": "Duchess of Sussex"
          },
          {
            "thingId": "b2412496-55d2-43ab-9a76-d205428090e2",
            "thingLabel": "Diana, Princess of Wales",
            "thingSameAs": [
              "http://dbpedia.org/resource/Diana,_Princess_of_Wales",
              "http://musicbrainz.org/artist/5c216e1a-cfda-445a-b6cd-c30b90b12bb8#_",
              "http://www.imdb.com/name/nm0697740/",
              "http://www.wikidata.org/entity/Q9685"
            ],
            "thingType": [
              "Person",
              "Thing"
            ],
            "thingUri": "http://www.bbc.co.uk/things/b2412496-55d2-43ab-9a76-d205428090e2#id"
          },
          {
            "thingId": "e248c597-4f16-40f9-8313-678e7e911891",
            "thingLabel": "Westminster Abbey",
            "thingSameAs": [
              "http://dbpedia.org/resource/Westminster_Abbey",
              "http://sws.geonames.org/6618996/",
              "http://www.wikidata.org/entity/Q5933"
            ],
            "thingType": [
              "Place",
              "Thing"
            ],
            "thingUri": "http://www.bbc.co.uk/things/e248c597-4f16-40f9-8313-678e7e911891#id"
          }
        ]
      },
      "type": "article",
      "version": "v1.0.4"
    },
    promo: {
      "headlines": {
        "seoHeadline": optimoAsset.meta.seoHeadline,
      },
      "id": "urn:bbc:ares::article:c6v11qzyv8po",
      "locators": {
        "canonicalUrl": "https://www.bbc.com/news/articles/c6v11qzyv8po",
        "optimoUrn": "urn:bbc:optimo:asset:c6v11qzyv8po"
      },
      "summary": {
        "blocks": [
          {
            "model": {
              "blocks": [
                {
                  "model": {
                    "blocks": [
                      {
                        "model": {
                          "attributes": [],
                          "text": ""
                        },
                        "type": "fragment"
                      }
                    ],
                    "text": ""
                  },
                  "type": "paragraph"
                }
              ]
            },
            "type": "text"
          }
        ]
      },
      "timestamp": 1539188371344,
      "type": "cps"
    },
    relatedContent: {
      "groups": [],
      "site": {
        "name": "News",
        "subType": "site",
        "type": "simple",
        "uri": "/news"
      }
    },
  },
});

const handleError = e => {
  const error = e.toString();

  logger.error(DATA_FETCH_ERROR, { error });

  return {
    error,
    status: onClient() ? STATUS_BAD_GATEWAY : STATUS_INTERNAL_SERVER_ERROR,
  };
};

const fetchData = pathname => {
  const url = getUrl(pathname);

  logger.info(DATA_REQUEST_RECEIVED, { url });

  if (useTestOptimo) {
    return httpClient.get(url).then(handleOptimoResponse).catch(handleError);
  } else {
    return fetch(url).then(handleResponse(url)).catch(handleError);
  }
};

export default fetchData;
