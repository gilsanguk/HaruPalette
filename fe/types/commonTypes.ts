export interface ErrorResponse {
  status: number;
  success: boolean;
  message: string;
}

interface NavItem {
  title: string;
  link: string;
}

interface ShopNavItem {
  title: string;
  etitle: string;
  index: number;
}

export type NavList = NavItem[];

export type ShopNavList = ShopNavItem[];

export interface WeatherList {
  Clear: string;
  Clouds: string;
  Rain: string;
  Snow: string;
}
export interface ButtonData {
  fs: number;
  width: number;
  height: number;
  context: string;
  image: string;
}

export interface BallData {
  top: string;
  left: string;
  width: string;
  height: string;
  color: string;
  opacity: number;
  delay: number;
  start: number;
}

export interface TalkData {
  idx: number;
  script: string[];
}

export interface CardData {
  image: string;
  script: string;
  backgroundColor: string;
}
