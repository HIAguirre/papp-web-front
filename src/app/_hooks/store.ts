import { create } from "zustand";

type State = {
  user?: User;
  setUser: (user: User) => void;
  removeUser: () => void;
};

type User = {
  name?: string;
  token?: string;
  username?: string;
  email?: string;
  role?: string;
};

const useStore = create<State>((set) => ({
  setUser: (user: User) => set(() => ({ user })),
  removeUser: () => set(() => ({ user: undefined })),
}));

export default useStore;
