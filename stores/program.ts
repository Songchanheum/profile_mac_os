import { defineStore } from "pinia";

export const useProgramStore = defineStore({
  id: "myProgramStore",
  state: () => ({ programList: [] as string[] }),
  getters: {
    getProgram: (state): string[] => state.programList,
    getCurrentProgram: (state): string =>
      state.programList[state.programList.length - 1],
  },
  actions: {
    addProgram(data: string) {
      this.deleteProgram(data);
      this.programList.push(data);
    },
    deleteProgram(data: string) {
      this.programList = this.programList.filter((e: string) => data !== e);
    },
  },
});
