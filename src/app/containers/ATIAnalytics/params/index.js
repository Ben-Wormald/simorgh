import {
  buildArticleATIParams,
  buildArticleATIUrl,
} from './article/buildParams';
import {
  buildTvRadioATIParams,
  buildTvRadioATIUrl,
} from './tvRadioPage/buildParams';
import {
  buildCpsAssetPageATIParams,
  buildCpsAssetPageATIUrl,
} from './cpsAssetPage/buildParams';
import {
  buildMostReadATIParams,
  buildMostReadATIUrl,
} from './mostReadPage/buildParams';
import {
  buildIndexPageATIParams,
  buildIndexPageATIUrl,
} from './indexPage/buildParams';

const ARTICLE_MEDIA_ASSET = 'article-media-asset';
const ARTICLE_PHOTO_GALLERY = 'article-photo-gallery';

const pageTypeUrlBuilders = {
  article: buildArticleATIUrl,
  frontPage: buildIndexPageATIUrl,
  liveRadio: buildTvRadioATIUrl,
  onDemandRadio: buildTvRadioATIUrl,
  onDemandTV: buildTvRadioATIUrl,
  mostRead: buildMostReadATIUrl,
  IDX: buildIndexPageATIUrl,
  MAP: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIUrl(
      data,
      requestContext,
      serviceContext,
      ARTICLE_MEDIA_ASSET,
    ),
  PGL: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIUrl(
      data,
      requestContext,
      serviceContext,
      ARTICLE_PHOTO_GALLERY,
    ),
};

const pageTypeParamBuilders = {
  article: buildArticleATIParams,
  frontPage: buildIndexPageATIParams,
  liveRadio: buildTvRadioATIParams,
  onDemandRadio: buildTvRadioATIParams,
  onDemandTV: buildTvRadioATIParams,
  mostRead: buildMostReadATIParams,
  IDX: buildIndexPageATIParams,
  MAP: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIParams(
      data,
      requestContext,
      serviceContext,
      ARTICLE_MEDIA_ASSET,
    ),
  PGL: (data, requestContext, serviceContext) =>
    buildCpsAssetPageATIParams(
      data,
      requestContext,
      serviceContext,
      ARTICLE_PHOTO_GALLERY,
    ),
};

const createBuilderFactory = (requestContext, pageTypeHandlers) => {
  const { pageType } = requestContext;

  return pageTypeHandlers[pageType];
};

export const buildATIUrl = (data, requestContext, serviceContext) => {
  const buildUrl = createBuilderFactory(requestContext, pageTypeUrlBuilders);

  return buildUrl(data, requestContext, serviceContext);
};

export const buildATIClickParams = (data, requestContext, serviceContext) => {
  const buildParams = createBuilderFactory(
    requestContext,
    pageTypeParamBuilders,
  );

  return buildParams(data, requestContext, serviceContext);
};

export default buildATIUrl;
