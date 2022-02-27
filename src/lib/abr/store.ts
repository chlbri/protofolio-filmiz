import zx from '@bemedev/middleware-zustand-xstate-fsm';
import create from 'zustand';
import { machine } from './machine';

const useAppMachine = create(zx(machine));

export default useAppMachine;
