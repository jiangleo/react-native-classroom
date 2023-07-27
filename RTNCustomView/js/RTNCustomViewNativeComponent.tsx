import type {ViewProps, HostComponent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  background?: string;
}

export default codegenNativeComponent<NativeProps>(
  'RTNCustomView',
) as HostComponent<NativeProps>;
