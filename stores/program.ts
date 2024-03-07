import { defineStore } from "pinia";

export const useProgramStore = defineStore({
  id: "myProgramStore",
  state: () => ({ programList: [] as string[] }),
  getters: {
    getProgram: (state): string[] => state.programList,
  },
  actions: {
    addProgram(data: string) {
      this.deleteProgram(data);
      this.programList.push(data);
      console.log(this.programList);
    },
    deleteProgram(data: string) {
      this.programList = this.programList.filter((e: string) => data !== e);
    },
  },
});
