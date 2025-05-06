import { jsx } from 'react/jsx-runtime';
import { Box, Flex, Avatar } from '@strapi/design-system';
import { Folder } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';
import { AssetType } from '../../constants.mjs';
import { createAssetUrl } from '../../utils/createAssetUrl.mjs';
import 'byte-size';
import 'date-fns';
import { getTrad } from '../../utils/getTrad.mjs';
import 'qs';
import { getFileExtension } from '../../utils/getFileExtension.mjs';
import { prefixFileUrlWithBackendUrl } from '../../utils/prefixFileUrlWithBackendUrl.mjs';
import '../../utils/urlYupSchema.mjs';
import { VideoPreview } from '../AssetCard/VideoPreview.mjs';

const VideoPreviewWrapper = styled(Box)`
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
    const { formatMessage } = useIntl();
    if (type === 'folder') {
        return /*#__PURE__*/ jsx(Flex, {
            justifyContent: "center",
            background: "secondary100",
            width: "3.2rem",
            height: "3.2rem",
            borderRadius: "50%",
            children: /*#__PURE__*/ jsx(Folder, {
                "aria-label": formatMessage({
                    id: getTrad('header.actions.add-assets.folder'),
                    defaultMessage: 'folder'
                }),
                fill: "secondary500",
                width: "1.6rem",
                height: "1.6rem"
            })
        });
    }
    const { alternativeText, ext, formats, mime, name, url } = content;
    if (mime?.includes(AssetType.Image)) {
        const mediaURL = prefixFileUrlWithBackendUrl(formats?.thumbnail?.url) ?? prefixFileUrlWithBackendUrl(url);
        return /*#__PURE__*/ jsx(Avatar.Item, {
            src: mediaURL,
            alt: alternativeText || undefined,
            preview: true,
            fallback: alternativeText
        });
    }
    if (mime?.includes(AssetType.Video)) {
        return /*#__PURE__*/ jsx(VideoPreviewWrapper, {
            children: /*#__PURE__*/ jsx(VideoPreview, {
                url: createAssetUrl(content, true) || '',
                mime: mime,
                alt: alternativeText ?? name
            })
        });
    }
    return /*#__PURE__*/ jsx(Box, {
        background: "secondary100",
        color: "secondary600",
        width: "3.2rem",
        height: "3.2rem",
        children: getFileExtension(ext)
    });
};

export { PreviewCell };
//# sourceMappingURL=PreviewCell.mjs.map
