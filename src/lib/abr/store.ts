import zx from 'zustand-middleware-xstate';
import create from 'zustand';
import { machine } from './machine';

const useAppMachine = create(zx(machine));

export default useAppMachine;
