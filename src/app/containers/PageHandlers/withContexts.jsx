import React from 'react';
import { bool, element, string } from 'prop-types';
import variantPropType from '../../models/propTypes/variants';

// context providers
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { UserContextProvider } from '../../contexts/UserContext';

const WithContexts = Component => {
  const WithContextsContainer = props => {
    const {
      bbcOrigin,
      id,
      service,
      isAmp,
      pageType,
      pathname,
      previousPath,
      variant,
    } = props;
    return (
      <ToggleContextProvider>
        <ServiceContextProvider service={service} variant={variant}>
          <RequestContextProvider
            bbcOrigin={bbcOrigin}
            id={id}
            isAmp={isAmp}
            pageType={pageType}
            service={service}
            pathname={pathname}
            previousPath={previousPath}
            variant={variant}
          >
            <UserContextProvider>
              <Component {...props} />
            </UserContextProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    );
  };

  WithContextsContainer.propTypes = {
    bbcOrigin: string,
    id: string,
    isAmp: bool.isRequired,
    pageType: string.isRequired,
    pathname: string.isRequired,
    previousPath: string,
    service: string.isRequired,
    variant: variantPropType,
  };

  WithContextsContainer.defaultProps = {
    bbcOrigin: null,
    id: null,
    previousPath: null,
    variant: null,
  };

  return WithContextsContainer;
};

WithContexts.propTypes = {
  Component: element,
};

export default WithContexts;