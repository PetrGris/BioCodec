'use strict';

var designSystem = require('@strapi/design-system');
var styledComponents = require('styled-components');

const BoxWrapper = styledComponents.styled(designSystem.Box)`
  table {
    width: 100%;
    white-space: nowrap;
  }

  thead {
    border-bottom: 1px solid ${({ theme })=>theme.colors.neutral150};

    tr {
      border-top: 0;
    }
  }

  tr {
    border-top: 1px solid ${({ theme })=>theme.colors.neutral150};

    & td,
    & th {
      padding: ${({ theme })=>theme.spaces[4]};
    }

    & td:first-of-type,
    & th:first-of-type {
      padding: 0 ${({ theme })=>theme.spaces[1]};
    }
  }

  th,
  td {
    vertical-align: middle;
    text-align: left;
    color: ${({ theme })=>theme.colors.neutral600};
    outline-offset: -4px;
  }
`;

exports.BoxWrapper = BoxWrapper;
//# sourceMappingURL=BoxWrapper.js.map
