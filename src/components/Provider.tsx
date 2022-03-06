import { useInterpret } from '@xstate/react';
import { FC } from 'react';
import { machine } from '../lib/abr/machine';
import MachineContext from '../lib/adapters';

const Provider: FC = ({ children }) => {
  const value = useInterpret(
    machine.withConfig({
      services: {},
    }),
  );
  return (
    <MachineContext.Provider {...{ value }}>
      {children}
    </MachineContext.Provider>
  );
};

export default Provider;
