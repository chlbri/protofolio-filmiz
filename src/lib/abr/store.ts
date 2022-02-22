import { machine } from "./machine";
import create from "zustand";
import zx from "zustand-middleware-xstate";

const useAppMachine = create(zx(machine));

export default useAppMachine;
