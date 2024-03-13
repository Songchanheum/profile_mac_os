export const PROGRAM_LIST = [
  {
    name: "Finder",
    img: "finder.png",
    comp: true,
  },
  { name: "Launchpad", img: "launchpad.png", comp: true },
  {
    name: "Chrome",
    img: "chrome.svg",
    src: "https://www.google.com/webhp?igu=1",
    size: "large",
  },
  {
    name: "Visual Studio Code",
    img: "vscode.png",
    src: "https://github1s.com/Songchanheum/profile_mac_os/blob/main/pages/index.vue",
    size: "large",
  },
  {
    name: "Songs blog",
    img: "blog.png",
    src: "https://songsblog.vercel.app/",
    size: "large",
  },
  {
    name: "Portfolio",
    img: "profile.png",
    src: "https://songsintroduce.vercel.app/main",
    size: "large",
  },
  {
    name: "DailyDev",
    img: "dailydev.png",
    src: "https://songsintroduce.vercel.app/",
    size: "small-fix",
  },
  { name: "Message", img: "message.png", size: "small-fix", comp: true },
  { name: "Resume", size: "large", comp: true },
  { name: "Contact Me", size: "small", comp: true },
];

type ProgramSize = {
  width: string;
  height: string;
  halfWidth: string;
  halfHeight: string;
};

export const FULL_SIZE: ProgramSize = {
  width: "100%",
  height: "calc(100% - 62px)",
  halfWidth: "50%",
  halfHeight: "50%",
};
export const SMALL_SIZE: ProgramSize = {
  width: "40%",
  height: "70%",
  halfWidth: "30%",
  halfHeight: "50%",
};
export const SMALL_FIX_SIZE: ProgramSize = {
  width: "400px",
  height: "70%",
  halfWidth: "30%",
  halfHeight: "50%",
};
