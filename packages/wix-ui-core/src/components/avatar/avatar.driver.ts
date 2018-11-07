import { UniDriver } from "unidriver";
import {
  BaseUniDriver,
  baseUniDriverFactory
} from "wix-ui-test-utils/base-driver";

import { ContentType } from './types';

export interface AvatarDriver extends BaseUniDriver {
  /** Get the displayed content type. Types are: 'text', 'icon', 'image' */
  getContentType: () => Promise<ContentType>;
  /** Get the text content (generated initials) */
  getTextContent: ()=> Promise<string>;
}

export const avatarDriverFactory = (base: UniDriver): AvatarDriver => {
  const getContentType = ()=> base.attr('data-content-type') as Promise<ContentType>;

  return {
    ...baseUniDriverFactory(base),
    getContentType,
    getTextContent: async ()=> (await getContentType()) === 'text' 
      ? base.$(':first-child').text() 
      : undefined
  }
};
