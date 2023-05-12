import { useInView } from 'react-intersection-observer';
import { useSpring, animated, config } from 'react-spring';

const Feature = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const animation = useSpring({
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(80px)',
    },
    config: {
        tension: 200,
        friction: 200
    }
  });

  return (
    <animated.div style={animation} ref={ref}>
      {children}
    </animated.div>
  );
};

export default Feature;
