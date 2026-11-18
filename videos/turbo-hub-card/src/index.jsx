import { Composition, registerRoot } from 'remotion';
import { TurboHubCard, FPS, DURATION, WIDTH, HEIGHT } from './TurboHubCard.jsx';

const Root = () => (
  <Composition
    id="TurboHubCard"
    component={TurboHubCard}
    width={WIDTH}
    height={HEIGHT}
    fps={FPS}
    durationInFrames={DURATION}
  />
);

registerRoot(Root);
