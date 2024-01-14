'use client';

import { mobileWidth } from '@/constants';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import DesktopHeader from './DesktopHeader/DesktopHeader';
import MobileHeader from './MobileHeader/MobileHeader';

export default function Header() {
  const { width } = useWindowDimensions();
  return <>{width > mobileWidth ? <DesktopHeader /> : <MobileHeader />}</>;
}
