import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Noto_Sans_Thai as FontThai,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontThai = FontThai({
  subsets: ["thai"],
  variable: "--font-thai",
  weight: ["400", "500", "700"],
});
