import { useEffect, useState, useCallback } from 'react';

/** Homepage sections (below hero): animate when more of the block is in view ,  feels more gradual on scroll. */
export const HOME_SECTION_IN_VIEW_THRESHOLD = 0.18;
export const HOME_SECTION_IN_VIEW_ROOT_MARGIN = '0px 0px -16% 0px';

/** Hero: slightly earlier trigger so first paint still feels responsive. */
export const HOME_HERO_IN_VIEW_THRESHOLD = 0.1;
export const HOME_HERO_IN_VIEW_ROOT_MARGIN = '0px 0px -6% 0px';

/**
 * Third argument for `useInView`: elements lose/regain visibility when scrolling past and back
 * (replay entrance motion). Default is one-shot (`once: true`).
 */
export const USE_IN_VIEW_REPEAT = Object.freeze({ once: false });

/**
 * Observes an element and reports whether it intersects the viewport.
 *
 * @param {number} [threshold=0.12]
 * @param {string} [rootMargin='0px 0px -8% 0px']
 * @param {{ once?: boolean }} [options]
 * @param {boolean} [options.once=true] If true (default), sets visible once and disconnects.
 *   If false, keeps observing and sets visible from `entry.isIntersecting` (scroll up/down).
 */
export function useInView(threshold = 0.12, rootMargin = '0px 0px -8% 0px', options = {}) {
  const once = options.once !== false;
  const [node, setNode] = useState(null);
  const [visible, setVisible] = useState(false);

  const setRef = useCallback((el) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return undefined;

    if (!once) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting);
        },
        { threshold, rootMargin }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }

    if (visible) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold, rootMargin, once, visible]);

  return [setRef, visible];
}
