export class Breakpoints {
  public static mobile: number = 375;
  public static tablet: number = 768;
  public static desktop: number = 1440;

  public static isMobile(): boolean {
    return window.innerWidth < this.mobile;
  }

  public static isTablet(): boolean {
    return window.innerWidth >= this.mobile && window.innerWidth < this.desktop;
  }

  public static isDesktop(): boolean {
    return window.innerWidth >= this.desktop;
  }
}
