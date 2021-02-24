import { tileUtils } from 'ps-solution-library-ui-common';

// Set the public path for static resource so they will correctly resolve to 
// the /resources/addon/<addonID...> folder instead of /gadgets/. Since this 
// value is not known at compile time, it must by dyamically provided to 
// webpack at runtime.
__webpack_public_path__ = tileUtils.getAddonUrl() + "/";