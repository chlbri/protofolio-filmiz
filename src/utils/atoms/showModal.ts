import { nanoid } from "nanoid";
import { atom } from "recoil";

const showModal = atom({key:nanoid(), default:false});

export default showModal;