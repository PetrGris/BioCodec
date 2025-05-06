'use strict';

var jsxRuntime = require('react/jsx-runtime');
var designSystem = require('@strapi/design-system');
var icons = require('@strapi/icons');
var reactIntl = require('react-intl');
var styledComponents = require('styled-components');
var constants = require('../../constants.js');
var createAssetUrl = require('../../utils/createAssetUrl.js');
require('byte-size');
require('date-fns');
var getTrad = require('../../utils/getTrad.js');
require('qs');
var getFileExtension = require('../../utils/getFileExtension.js');
var prefixFileUrlWithBackendUrl = require('../../utils/prefixFileUrlWithBackendUrl.js');
require('../../utils/urlYupSchema.js');
var VideoPreview = require('../AssetCard/VideoPreview.js');

const VideoPreviewWrapper = styledComponents.styled(designSystem.Box)`
  figure {
    width: ${({ theme })=>theme.spaces[7]};
    height: ${({ theme })=>theme.spaces[7]};
  }

  canvas,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const PreviewCell = ({ type, content })=>{
    const { formatMessage } = reactIntl.useIntl();
    if (type === 'folder') {
        return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
            justifyContent: "center",
            background: "secondary100",
            width: "3.2rem",
            height: "3.2rem",
            borderRadius: "50%",
            children: /*#__PURE__*/ jsxRuntime.jsx(icons.Folder, {
                "aria-label": formatMessage({
                    id: getTrad.getTrad('header.actions.add-assets.folder'),
                    defaultMessage: 'folder'
                }),
                fill: "secondary500",
                width: "1.6rem",
                height: "1.6rem"
            })
        });
    }
    const { alternativeText, ext, formats, mime, name, url } = content;
    if (mime?.includes(constants.AssetType.Image)) {
        const mediaURL = prefixFileUrlWithBackendUrl.prefixFileUrlWithBackendUrl(formats?.thumbnail?.url) ?? prefixFileUrlWithBackendUrl.prefixFileUrlWithBackendUrl(url);
        return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Avatar.Item, {
            src: mediaURL,
            alt: alternativeText || undefined,
            preview: true,
            fallback: alternativeText
        });
    }
    if (mime?.includes(constants.AssetType.Video)) {
        return /*#__PURE__*/ jsxRuntime.jsx(VideoPreviewWrapper, {
            children: /*#__PURE__*/ jsxRuntime.jsx(VideoPreview.VideoPreview, {
                url: createAssetUrl.createAssetUrl(content, true) || '',
                mime: mime,
                alt: alternativeText ?? name
            })
        });
    }
    return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
        background: "secondary100",
        color: "secondary600",
        width: "3.2rem",
        height: "3.2rem",
        children: getFileExtension.getFileExtension(ext)
    });
};

exports.PreviewCell = PreviewCell;
//# sourceMappingURL=PreviewCell.js.map
