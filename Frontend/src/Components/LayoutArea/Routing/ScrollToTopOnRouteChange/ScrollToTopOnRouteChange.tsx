import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTopOnRouteChange(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    const layout = document.querySelector('.Layout');
    if (layout) {
      layout.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

export default ScrollToTopOnRouteChange;
